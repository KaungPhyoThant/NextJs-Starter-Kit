# NextJs-Starter-Kit

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A modern, feature-rich starter template for Next.js applications with integrated authentication, UI components, and styling solutions to accelerate your development workflow.

> **Status:** In Development

## 📋 Overview

NextJs-Starter-Kit provides a robust foundation for building web applications with Next.js. This template combines the latest tools and best practices to help you start your project with a well-structured, maintainable codebase.

### Key Technologies

- **Next.js** - React framework with server-side rendering and routing
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN** - Beautifully designed components built with Radix UI and Tailwind
- **Better-Auth** - Streamlined authentication solution

## ✨ Features

- **Modern Stack** - Built with Next.js 14+ and React 18+
- **Type Safety** - Fully typed with TypeScript
- **Authentication Ready** - Pre-configured auth system with Better-Auth
- **Responsive UI** - Mobile-first design approach with Tailwind CSS
- **Component Library** - Accessible UI components from ShadCN
- **Dark Mode** - Built-in theme switching capability
- **SEO Optimized** - Metadata API for improved search engine visibility
- **Developer Experience** - ESLint, Prettier, and Husky for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/NextJs-Starter-Kit.git my-project
cd my-project
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💻 Usage

### Project Structure

```
NextJs-Starter-Kit/
├── app/                  # Next.js app directory
│   ├── (auth)/           # Authentication routes
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # ShadCN components
│   └── auth/             # Authentication components
├── lib/                  # Utility functions and shared code
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

### Authentication

The starter kit comes with Better-Auth integration. To use authentication in your components:

```tsx
import { useAuth } from '@/lib/auth'

export default function ProtectedPage() {
  const { user, signOut } = useAuth()
  
  if (!user) {
    return <div>Please sign in to access this page</div>
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Adding New Components

To add a new ShadCN component:

```bash
npx shadcn-ui@latest add button
```

This will add the Button component to your project which you can then import and use:

```tsx
import { Button } from '@/components/ui/button'

export default function MyComponent() {
  return (
    <Button variant="default">Click Me</Button>
  )
}
```

## 🛣️ Roadmap

- [ ] Add internationalization (i18n) support
- [ ] Implement server-side form validation
- [ ] Add comprehensive test suite
- [ ] Create additional page templates
- [ ] Add data fetching examples with SWR or React Query
- [ ] Add reset password via mail using Resend.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/) for hosting

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">Terry Thant</a>
</p>
