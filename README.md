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
│   └── counter.ts   # Example TypeScript module
├── dist/            # Built static files (generated)
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── .eslintrc.cjs    # ESLint configuration
```

### Sass Architecture

The Sass files are organized using a modular approach:

- **`base/`** - Foundation styles including variables, mixins, and CSS resets
- **`components/`** - Reusable component styles (buttons, cards, typography)
- **`layout/`** - Layout-specific styles (header, main, footer)
- **`utilities/`** - Utility classes for spacing, responsive design, etc.
- **`main.scss`** - Main entry point that imports all other Sass files

## Deployment

After running `npm run build`, the `dist` folder contains all the static files needed to deploy your application. You can upload these files to any web hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static web server

## Customization

- Edit `src/main.ts` to change the application logic
- Modify Sass files in `src/styles/` to customize styling:
  - `base/_variables.scss` - Update colors, spacing, and design tokens
  - `components/` - Add or modify component styles
  - `utilities/` - Add custom utility classes
- Update `src/index.html` to change the HTML structure
- Add new TypeScript modules in the `src` directory

### Available Sass Features

- **Variables**: Colors, spacing, breakpoints defined in `base/_variables.scss`
- **Mixins**: Reusable style patterns in `base/_mixins.scss`
- **Utility Classes**: Spacing, responsive utilities, flex/grid helpers
- **Component Classes**: `.btn`, `.card`, `.text-*` with modifiers
- **Responsive Mixins**: `@include mobile`, `@include tablet`, `@include desktop`

### Example Usage

```scss
// Using variables
.my-component {
  color: $primary-color;
  padding: $spacing-lg;
}

// Using mixins
.my-button {
  @include button-style($primary-color, white);
}

// Responsive design
.my-layout {
  @include mobile {
    flex-direction: column;
  }
  @include desktop {
    flex-direction: row;
  }
}
```