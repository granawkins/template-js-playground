# Mentat Template JS with Wiktok

A full-stack JavaScript application featuring Wiktok - a TikTok-style interface for browsing Wikipedia articles. Built with React frontend and Express backend, both using TypeScript.

![Wiktok Screenshot](https://github.com/granawkins/template-js-playground/assets/raw/main/screenshots/wiktok-preview.png)

## Features

✨ **Wiktok Application**
- TikTok-style vertical scrolling interface for Wikipedia articles
- Infinite scroll with automatic loading of new content
- Beautiful article cards with images and excerpts
- Direct links to full Wikipedia articles
- Responsive design for mobile and desktop

🚀 **Technical Highlights**
- Full-stack TypeScript application
- Server-side Wikipedia API integration
- Caching system for better performance
- Comprehensive test coverage
- Smooth animations and transitions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start both the frontend and backend in development mode with hot reloading.

## Usage

### Browsing Wikipedia Articles

1. When you open the application, you'll see the default landing page
2. Click on the "Try Wiktok" button to launch the Wiktok interface
3. Scroll vertically to browse through Wikipedia articles
4. Click "Read on Wikipedia" to open the full article in a new tab
5. Use the info button (ℹ️) in the top-right corner for help
6. Click the home button (🏠) to return to the landing page

### Keyboard Navigation

- Use `Arrow Up` and `Arrow Down` to navigate between articles
- Press `Enter` to open the current article on Wikipedia
- Press `Esc` to exit the Wiktok interface

## Development

### Project Structure

```
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   ├── services/      # API service integrations
│   │   ├── types/         # TypeScript type definitions
│   │   └── __tests__/     # Frontend tests
├── server/                # Backend Express application
│   ├── src/               # Source files
│   │   ├── routes/        # API routes
│   │   ├── services/      # Service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── __tests__/     # Backend tests
```

### Available Commands

- `npm run dev` - Start development servers (frontend + backend)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Check code quality
- `npm run format` - Format code

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite for bundling
- Vitest for testing
- CSS for styling

### Backend
- Node.js with Express
- TypeScript
- Wikipedia API integration
- Jest for testing

### Development Tools
- ESLint for code linting
- Prettier for code formatting
- Concurrently for running multiple scripts

## Using with Mentat

This project is built with Mentat integration for AI-assisted development.

1. Install Mentat on your GitHub account. See instructions [here](https://mentat.ai/docs).

2. Add the repository to your Mentat Installation.
   - If you're installing Mentat for the first time, select your repository on the 'Setup Installation' page.
   - If you've already installed Mentat, go to the [settings page](https://mentat.ai/settings) and click 'Manage Repositories', and select your repository from the drop-down menu.

3. You're all set! You can begin using Mentat by:
   - Creating a new issue and tagging '@MentatBot'
   - Pushing PRs to your repository and having Mentat review them
   - Chatting with Mentat about your project from the [Mentat website](https://mentat.ai)

## License

MIT
