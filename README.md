# Next.js Full Stack Boilerplate

A production-ready starter template for building full-stack applications with Next.js, Drizzle ORM, Neon PostgreSQL, and Clerk Authentication.

## 🚀 Features

- ⚡️ **Next.js 14** with App Router
- 🔐 **Clerk Authentication** with database sync
- 🗃️ **Drizzle ORM** for type-safe database operations
- 🐘 **Neon PostgreSQL** - Serverless Postgres database
- 🔄 **Database Webhooks** for user synchronization
- 🎨 **Geist Font** by Vercel
- 📱 **Responsive** design
- 🔒 **Type Safety** with TypeScript
- 🛠️ **Developer Experience** optimized

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm/yarn/pnpm/bun
- A [Clerk](https://clerk.dev) account
- A [Neon](https://neon.tech) account

## 🛠️ Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Fill in your environment variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# Database
DATABASE_URL=your_neon_database_url
```

4. **Initialize the database**
```bash
npm run db:push
# or
yarn db:push
or run the command from official docs
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── app/
│   ├── (auth)/        # Auth protected routes
│   ├── api/           # API routes
│   ├── fonts/         # Custom fonts
│   ├── favicon.ico    
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # Reusable React components
├── db/
│   ├── index.ts      # Database connection and configuration
│   └── schema.ts     # Drizzle schema definitions
├── drizzle/          # Drizzle ORM configurations
├── lib/
│   └── utils.ts      # Utility functions
├── public/           # Static assets
```

## 🔄 Database Synchronization

This template automatically synchronizes user data between Clerk and your Neon PostgreSQL database using webhooks. When a user signs up or updates their profile in Clerk, the changes are automatically reflected in your database.

### Webhook Setup

1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Add a new webhook endpoint: `your-domain/api/webhooks/clerk`
4. Copy the signing secret to your environment variables

## 🛣️ API Routes

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `POST /api/webhooks/clerk` - Clerk webhook endpoint

## 🚀 Deployment

The easiest way to deploy your application is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add your environment variables
4. Deploy!

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Documentation](https://neon.tech/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
