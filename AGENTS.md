<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Equipment Rental Platform Roadmap

## Project goal

Build a unique, responsive equipment rental marketplace using Next.js App Router, TypeScript, BetterAuth with MongoDB adapter, JWT role authentication, Express/MongoDB API, Stripe, and role-specific dashboards. Do not copy a module or conceptual-session project.

## Stack conventions

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, and Shadcn UI or Daisy UI.
- Backend: Express.js with MongoDB and either JavaScript or TypeScript.
- Authentication: BetterAuth, MongoDB adapter, Google social login, and JWT-based API authorization.
- Payments: Stripe Checkout and Stripe webhooks.
- Images: direct image URLs or ImgBB.
- Use environment variables for every secret and frontend/server configuration value.
- Read `node_modules/next/dist/docs/` before changing Next.js APIs or conventions.

## Implementation phases

### Phase 1: Project foundation

- [ ] Confirm a clear visual identity, typography, color palette, and page layout before implementation.
- [ ] Configure environment variables for the frontend and backend.
- [ ] Set up MongoDB connections and shared data models for users, equipment, favorites, bookings, and payments.
- [ ] Configure BetterAuth, MongoDB adapter, Google login, and JWT issuance.
- [ ] Implement global loading and error states for route-level failures.
- [ ] Add a responsive header, footer, layout container, and consistent button/card styles.
- [ ] Add a README covering project purpose, live URL, features, repositories, and npm packages.

### Phase 2: Authentication and authorization

- [ ] Build registration with name, email, image URL, and validated password.
- [ ] Require at least one uppercase letter, one lowercase letter, and six characters.
- [ ] Show success/error toast or SweetAlert feedback.
- [ ] Build login with email/password and Google social login.
- [ ] Assign the `Customer` role to new Google users.
- [ ] Implement `verifyToken`, `verifyRenter`, `verifyOwner`, and `verifyAdmin` middleware.
- [ ] Protect private frontend routes and role-specific backend endpoints.
- [ ] Preserve login state across reloads and prevent authenticated users from returning to login unnecessarily.

### Phase 3: Public website

- [ ] Replace the starter home page with a polished public landing page.
- [ ] Build a responsive navbar with logo, name, Home, All Equipment, optional pages, Dashboard, Login/Register, and Logout states.
- [ ] Build an image-led banner with Framer Motion.
- [ ] Display six approved featured equipment items from MongoDB.
- [ ] Build popular equipment category cards with Framer Motion.
- [ ] Add Why Choose Us, customer reviews, and at least two relevant extra sections.
- [ ] Use the X logo instead of the deprecated Twitter bird.
- [ ] Build loading, not-found, and route error experiences.
- [ ] Make every public section responsive, aligned, readable, and visually consistent.

### Phase 4: Equipment discovery

- [ ] Build the approved equipment listing in a responsive three-column grid.
- [ ] Create reusable equipment cards with image, name, category, price, rental type, location, availability, and details action.
- [ ] Redirect unauthenticated detail clicks to login and authenticated clicks to equipment details.
- [ ] Implement server-side search by equipment name and location/category.
- [ ] Implement server-side category, rental type, price range, and availability filters.
- [ ] Implement server-side sorting for low price, high price, and recently added.
- [ ] Add pagination to the listing as an optional enhancement.
- [ ] Build a detail page for equipment description, price, type, location, quantity, image, owner, and terms.

### Phase 5: Favorites and rentals

- [ ] Let customers add and remove equipment favorites through protected APIs.
- [ ] Persist favorites in MongoDB.
- [ ] Build a customer rentals table with equipment, dates, booking date, amount, payment status, and booking status.
- [ ] Build a customer favorites table with view and remove actions.
- [ ] Build a booking modal with start/end dates, quantity, phone, address, and notes.
- [ ] Validate dates and quantity against availability.
- [ ] Calculate rental totals from rental type, duration, and quantity.
- [ ] Support pagination for booking history as an optional enhancement.

### Phase 6: Stripe payments

- [ ] Create Stripe Checkout sessions from verified booking data.
- [ ] Redirect customers to Checkout after confirming a booking.
- [ ] Record payment status and transaction details in the payments collection.
- [ ] Create the booking only after successful payment unless the API design explicitly uses a documented pending state.
- [ ] Implement a payment success page.
- [ ] Verify webhook signatures and update payment/booking status securely.
- [ ] Prevent duplicate bookings and duplicate payment processing.

### Phase 7: Owner dashboard

- [ ] Build owner routes for Add Equipment, My Equipment, My Equipment Rental, and My Profile.
- [ ] Add equipment with category dropdown, location, price, rental type, quantity, condition, brand, model, image, terms, owner, and pending status.
- [ ] Upload equipment images through ImgBB or an equivalent configured provider.
- [ ] Display owner's equipment with update, delete, and details actions.
- [ ] Display renter, equipment, duration, quantity, amount, payment status, and booking status for owner rentals.
- [ ] Add owner analytics for listed equipment, completed rentals, earnings, and monthly earnings.

### Phase 8: Customer and shared profile

- [ ] Add My Rentals, Favorites, and Profile routes.
- [ ] Display profile name, email, image, phone, and address.
- [ ] Allow every Customer, Owner, and Admin to update supported profile fields.
- [ ] Keep profile, navigation, and dashboard styles consistent across roles.

### Phase 9: Admin dashboard

- [ ] Build All Users, All Equipment, All Rentals, and My Profile routes.
- [ ] Display registered users with role and registration date.
- [ ] Implement backend role changes and user management.
- [ ] Display all equipment with Pending, Approved, Rejected, update, delete, approve, and reject actions.
- [ ] Display customer, owner, equipment, duration, amount, and payment/booking statuses.
- [ ] Build admin analytics for users, equipment, bookings, pending approvals, completed rentals, revenue, and monthly bookings.
- [ ] Render dashboard charts and profile summaries responsively.

### Phase 10: Quality and optional enhancements

- [ ] Add a light/dark theme toggle and persist the choice in local storage.
- [ ] Add a node-cron job to update bookings after their end date.
- [ ] Send booking completion emails to renters and owners.
- [ ] Add client/server integration tests for authentication, RBAC, search, booking, and payment flows.
- [ ] Test every reload and direct-route navigation scenario.
- [ ] Test mobile, tablet, and desktop layouts.
- [ ] Verify CORS, 404, 500, timeout, and deployment behavior.
- [ ] Eliminate console/runtime errors and broken images or links.

## Commit and delivery requirements

- Make at least 20 meaningful client commits and 12 meaningful server commits.
- Use descriptive commit messages describing the implemented behavior.
- Commit coherent phases; do not combine unrelated features.
- Commit only source/configuration changes, never secrets or credential files.
- Submit the admin email/password, live link, client repository, and server repository.

## Verification checklist

- [ ] Public home and equipment routes work while logged out.
- [ ] Equipment details require login.
- [ ] Registration password rules work and display clear errors.
- [ ] Google and email/password login work.
- [ ] JWT and role middleware prevent unauthorized actions.
- [ ] Reloading any private route preserves the session.
- [ ] Server-side search, filters, and sorting return correct MongoDB results.
- [ ] Availability and rental totals are validated server-side.
- [ ] Stripe success updates payment and booking data once.
- [ ] Customer, owner, and admin routes show only their authorized data/actions.
- [ ] The production site has no CORS, 404, 504, or reload errors.
- [ ] README contains name, purpose, live URL, features, and npm packages.
- [ ] Environment variables are used for frontend keys and MongoDB credentials.
