# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shamolima is an Angular 20 standalone component application for a logistics company website. The project uses zoneless change detection, lazy-loaded routes, and a JSON-driven content architecture.

## Development Commands

### Core Commands
- `npm start` - Start development server at http://localhost:4200/
- `npm run build` - Production build to `dist/` directory
- `npm run watch` - Development build with file watcher
- `npm test` - Run Karma/Jasmine unit tests

### Angular CLI
- `ng generate component component-name` - Generate new component (uses SCSS by default)
- `ng serve` - Alternative to `npm start`
- `ng build` - Alternative to `npm run build`

## Architecture

### Modern Angular Features
- **Zoneless change detection**: Uses `provideZonelessChangeDetection()` instead of traditional Zone.js
- **Standalone components**: No NgModule declarations; all components are standalone with explicit imports
- **Lazy-loaded routes**: All feature routes use `loadComponent()` for code splitting
- **Signal-based state**: Components use signals for reactive state management

### Project Structure

```
src/app/
├── core/                    # Singleton services and layout components
│   └── components/
│       ├── header/         # Main navigation header
│       ├── footer/         # Site footer
│       └── topbar/         # Top contact bar
├── features/               # Lazy-loaded feature modules
│   ├── home/              # Homepage with inline data and blocks (unused now)
│   ├── services/          # Services listing and detail pages
│   ├── fleet/             # Fleet showcase
│   ├── about/             # About page
│   ├── qhse/              # Quality, Health, Safety & Environment
│   ├── tracking/          # Shipment tracking
│   ├── quote/             # Quote request form
│   ├── contact/           # Contact information with map
│   ├── work-activities/   # Gallery of work activities
│   └── logistics/         # Logistics PDF viewer
└── shared/                # Shared utilities, services, and components
    ├── content.service.ts # Central JSON content loader
    ├── gallery.service.ts # Lightbox gallery state management
    ├── gallery-overlay.ts # Fullscreen image gallery component
    ├── map-embed.ts       # Google Maps embed component
    ├── types.ts           # TypeScript interfaces for content
    ├── animation.ts       # Route and element animations
    ├── counter.util.ts    # Number counter animation utility
    └── directives/        # Reusable directives (e.g., reveal-on-scroll)
```

### Content-Driven Architecture

**Critical**: All page content is loaded from `src/assets/content.json` via the `ContentService`. This includes:
- Site-wide information (name, baseUrl)
- Home page content (hero, certificates, about snippet)
- Services list and associated images
- About page content (leaders, organogram)
- QHSE goals and training images
- Contact office details with lat/lng for maps
- Gallery items and work activities
- Clients and recent projects

When modifying content:
1. **Never hardcode** text, images, or data in components
2. Update `src/assets/content.json` instead
3. Add corresponding TypeScript interfaces in `shared/types.ts`
4. Expose new observables in `ContentService` following the existing pattern

### Route Configuration

Routes in `app.routes.ts` use lazy loading:
```typescript
{ path: 'services/:slug', loadComponent: () => import('./features/services/service-single/service-single').then(m => m.ServiceSingle) }
```

All routes have a catch-all redirect to home: `{ path: '**', redirectTo: '' }`

### Styling

- **CSS Framework**: Tailwind CSS 4.x with PostCSS
- **Component Styles**: SCSS files co-located with components
- **Global Styles**: `src/styles.css`
- **Prettier Config**: 100-char width, single quotes, Angular HTML parser

### Special Integrations

#### PDF.js Integration
The project includes `pdfjs-dist` for rendering PDFs:
- Worker file copied to `/assets/pdfjs/` during build (see `angular.json` assets config)
- Used in the Logistics feature (`src/app/features/logistics/`)

#### Google Maps
The `MapEmbed` component (`shared/map-embed.ts`) renders embedded Google Maps using contact office coordinates from `content.json`.

#### Gallery System
Two-part gallery:
1. `GalleryService` - Manages overlay state (open/closed, items, current index)
2. `GalleryOverlay` - Full-screen image viewer with prev/next navigation
3. Components call `galleryService.open(items, index)` to launch the overlay

### Testing

- **Framework**: Jasmine + Karma
- **Spec files**: Co-located with components (`.spec.ts`)
- **Run single spec**: `ng test --include='**/component-name.spec.ts'`

### TypeScript Configuration

Strict mode enabled with:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true` (Angular templates)

### Animations

Animations are centralized in `shared/animation.ts`:
- `routeFade` - Applied to `<router-outlet>` for page transitions
- `fadeIn` - Element fade-in on enter
- `listStagger` - Staggered list item animations

Use `[@animationName]` in templates after importing from `shared/animation.ts`.

## Common Development Patterns

### Adding a New Page
1. Generate component: `ng generate component features/new-page`
2. Add route in `app.routes.ts` with lazy loading
3. Add content schema to `shared/types.ts` (e.g., `NewPageContent`)
4. Expose observable in `ContentService` (e.g., `newPage$`)
5. Update `src/assets/content.json` with new content section
6. Import `Header` and `Footer` in component for layout consistency

### Working with Content
```typescript
// In component:
private content = inject(ContentService);
readonly pageData$ = this.content.about$; // or home$, services$, etc.

// In template:
@if (pageData$ | async; as data) {
  <h1>{{ data.title }}</h1>
}
```

### Image Paths
All images referenced in `content.json` should use paths relative to `src/assets/`:
```json
"hero": { "image": "images/hero-banner.jpg" }
```
Angular's asset pipeline will resolve `assets/images/hero-banner.jpg` at runtime.

### Service-Specific Images
The `ContentService.imagesForService(slug)` method maps service slugs to image arrays defined in `content.json` under `services.images`:
- `equipmentRental` → 'equipment-rental'
- `d2d` → 'door-to-door-transportation', 'transportation', 'd2d'
- `powerPlant` → 'power-plant-material-handling', 'power-plant'
- `lng` → 'lng-project', 'oil-gas-lng'
- `oilGas` → 'oil-gas'
- `genericFleet` → fallback

## Build Configuration

Production build budgets (in `angular.json`):
- Initial bundle: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

If bundles exceed limits, consider:
- Lazy loading more routes
- Code splitting large libraries
- Optimizing images

## Git Workflow

Current branch: `main`
All commits use descriptive messages (e.g., "shamolima website ready").
