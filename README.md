# MACHORA

MACHORA is an equipment rental marketplace. Customers can browse approved listings, save favorites, and book equipment. Owners manage their listings. Administrators review equipment and manage user roles and rentals.

Live URL: https://machora-client-site.vercel.app/

## Run locally

1. Install Node.js 24+ and have a MongoDB Atlas database or replica set available. Both applications use the same `machineRentbd` database.
2. Copy `.env.example` to `.env` in this directory and in the server directory. If you already have local `.env` files, keep them and add only the missing settings.
3. In the server directory, run `npm ci`, then `npm start`.
4. In this directory, run `npm ci`, then `npm run dev`. Open http://localhost:3000.
5. Create a normal account. Use the server README to assign the first administrator. The administrator can promote a second account to Owner.
6. Sign in as Owner and create listings. Approve them as Admin. The home page displays up to six approved listings.

If your existing server `PORT` is 8000, set `NEXT_PUBLIC_API_URL=http://localhost:8000` in the frontend.

Use `http://localhost:3000/api/auth/callback/google` as an authorized Google OAuth redirect URI for local development. `IMGBB_API_KEY` is optional for direct image URLs and required for file uploads.

## Bookings and payment

A customer selects rental dates and quantity. **Cash on delivery** confirms the rental as unpaid until an administrator marks it paid. **Pay online** reserves the equipment and opens Stripe Checkout. The success page checks for payment confirmation from the server.

## Main packages

- Next.js App Router, React, and TypeScript for routes and UI.
- Tailwind CSS, Shadcn UI components, Base UI, and Lucide React for styling and controls.
- Framer Motion for the banner, featured listings, and categories.
- Better Auth with its MongoDB adapter for email/password, Google login, and JWT issuance.
- MongoDB driver for persistence.

Run `npm run lint` and `npm run build` before deploying. In production, use HTTPS, set the web and API origins in both apps, and add the production Google callback URI. See the server README for backend configuration and Stripe setup.
