# Combo Foundation

card game

## Getting Started

```bash
npm install
npm run dev
```

### Building for Production

Build the project for production:
```bash
npm run build
```

This will create a `dist` folder with static HTML, CSS, and JavaScript files that can be deployed to any web server.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code quality issues:
```bash
npm run lint
```

## Project Structure

```
combo_foundation/
├── public/          # Static assets
│   └── vite.svg     # Vite logo
├── src/             # Source code
│   ├── styles/      # Sass/SCSS styles
│   │   └── main.sass # Main Sass entry point
│   ├── index.html   # Main HTML file
│   ├── main.ts      # Application entry point
│   └── game/        # game code
├── dist/            # Built static files (generated)
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── .eslintrc.cjs    # ESLint configuration
```

### Sass Architecture

The Sass files are organized using an approach:

- **`main.sass`** - Main entry point that imports all other Sass files
- **everything else** - what it says

