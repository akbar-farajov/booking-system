# Booking Application

A modern, responsive booking application for managing hotel and meal reservations with daily selection capabilities. Built with React 19, TypeScript, and Vite for optimal performance and developer experience.

## 🚀 Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (recommended) or npm/yarn

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd booking
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Start the development server**:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server with hot module replacement
- `pnpm build` - Build for production (outputs to `dist/`)
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint to check code quality

## 🛠️ Technology Choices and Justifications

### Core Technologies

#### **React 19.2.0**
- Latest stable version with improved performance and new features
- Better concurrent rendering and automatic batching
- Enhanced TypeScript support

#### **TypeScript 5.9.3**
- Type safety reduces runtime errors
- Better IDE support with IntelliSense
- Self-documenting code through type definitions
- Easier refactoring and maintenance

#### **Vite 7.2.2**
- Lightning-fast HMR (Hot Module Replacement)
- Optimized build times with esbuild
- Native ES modules support
- Better developer experience compared to webpack

### State Management

#### **Zustand 5.0.8**
- Lightweight (~1kb) compared to Redux
- Simple, unopinionated API
- Built-in persistence middleware for localStorage
- TypeScript-first design
- No boilerplate code required

#### **React Hook Form 7.66.1**
- Performant form validation with minimal re-renders
- Native HTML validation
- Easy integration with UI libraries
- Excellent TypeScript support

#### **Zod 4.1.12**
- Runtime type validation
- Schema-based validation
- Perfect integration with React Hook Form via @hookform/resolvers
- Type inference for TypeScript

### UI & Styling

#### **Tailwind CSS 4.1.17**
- Utility-first approach for rapid development
- Consistent design system
- Excellent tree-shaking (smaller bundle size)
- Modern v4 with Vite plugin for better performance

#### **Radix UI**
- Unstyled, accessible components
- WAI-ARIA compliant
- Keyboard navigation support
- Composable primitives for custom designs

#### **Shadcn/ui Pattern**
- Component ownership (components are in your codebase)
- Customizable and themeable
- Built on Radix UI primitives
- No runtime dependency

#### **Lucide React 0.554.0**
- Modern icon set with 1000+ icons
- Tree-shakeable (only imports used icons)
- Consistent design language

### Data Fetching & Async State

#### **TanStack Query 5.90.10**
- Powerful data synchronization
- Automatic caching and background updates
- Request deduplication
- Loading and error states management

#### **nuqs 2.8.0**
- Type-safe URL search params
- Seamless React Router integration
- Simplifies state persistence in URL

### Utilities

#### **date-fns 4.1.0**
- Modern, modular date utility library
- Tree-shakeable (smaller bundle)
- Immutable and pure functions
- Better than moment.js in terms of size

#### **class-variance-authority (CVA)**
- Type-safe variant-based component styling
- Reduces conditional className logic
- Better maintainability for component variants

#### **tailwind-merge & clsx**
- Intelligent class merging
- Prevents Tailwind class conflicts
- Clean conditional class handling

### Developer Experience

#### **React Compiler (babel-plugin-react-compiler)**
- Automatic memoization at build time
- Reduces need for manual `useMemo`/`useCallback`
- Better performance out of the box

#### **ESLint + TypeScript ESLint**
- Code quality enforcement
- Consistent code style
- Catches potential bugs early

## 🏗️ Architecture Decisions

### Project Structure

```
src/
├── components/          # React components
│   ├── booking/        # Booking-specific components
│   │   ├── daily-selection/   # Daily selection UI
│   │   ├── form-fields/       # Form input components
│   │   └── summary/           # Summary view components
│   ├── shared/         # Reusable components
│   └── ui/             # Base UI components (shadcn/ui)
├── data/               # Static data and mock data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route pages
├── store/              # Zustand store definitions
└── types/              # TypeScript type definitions
```

### Key Architectural Patterns

#### **1. Component Composition**
- Small, focused components with single responsibility
- Composition over inheritance
- Presentational vs Container component separation

#### **2. Custom Hooks Pattern**
- Business logic extracted into reusable hooks
- `use-booking-calculations.ts` - Centralized calculation logic
- `use-booking-validation.ts` - Form validation logic
- `use-async-submit.ts` - Async form submission handling
- `use-mobile.ts` - Responsive design utilities

#### **3. Centralized State Management**
- Zustand store for global booking state
- Persistent storage with custom serialization/deserialization
- Local component state for UI-only concerns
- URL state for shareable/bookmarkable states (via nuqs)

#### **4. Type-Driven Development**
- Shared TypeScript interfaces (`types/booking.ts`)
- Type safety across components and hooks
- Runtime validation with Zod for external data

#### **5. Separation of Concerns**
- Data layer (`data/bookingData.ts`)
- State management layer (`store/bookingStore.ts`)
- Business logic layer (custom hooks)
- Presentation layer (components)

### State Persistence Strategy

The application uses a custom storage adapter in Zustand to:
- Persist booking configuration to localStorage
- Handle Date object serialization/deserialization
- Restore user session across browser refreshes
- Maintain data integrity

### Form Handling Strategy

- React Hook Form for performant form state
- Zod schemas for validation rules
- Controlled components for complex interactions
- Uncontrolled components where appropriate for performance

### Performance Optimizations

1. **React Compiler** - Automatic memoization
2. **Lazy Calculations** - Memoized calculations in `use-booking-calculations`
3. **Code Splitting** - Route-based code splitting via React Router
4. **Tree Shaking** - ES modules and selective imports
5. **Vite Optimization** - Fast HMR and optimized builds

## 🔮 Known Limitations & Future Improvements

### Known Limitations

1. **No Backend Integration**
   - Currently uses static mock data
   - No real API calls for booking submission
   - No user authentication

2. **Limited Error Handling**
   - Basic form validation only
   - No comprehensive error boundaries
   - Network error scenarios not fully covered

3. **No Internationalization (i18n)**
   - English-only interface
   - No multi-language support
   - Date formats not localized

4. **Limited Accessibility Testing**
   - Basic ARIA support via Radix UI
   - Not fully tested with screen readers
   - Could improve keyboard navigation

5. **No Automated Testing**
   - No unit tests
   - No integration tests
   - No E2E tests

### Future Improvements

#### Short-term (High Priority)

- [ ] **Backend API Integration**
  - Connect to real booking API
  - Implement proper error handling
  - Add authentication/authorization

- [ ] **Form Validation Enhancement**
  - Add more comprehensive validation rules
  - Improve error messages
  - Add field-level async validation

- [ ] **Testing Suite**
  - Unit tests with Vitest
  - Component tests with React Testing Library
  - E2E tests with Playwright

- [ ] **Error Boundaries**
  - Graceful error handling
  - User-friendly error messages
  - Error logging integration

#### Medium-term

- [ ] **Internationalization**
  - Multi-language support (i18next)
  - Localized date/currency formats
  - RTL language support

- [ ] **Progressive Web App (PWA)**
  - Offline functionality
  - Service worker caching
  - App installation support

- [ ] **Enhanced UX Features**
  - Booking history
  - Save draft bookings
  - Booking templates
  - Price alerts

- [ ] **Performance Monitoring**
  - Web Vitals tracking
  - Performance metrics
  - Error tracking (Sentry)

#### Long-term

- [ ] **Mobile App**
  - React Native version
  - Native mobile experience
  - Push notifications

- [ ] **Advanced Features**
  - Multi-room booking
  - Group booking support
  - Package deals
  - Loyalty program integration

- [ ] **Analytics & Insights**
  - User behavior tracking
  - Booking analytics dashboard
  - A/B testing framework

- [ ] **Accessibility Audit**
  - WCAG 2.1 AA compliance
  - Screen reader testing
  - Keyboard navigation audit
  - Color contrast improvements

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a personal project. If you'd like to contribute, please reach out to discuss.

---

**Built with ❤️ using modern web technologies**
