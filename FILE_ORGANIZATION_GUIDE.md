# LockedIn - File Organization Guide

## Current Project Structure

```
lockedin/
├── app/                    # Next.js App Router directory
│   ├── (auth)/            # Route groups for authentication
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Route groups for dashboard features
│   │   ├── tasks/
│   │   ├── goals/
│   │   └── analytics/
│   ├── components/        # Reusable components
│   │   ├── ui/           # Basic UI components (buttons, inputs, etc.)
│   │   ├── forms/        # Form-specific components
│   │   └── layout/       # Layout-specific components
│   ├── lib/              # Utility functions and configurations
│   │   ├── utils.ts      # General utility functions
│   │   ├── auth.ts       # Authentication utilities
│   │   └── validations.ts # Form validation schemas
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── db/                   # Database related files
│   ├── schema.ts         # Database schema
│   ├── migrations/       # Database migrations
│   └── index.ts          # Database connection
├── public/               # Static assets
│   ├── images/           # Image files
│   ├── icons/            # Icon files
│   └── favicon.ico
├── docs/                 # Documentation
├── tests/                # Test files
├── .env.example          # Environment variables example
├── .env.local            # Local environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Best Practices for File Organization

### 1. Use Route Groups for Better Organization

Route groups allow you to organize routes without affecting the URL structure:

- `(auth)/` for authentication-related pages
- `(dashboard)/` for dashboard features
- `(public)/` for public pages

### 2. Component Organization

```
components/
├── ui/                   # Basic, reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── index.ts         # Export all components
├── forms/               # Form-specific components
│   ├── LoginForm.tsx
│   ├── TaskForm.tsx
│   └── index.ts
├── layout/              # Layout components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── index.ts
└── features/            # Feature-specific components
    ├── tasks/
    ├── goals/
    └── analytics/
```

### 3. Utility and Helper Files

```
lib/
├── utils.ts             # General utility functions
├── auth.ts              # Authentication utilities
├── api.ts               # API client functions
├── validations.ts       # Zod schemas for validation
├── constants.ts         # Application constants
└── types.ts             # Shared TypeScript types
```

### 4. Database Organization

```
db/
├── schema.ts            # Drizzle schema definitions
├── migrations/          # Database migration files
├── seeds/               # Database seed files
├── queries/             # Database query functions
│   ├── users.ts
│   ├── tasks.ts
│   └── goals.ts
└── index.ts             # Database connection
```

### 5. API Routes Organization

```
app/api/
├── auth/
│   └── route.ts
├── tasks/
│   ├── route.ts         # GET, POST /api/tasks
│   └── [id]/
│       └── route.ts     # GET, PUT, DELETE /api/tasks/[id]
├── goals/
└── users/
```

### 6. TypeScript Types

```
types/
├── auth.ts              # Authentication-related types
├── task.ts              # Task-related types
├── user.ts              # User-related types
├── api.ts               # API response types
└── index.ts             # Export all types
```

## Naming Conventions

### Files and Folders

- Use **PascalCase** for components: `TaskCard.tsx`, `UserProfile.tsx`
- Use **kebab-case** for routes: `get-started/`, `user-profile/`
- Use **camelCase** for utilities: `formatDate.ts`, `validateEmail.ts`

### Components

- Use descriptive names: `TaskCard` instead of `Card`
- Add prefixes for variants: `PrimaryButton`, `SecondaryButton`
- Use suffixes for types: `TaskType`, `UserInterface`

### Variables and Functions

- Use **camelCase**: `getUserTasks`, `isLoggedIn`
- Use descriptive names: `handleSubmit` instead of `submit`
- Use boolean prefixes: `isLoading`, `hasError`, `canEdit`

## Code Organization Best Practices

### 1. Barrel Exports

Create `index.ts` files to simplify imports:

```typescript
// components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";

// Usage
import { Button, Input, Modal } from "@/components/ui";
```

### 2. Absolute Imports

Configure TypeScript for absolute imports:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"],
      "@/components/*": ["./app/components/*"],
      "@/lib/*": ["./app/lib/*"],
      "@/types/*": ["./app/types/*"]
    }
  }
}
```

### 3. Environment Configuration

```
.env.local              # Local development
.env.development        # Development environment
.env.staging           # Staging environment
.env.production        # Production environment
.env.example           # Template for environment variables
```

### 4. Testing Structure

```
tests/
├── __mocks__/         # Mock files
├── components/        # Component tests
├── pages/            # Page tests
├── utils/            # Utility function tests
├── setup.ts          # Test setup
└── helpers.ts        # Test helper functions
```

## Additional Tips

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use TypeScript strictly** - Enable strict mode and avoid `any` types
3. **Create reusable hooks** - Extract common logic into custom hooks
4. **Implement proper error boundaries** - Handle errors gracefully
5. **Use consistent styling** - Stick to Tailwind CSS classes and create design tokens
6. **Document your code** - Add JSDoc comments for complex functions
7. **Use Git conventionally** - Follow conventional commit messages

## Recommended Folder Structure for Your Next Steps

Based on your current project, I recommend creating:

1. `app/components/ui/` - For reusable UI components
2. `app/lib/` - For utility functions and configurations
3. `app/types/` - For TypeScript type definitions
4. `app/hooks/` - For custom React hooks
5. `app/(dashboard)/` - Route group for dashboard features
6. `app/(auth)/` - Route group for authentication

This structure will make your project more maintainable as it grows!
