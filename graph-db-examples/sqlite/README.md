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
('Person', '{"name": "Charlie", "age": 35}'),
('Person', '{"name": "Diana", "age": 28}');

-- Add some nodes (places)
INSERT INTO nodes (label, properties) VALUES
('City', '{"name": "New York", "population": 8000000}'),
('City', '{"name": "San Francisco", "population": 884000}');

-- Add relationships (edges)
INSERT INTO edges (source_id, target_id, label, properties) VALUES
(1, 2, 'KNOWS', '{"since": 2020}'),
(1, 3, 'KNOWS', '{"since": 2018}'),
(2, 4, 'KNOWS', '{"since": 2021}'),
(1, 5, 'LIVES_IN', '{"since": 2015}'),
(2, 6, 'LIVES_IN', '{"since": 2019}'),
(3, 5, 'LIVES_IN', '{"since": 2010}');
```

## Graph Traversal with Recursive CTEs

SQLite 3.8.3 and later support recursive CTEs, which are essential for graph traversal:

### Finding all friends (1-level traversal)

```sql
SELECT n2.properties
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
    WHERE e.source_id = 1 AND e.label = 'KNOWS'

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
WHERE target_id = 4  -- Destination node ID
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
        FOREIGN KEY (target_id) REFERENCES nodes(id)# Let's see what files we've created
ls -la graph-db-examples/

# Check the files in each subdirectory
ls -la graph-db-examples/postgres/
ls -la graph-db-examples/sqlite/

# Add these files to git
git add graph-db-examples/
git status
# Let's check what files exist in our new directories
find graph-db-examples -type f | sort

# Add all the files to git
git add graph-db-examples/

# Check the git status
git status
# Let's verify our branch
git branch

# Let's create a more concise set of examples
mkdir -p examples/postgres examples/sqlite

# Create a main README.md
cat > examples/README.md << 'EOF'
# Graph Database with PostgreSQL and SQLite

This directory contains documentation and examples for implementing graph database functionality using PostgreSQL and SQLite as lightweight alternatives to Neo4j.

## Comparison of Options

| Feature | PostgreSQL | SQLite | Neo4j |
|---------|------------|--------|-------|
| Resource usage | Medium | Very Low | High |
| Setup complexity | Medium | Minimal | High |
| Graph query support | Good (with extensions) | Basic | Excellent |
| Performance on large graphs | Good | Limited | Excellent |
| Learning curve | SQL + extensions | SQL only | Cypher (new language) |
| Deployment | Requires server | Embedded | Requires server |

## When to Choose Each Option

### PostgreSQL as a Graph Database
- Medium to large applications
- Already using PostgreSQL for other data
- Need both relational and graph capabilities
- Can use extensions like AGE (Apache Graph Extension)

### SQLite as a Graph Database
- Small to medium applications
- Need extreme simplicity in deployment
- Embedding in applications
- Smaller graph data sets
- Development and prototyping

### Neo4j
- Dedicated graph applications
- Large, complex graph structures
- Need for advanced graph algorithms
- Performance is the top priority

## How to Use This Directory

- `/postgres` - Examples for PostgreSQL graph implementation
- `/sqlite` - Examples for SQLite graph implementation
```
