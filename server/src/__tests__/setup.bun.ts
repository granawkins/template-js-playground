// Setup for Bun tests
import { app } from '../app';
import { Server } from 'http';
import { beforeAll, afterAll } from 'bun:test';

let server: Server;

// Setup before tests
beforeAll(() => {
  return new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      resolve();
    });
  });
});

// Cleanup after tests
afterAll(() => {
  return new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});
