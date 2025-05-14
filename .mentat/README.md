# Background

This project was created from mentat-template-js, a full-stack Javascript template with Mentat automations, and modified to use Bun instead of npm. The base stack is composed of:

### Client

- React 19
- TypeScript
- Vite (run with Bun)
- Vitest (run with Bun)

### Server

- Express
- TypeScript
- Bun (native TypeScript support + hot reloading)
- Bun Test (native test runner)

### Mentat (top-level)

- ESLint
- Prettier
- Concurrently

The following Bun commands are available at the root level. "\*" indicates they are also available in the client and server packages individually.

- `bun install`\* - Install dependencies for both client and server
- `bun run dev`\* - Start in development mode with hot reloading
- `bun run build`\* - Build for production
- `bun run start`\* - Start in production mode
- `bun run test`\* - Run tests once
- `bun run lint` - Run ESLint to check code quality
- `bun run format` - Run Prettier to format code

### Bun Benefits

- Faster dependency installation
- Native TypeScript execution without transpilation
- Built-in watch mode
- Integrated test runner
- Improved development and build performance

