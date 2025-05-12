# PostgreSQL Graph Database Implementation

PostgreSQL offers several approaches to implementing graph database functionality:

1. **Native SQL with recursive CTEs** - Built-in SQL features for graph traversal
2. **AGE Extension** - A PostgreSQL extension that adds graph database capabilities
3. **LTREE Extension** - For hierarchical tree-like structures

## Basic Graph Model in PostgreSQL

The simplest approach uses two tables:

- `nodes` table - Stores the entities
- `edges` table - Stores the relationships between entities

### Schema Setup

```sql
-- Nodes table
CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    properties JSONB  -- Store node properties in JSON format
);

-- Edges table
CREATE TABLE edges (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
    target_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    properties JSONB,  -- Store edge properties in JSON format

    -- Create an index for faster traversals
    CONSTRAINT unique_relationship UNIQUE(source_id, target_id, label)
);

-- Add indexes for better performance
CREATE INDEX ON edges(source_id);
CREATE INDEX ON edges(target_id);
CREATE INDEX ON edges(label);
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

One of the key graph operations is traversal - finding paths between nodes. PostgreSQL's recursive CTEs are perfect for this:

### Finding all friends-of-friends (2-level traversal)

```sql
WITH RECURSIVE traversal AS (
    -- Non-recursive term: starting point
    SELECT e.source_id, e.target_id, 1 AS depth
    FROM edges e
    WHERE e.source_id = 1 AND e.label = 'KNOWS'

    UNION ALL

    -- Recursive term: traverse to next level
    SELECT t.source_id, e.target_id, t.depth + 1
    FROM traversal t
    JOIN edges e ON t.target_id = e.source_id
    WHERE e.label = 'KNOWS' AND t.depth < 2
)
SELECT DISTINCT n.properties ->> 'name' as person
FROM traversal t
JOIN nodes n ON t.target_id = n.id
WHERE t.depth > 1;
```

### Finding the shortest path between two nodes

```sql
WITH RECURSIVE path(source_id, target_id, path, depth) AS (
    -- Starting point
    SELECT e.source_id, e.target_id, ARRAY[e.source_id, e.target_id], 1
    FROM edges e
    WHERE e.source_id = 1  -- Starting node ID

    UNION ALL

    -- Recursive step
    SELECT p.source_id, e.target_id, p.path || e.target_id, p.depth + 1
    FROM path p
    JOIN edges e ON p.target_id = e.source_id
    WHERE NOT e.target_id = ANY(p.path) -- Avoid cycles
    AND p.depth < 5  -- Limit search depth
)
SELECT path
FROM path
WHERE target_id = 4  -- Destination node ID
ORDER BY depth
LIMIT 1;
```

## Using AGE Extension (Apache AGE)

For more complex graph operations, the AGE extension provides a Cypher-like syntax:

### Installation

```sql
-- Install AGE extension (if you have admin rights on the PostgreSQL server)
CREATE EXTENSION age;
```

### Creating a graph

```sql
SELECT create_graph('social_graph');
```

### Creating vertices and edges

```sql
SELECT * FROM cypher('social_graph', $$
  CREATE (a:Person {name: 'Alice', age: 30}),
         (b:Person {name: 'Bob', age: 25}),
         (a)-[:KNOWS {since: 2020}]->(b)
$$) as (v agtype);
```

### Querying with Cypher-like syntax

```sql
SELECT * FROM cypher('social_graph', $$
  MATCH (a:Person)-[:KNOWS]->(b:Person)
  WHERE a.name = 'Alice'
  RETURN b.name AS friend
$$) as (friend agtype);
```

## Performance Considerations

- Use appropriate indexes on your node and edge tables
- Limit recursive query depth to avoid performance issues
- Consider materialized views for frequently traversed paths
- For very large graphs, consider specialized extensions like AGE
