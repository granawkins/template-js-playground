#!/bin/bash

# Install dependencies for both client and server
# The root package.json has an install script that handles this
npm install

# Ensure client dependencies are properly installed (fixes react-router-dom issues)
cd client && npm install
