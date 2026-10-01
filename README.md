# Omi Architecture PAL Mapping

A React + Vite frontend application for the Omi AI ambient memory companion.

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Riosbald/lingo.git
   cd lingo
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration (if needed)
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the next available port if 3000 is in use).

### Production Build

Build the project:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run dev  # Uses built output with Vite preview
```

### Type Checking

Validate TypeScript without emitting files:
```bash
npm run typecheck
```

## Project Structure

```
src/
├── App.tsx           # Main application component with routing
├── main.tsx          # React entry point
├── index.css         # Global styles and animations
├── data.ts           # Mock data and types
└── components/       # Reusable React components
    ├── Home.tsx
    ├── Tasks.tsx
    ├── Memories.tsx
    ├── Apps.tsx
    ├── Settings.tsx
    └── ChatModal.tsx
```

## Technologies

- **React 18.2** - UI framework
- **Vite 6.3** - Build tool and dev server
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 4.1** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Styling

This project uses Tailwind CSS with the Vite plugin for zero-runtime CSS-in-JS.

CSS animations are defined in `src/index.css`:
- `pulse` - Fade in/out animation
- `pulse-ring` - Expanding ring effect
- `waveform` - Audio waveform simulation

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run typecheck` | Type check without emitting |
| `npm run preview` | Preview production build locally |

## Environment Variables

Create a `.env.local` file in the root:

```env
# Optional: Supabase backend
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: API endpoints
VITE_API_URL=http://localhost:3000
```

Variables prefixed with `VITE_` are available in client-side code via `import.meta.env`.

## Troubleshooting

### Port 3000 already in use
The dev server will automatically use the next available port. No action needed.

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm ci
```

### TypeScript errors in VS Code
Ensure your editor uses the workspace TypeScript version:
- VS Code: Open Command Palette → "TypeScript: Select TypeScript Version" → Choose "Use Workspace Version"

### Build fails
1. Run `npm run typecheck` to check for type errors
2. Clear `.vite` cache: `rm -rf node_modules/.vite`
3. Reinstall: `npm ci`

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and type checking: `npm run typecheck && npm run build`
4. Open a pull request

## License

MIT
