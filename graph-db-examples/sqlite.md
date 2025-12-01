# SQLite Graph Database Implementation

SQLite can effectively serve as a lightweight graph database for many use cases. While it lacks dedicated graph extensions like PostgreSQL's AGE, its support for recursive queries makes it capable of handling graph operations.

## Basic Graph Model in SQLite

The simplest approach uses two tables:

- `nodes` table - Stores the entities
- `edges` table - Stores the relationships between entities

### Schema Setup

```sql
-- Nodes table
CREATE TABLE nodes (
    id INTEGER PRIMARY KEY,
    label TEXT NOT NULL,
    properties TEXT NOT NULL -- Store properties as JSON string
);

-- Edges table
CREATE TABLE edges (
    id INTEGER PRIMARY KEY,
    source_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    label TEXT NOT NULL,
    properties TEXT, -- Store properties as JSON string

    FOREIGN KEY (source_id) REFERENCES nodes(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES nodes(id) ON DELETE CASCADE,

    -- Create a unique constraint for relationships
    UNIQUE(source_id, target_id, label)
);

-- Create indexes for better traversal performance
CREATE INDEX idx_edges_source ON edges(source_id);
CREATE INDEX idx_edges_target ON edges(target_id);
CREATE INDEX idx_edges_label ON edges(label);
```

### Example: Adding Graph Data

```sql
-- Add some nodes (people)
INSERT INTO nodes (label, properties) VALUES
('Person', '{"name": "Alice", "age": 30}'),
('Person', '{"name": "Bob", "age": 25}'),
('Person', '{"name": "Charlie", "age": 35}');

-- Add some nodes (places)
INSERT INTO nodes (label, properties) VALUES
('City', '{"name": "New York", "population": 8000000}'),
('City', '{"name": "San Francisco", "population": 884000}');

-- Add relationships (edges)
INSERT INTO edges (source_id, target_id, label, properties) VALUES
(1, 2, 'KNOWS', '{"since": 2020}'),
(1, 3, 'KNOWS', '{"since": 2018}'),
(1, 4, 'LIVES_IN', '{"since": 2015}'),
(2, 5, 'LIVES_IN', '{"since": 2019}'),
(3, 4, 'LIVES_IN', '{"since": 2010}');
```

## Graph Traversal with Recursive CTEs

SQLite 3.8.3 and later support recursive CTEs, which are essential for graph traversal:

### Finding all friends (1-level traversal)

```sql
SELECT json_extract(n2.properties, '$.name') AS friend_name
FROM nodes n1
JOIN edges e ON n1.id = e.source_id
JOIN nodes n2 ON e.target_id = n2.id
WHERE json_extract(n1.properties, '$.name') = 'Alice'
AND e.label = 'KNOWS';
```

### Finding friends-of-friends (2-level traversal)

```sql
WITH RECURSIVE traversal(source_id, target_id, depth) AS (
    -- Base case: direct relationships from starting node
    SELECT e.source_id, e.target_id, 1
    FROM edges e
    JOIN nodes n ON e.source_id = n.id
    WHERE json_extract(n.properties, '$.name') = 'Alice' AND e.label = 'KNOWS'

    UNION ALL

    -- Recursive case: relationships from friends
    SELECT t.source_id, e.target_id, t.depth + 1
    FROM traversal t
    JOIN edges e ON t.target_id = e.source_id
    WHERE e.label = 'KNOWS' AND t.depth < 2
)
SELECT DISTINCT json_extract(n.properties, '$.name') AS friend_name
FROM traversal t
JOIN nodes n ON t.target_id = n.id
WHERE t.depth = 2;
```

### Finding the shortest path between two nodes

```sql
WITH RECURSIVE path(source_id, target_id, path, depth) AS (
    -- Starting point
    SELECT e.source_id, e.target_id,
           source_id || ',' || target_id, 1
    FROM edges e
    WHERE e.source_id = 1  -- Starting node ID

    UNION ALL

    -- Recursive step
    SELECT p.source_id, e.target_id,
           p.path || ',' || e.target_id, p.depth + 1
    FROM path p
    JOIN edges e ON p.target_id = e.source_id
    WHERE p.path NOT LIKE '%,' || e.target_id || ',%' -- Avoid cycles
    AND p.depth < 5  -- Limit search depth
)
SELECT path
FROM path
WHERE target_id = 5  -- Destination node ID
ORDER BY depth
LIMIT 1;
```

## JavaScript Implementation Example

Here's a simple example of how to implement a graph database with SQLite in a Node.js application:

```javascript
const sqlite3 = require('sqlite3').verbose();

// Open or create a database
const db = new sqlite3.Database('./graph.db');

// Create schema
function createSchema() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create nodes table
      db.run(`CREATE TABLE IF NOT EXISTS nodes (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        properties TEXT NOT NULL
      )`);

      // Create edges table
      db.run(`CREATE TABLE IF NOT EXISTS edges (
        id INTEGER PRIMARY KEY,
        source_id INTEGER NOT NULL,
        target_id INTEGER NOT NULL,
        label TEXT NOT NULL,
        properties TEXT,
        FOREIGN KEY (source_id) REFERENCES nodes(id) ON DELETE CASCADE,
        FOREIGN KEY (target_id) REFERENCES nodes(id) ON DELETE CASCADE,
        UNIQUE(source_id, target_id, label)
      )`);

      // Create indexes
      db.run('CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_id)');
      db.run('CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_id)');
      db.run(
        'CREATE INDEX IF NOT EXISTS idx_edges_label ON edges(label)',
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });
}

// Add a node
function addNode(label, properties) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO nodes (label, properties) VALUES (?, ?)'
    );
    stmt.run(label, JSON.stringify(properties), function (err) {
      if (err) reject(err);
      else resolve(this.lastID); // Return the ID of the new node
    });
    stmt.finalize();
  });
}

// Add an edge
function addEdge(sourceId, targetId, label, properties = {}) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO edges (source_id, target_id, label, properties) 
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(
      sourceId,
      targetId,
      label,
      JSON.stringify(properties),
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
    stmt.finalize();
  });
}

// Find connected nodes (1-hop)
function findConnectedNodes(startNodeId, relationshipLabel = null) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT n.id, n.label, n.properties, e.label as relationship
      FROM nodes n
      JOIN edges e ON n.id = e.target_id
      WHERE e.source_id = ?
    `;

    const params = [startNodeId];

    if (relationshipLabel) {
      query += ' AND e.label = ?';
      params.push(relationshipLabel);
    }

    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else {
        // Parse the JSON properties
        const results = rows.map((row) => ({
          id: row.id,
          label: row.label,
          properties: JSON.parse(row.properties),
          relationship: row.relationship,
        }));
        resolve(results);
      }
    });
  });
}

// Example usage
async function example() {
  await createSchema();

  // Add some nodes
  const alice = await addNode('Person', { name: 'Alice', age: 30 });
  const bob = await addNode('Person', { name: 'Bob', age: 25 });
  const charlie = await addNode('Person', { name: 'Charlie', age: 35 });

  // Add relationships
  await addEdge(alice, bob, 'KNOWS', { since: 2020 });
  await addEdge(alice, charlie, 'WORKS_WITH', { since: 2019 });

  // Query the graph
  const aliceConnections = await findConnectedNodes(alice);
  console.log('Alice is connected to:', aliceConnections);

  const aliceKnows = await findConnectedNodes(alice, 'KNOWS');
  console.log('Alice knows:', aliceKnows);
}

// Run the example
example()
  .catch(console.error)
  .finally(() => db.close());
```

## Performance Considerations

- SQLite is excellent for smaller graphs (thousands of nodes/edges)
- For larger graphs, consider using a connection pooling mechanism
- Use appropriate indexes on your tables
- Limit recursive query depth to avoid performance issues
- Consider implementing a caching layer for frequently accessed paths
- SQLite can handle concurrent reads but locks during writes, so it's not ideal for high-write concurrency scenarios
