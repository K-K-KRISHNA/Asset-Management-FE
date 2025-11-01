# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **Asset Management Frontend** application built with Next.js 16 (Pages Router), React 19, TypeScript, and Material-UI. The application manages assets, users, warranties, and order tracking with a comprehensive admin dashboard.

## Essential Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack at http://localhost:3000
npm run build        # Build production bundle with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint (checks all files)
```

### Formatting
```bash
prettier --write .   # Format all files with Prettier (manual command)
```

**Note:** This project uses Turbopack for faster builds. There are no separate test commands configured. VS Code auto-formats on save via `.vscode/settings.json`.

### Running the Application
- Development server runs on `http://localhost:3000`
- Backend API is expected at `http://localhost:8080/` (see `src/constants.tsx`)

## Architecture

### Application Structure

```
src/
├── components/          # React components (common, feature-specific)
│   ├── common/         # Shared UI components (AppButton, GenericTable, Layout, etc.)
│   ├── login/          # Login-specific components
│   ├── users/          # User management components
│   └── forgotPassword/ # Password reset components (typo in directory name)
├── pages/              # Next.js pages (Pages Router)
│   ├── _app.tsx        # App initialization
│   ├── _document.tsx   # Custom document (fonts, meta)
│   ├── index.tsx       # Login page (entry point)
│   ├── dashboard/      # Dashboard page
│   ├── add-asset/      # Add new asset
│   ├── asset-list/     # Asset listing
│   ├── user-list/      # User management
│   ├── profile/        # User profile page
│   ├── requests/       # Asset requests
│   ├── warranty/       # Warranty management
│   ├── bulk-upload/    # Bulk upload functionality
│   └── order-tracking/ # Order tracking
├── store/              # Redux Toolkit state management
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices (authSlice.ts)
├── services/           # API and utility services
│   └── utils/          # Utility functions (HTTP client, token management, loading)
├── providers/          # Context providers (SnackBar/Toast notifications)
├── styles/             # Global styles and theme configuration
│   ├── colors.ts       # Centralized color constants (COLORS object)
│   └── styles.ts       # MUI theme configuration (THEME, ARABIC_THEME)
├── enums/              # TypeScript enums
├── assets/             # Static assets
├── util/               # Additional utilities
├── constants.tsx       # App-wide constants (routes, BASE_URL)
└── vm.d.ts             # TypeScript type definitions
```

### Key Architectural Patterns

#### 1. Provider Hierarchy
The app wraps components in multiple providers (see `src/components/common/Layout.tsx`):
- **CacheProvider** (Emotion) → **LoadingWrapper** → **ToastProvider** → **Redux Provider** → **ThemeProvider** → **LayoutContent**

This structure ensures:
- Emotion CSS-in-JS with MUI integration (`emotionCache` with key "mui")
- Global loading state management (registers start/stop functions)
- Toast notifications (SnackBar context)
- Redux state management (auth state)
- MUI theme application (THEME or ARABIC_THEME)

#### 2. State Management (Redux Toolkit)
- **Store**: `src/store/index.ts`
- **Slices**: `src/store/slices/authSlice.ts` (user authentication state)
- Pattern: Use Redux for global auth state; local state for component-specific data

#### 3. API Layer (`src/services/utils/utilService.ts`)
- **baseHttpClient**: Centralized HTTP client function
  - Automatically adds Bearer token to headers (except public endpoints)
  - Integrates with global loading manager
  - Converts GET request body to query parameters
  - Base URL: `http://localhost:8080/` (from `constants.tsx`)

**Token Management**:
- Tokens are encrypted/decrypted using XOR cipher before localStorage storage
- `getToken()`, `setToken()`, `parseJwt()` utilities handle JWT operations

#### 4. Global Loading Management
- **loadingManager** (`src/services/utils/loadingManager.ts`): 
  - Central registry pattern for global loading state
  - Functions: `registerLoadingFns()`, `startGlobalLoading()`, `stopGlobalLoading()`
  - Used by `baseHttpClient` to show/hide loading indicators

#### 5. Dynamic Imports & SSR
- Most components use `dynamic()` imports with `{ ssr: false }` to prevent server-side rendering issues
- Pattern: `const Layout = dynamic(() => import("@/components/common/Layout"), { ssr: false });`

#### 6. Reusable Components
- **GenericTable** (`src/components/common/GenericTable.tsx`): 
  - Type-safe table component with pagination (10 items per page)
  - Mobile-responsive (switches to card view via `MobileViewCard` prop below md breakpoint)
  - Accepts custom render functions for cells via `Column<T>` type
  - Generic type parameter: `<T extends { id: string | number }>`
  - Sticky header enabled by default in theme

- **Common Form Inputs**: AppTextInput, AppSelectInput, AppDatePicker, AppChipInput, AppCreatableSelectInput, AppMultiSelectInput, AppMobileNumberInput, AppCheckBoxInput, AppRadioButtonInput, AppSwitchInput
- **Common UI**: AppButton, AppLoading, CustomDialog, CustomDrawer, LabelData

#### 7. Theming & RTL Support
- MUI custom theme in `src/styles/styles.ts`
- Supports both LTR and RTL (Arabic) themes
- Custom typography (Montserrat font)
- Emotion cache with RTL plugin support

#### 8. Routing
- Uses Next.js Pages Router
- Navigation routes defined in `src/constants.tsx` as `routes` array
- Path aliases: `@/*` maps to `./src/*` (see `tsconfig.json`)

### Type Definitions (`src/vm.d.ts`)
- **Core Types**: `User`, `PersonalInfo`, `EmploymentInfo`, `Designation`
- **API Types**: `IStandardAPIResponse<T>`, `LoginResponse`, `HttpMethod`
- **Auth Types**: `IToken`, `ForgotPasswordInputs`
- Pattern: All entities extend `BaseEntity` (id, timestamps, soft delete)

## Code Style

### TypeScript Configuration
- **Target**: ES2017
- **Strict mode**: Enabled
- **Path aliases**: `@/*` → `./src/*`

### Prettier Configuration (`.prettierrc.json`)
- **Print width**: 100 characters
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Tab width**: 2 spaces
- **Trailing commas**: ES5
- **Line endings**: LF (Unix-style)
- **Arrow parens**: Always
- **Bracket spacing**: True

**Note**: VS Code auto-formats on save. Import organization is automatic.

### ESLint
- Extends: `next/core-web-vitals`, `next/typescript`
- Ignores: `node_modules`, `.next`, `out`, `build`

## Development Guidelines

### When Adding New Pages
1. Create page in `src/pages/[page-name]/index.tsx`
2. Wrap with `<Layout>` component
3. Use `dynamic()` imports with `{ ssr: false }` for client-only components
4. Add route to `routes` array in `src/constants.tsx` if it needs sidebar navigation
5. Include proper `<Head>` metadata (title, description)

### When Adding New API Endpoints
1. Use `baseHttpClient<T>()` from `src/services/utils/utilService.ts`
2. Define response type in `src/vm.d.ts`
3. Follow pattern: `baseHttpClient<ResponseType>(endpoint, method, body, apiUrl, isPublic)`
4. Public endpoints (no auth): set `isPublic = true`

### When Creating Form Components
1. Use Formik for form state management (already in dependencies)
2. Use Yup for validation schemas
3. Utilize existing form components from `src/components/common/`
4. Pattern: AppTextInput, AppSelectInput, etc. for consistency

### When Managing State
- **Global auth state**: Use Redux (`authSlice` in `src/store/slices/authSlice.ts`)
- **UI state**: Use React local state or context providers
- **Loading state**: Automatic via `baseHttpClient` (uses global loading manager)
- **Toast notifications**: Use `ToastProvider` context from `src/providers/SnackBar.tsx`

### Styling
- Use MUI's `sx` prop for component-specific styles
- Access theme colors via `COLORS` from `src/styles/colors.ts`
- Use MUI's `useMediaQuery` for responsive breakpoints
- Typography: Use MUI's Typography component with theme variants

## Important Notes

- **Backend URL**: Currently hardcoded to `http://localhost:8080/` - update `BASE_URL` in `src/constants.tsx` for different environments
- **Token Security**: Tokens use basic XOR encryption with static key (`SECRET_KEY` in `utilService.ts`) - not suitable for production without enhancement
- **Image Domains**: External images allowed from `randomuser.me` (see `next.config.ts`)
- **No Test Framework**: Tests are not currently set up in this project
- **Font**: Montserrat font (LTR) and Libre Franklin (RTL/Arabic) loaded via Google Fonts in `_document.tsx`
- **Path Aliases**: Use `@/*` imports to reference `src/*` files (configured in `tsconfig.json`)
- **Pages Router**: This uses Next.js Pages Router (not App Router). All pages go in `src/pages/`
- **SSR Disabled**: Most dynamic imports use `{ ssr: false }` to avoid hydration issues

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined" errors on initial load**
   - Likely SSR issue. Wrap component with `dynamic(() => import(...), { ssr: false })`

2. **Loading spinner doesn't show/hide**
   - Ensure `LoadingWrapper` is mounted and `registerLoadingFns()` has been called
   - Check that `baseHttpClient` is being used (not raw `fetch`)

3. **Token not being sent in API requests**
   - Verify token is encrypted and stored via `setToken()`
   - Check if endpoint needs `isPublic = true` flag
   - Inspect localStorage for "token" key (value is encrypted)

4. **Styling issues / Theme not applied**
   - Ensure component is wrapped in `<Layout>` or within the provider hierarchy
   - Check if `sx` prop or MUI component is being used correctly
   - Verify COLORS import: `import { COLORS } from "@/styles/colors"`
