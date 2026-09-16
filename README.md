# React + Supabase on Vercel

This is a Vite React app backed by Supabase.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set the Supabase project URL and anon key in `.env.local`.
4. Run `npm start` and open `http://localhost:3000`.

Run the production build locally with `npm run build` and `npm run preview`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, select **Add New Project**, import the repository, and keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add these environment variables in the Vercel project settings for **Production**, **Preview**, and **Development**:
   - `VITE_SUPABASE_URL`: the Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: the Supabase anon/public key
4. Deploy the project.

The included `vercel.json` rewrite keeps React Router URLs working when a page is opened directly.

## Supabase setup

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor before using authentication, posts, or post images.

For email authentication, add the deployed Vercel URL to Supabase **Authentication > URL Configuration** as the Site URL and add the Vercel preview URLs as additional redirect URLs when needed.

## Scripts

- `npm start`: start the Vite development server
- `npm run build`: create the production build in `dist`
- `npm run preview`: preview the production build
- `npm test`: run the test suite
