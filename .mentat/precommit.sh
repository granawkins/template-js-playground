#!/bin/bash

# Run prettier to format code
bun run format

# Run ESLint with auto-fix
bun run lint -- --fix
