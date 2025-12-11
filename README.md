# OregonSMB Growth Suite

A high-end, sales-focused, multi-tabbed marketing and dashboard website for the OregonSMB Growth Suite. This single-page application (SPA) features a premium home page with multi-tab navigation (Find a Pro, For Business, Pricing) and a demo dashboard that showcases product value through plan-gated widgets. Built with obsessive attention to visual excellence, smooth interactions, and responsive design.

[cloudflarebutton]

## Overview

The OregonSMB Growth Suite is an agency-quality site designed to drive sales for local business growth services in Southern Oregon. It includes:

- **Multi-Tabbed Home Page**: Hero section with search, tabbed marketing content for discovering pros, business features, and pricing.
- **Pricing View**: Interactive cards for Starter ($0/mo), Growth ($49/mo), and Scale ($99/mo) plans, with popular badges and upgrade CTAs.
- **Dashboard Demo**: Plan-aware widgets showing leads, SEO audits, keyword tracking, and AI receptionist logs, with gating for locked features.
- **For Business View**: Feature pillars highlighting discovery, lead conversion, and automation benefits.

The app uses client-side state for plan selection (stored in localStorage) and mock data for demo purposes. Future integrations can leverage Cloudflare Workers for API endpoints.

## Key Features

- **Visual Excellence**: Modern UI with gradients, micro-animations (via Framer Motion), and responsive layouts across devices.
- **Interactive Polish**: Hover states, focus rings, tab transitions, and toast notifications for delightful user experiences.
- **Plan Gating**: Starter plan shows obfuscated leads and one-time audits; Growth unlocks CRM and monthly reports; Scale adds AI features.
- **Dashboard Widgets**: Leads list, SEO score with progress ring, keyword rank charts (Recharts), and AI call logs with progress bars.
- **Sales-Focused Design**: Clear CTAs, trust signals, and upgrade prompts to guide users toward conversion.
- **Responsive & Accessible**: Mobile-first design with proper contrast, keyboard navigation, and ARIA labels.

## Technology Stack

- **Frontend**: React 18, React Router DOM, shadcn/ui (component primitives), Tailwind CSS v3
- **State Management**: Zustand (for plan persistence), React Query (for future API caching)
- **UI/UX**: Lucide React (icons), Framer Motion (animations), Sonner (toasts), clsx & tailwind-merge (class utilities)
- **Data Visualization**: Recharts (charts and graphs)
- **Backend/Deployment**: Cloudflare Workers (Hono router), Wrangler (CLI), Vite (build tool)
- **Utilities**: Zod (validation), Immer (immutable updates), React Hook Form (forms if extended)
- **Development**: TypeScript, ESLint, Bun (package manager)

## Quick Start

### Prerequisites

- Bun (Node.js alternative): Install from [bun.sh](https://bun.sh)
- Cloudflare account (for deployment): Sign up at [cloudflare.com](https://cloudflare.com)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd oregon-smb-growth
   ```

2. Install dependencies using Bun:
   ```
   bun install
   ```

3. Start the development server:
   ```
   bun dev
   ```

   The app will be available at `http://localhost:3000` (or the port specified in your environment).

### Usage Examples

- **Navigate Tabs**: On the home page, use the tab navigation to switch between "Find a Pro" (search mockups), "For Business" (feature pillars), and "Pricing" (plan cards).
- **Select a Plan**: Click a pricing card CTA (e.g., "Start 7-Day Free Trial" on Growth) to set the plan and route to the Dashboard.
- **View Dashboard**: Widgets update based on the selected plan. For Starter, leads are locked with upgrade prompts; Growth shows full leads and SEO; Scale adds AI logs.
- **Upgrade Flow**: From gated widgets, click "Upgrade" to return to Pricing with the next plan pre-highlighted.

Example interaction in code (from Dashboard):
```tsx
// Plan selection updates widgets
const plan = useStore(s => s.plan); // Zustand primitive selector
<LeadsWidget plan={plan} /> // Gated rendering
```

Toasts provide feedback:
```tsx
import { toast } from 'sonner';
toast.success('Plan selected!', { description: 'Welcome to Growth Dashboard' });
```

## Development

### Project Structure

```
src/
├── components/     # UI components (shadcn/ui in ui/, custom in root)
├── hooks/          # Custom React hooks (e.g., use-theme.ts)
├── lib/            # Utilities (utils.ts, errorReporter.ts)
├── pages/          # Route components (HomePage.tsx)
└── main.tsx        # App entry with RouterProvider and QueryClient

worker/             # Cloudflare Worker routes (userRoutes.ts for custom APIs)
```

### Running in Development

- **Local Server**: `bun dev` – Hot-reloads changes and proxies API calls.
- **Linting**: `bun lint` – Enforces code quality with ESLint.
- **Type Checking**: Included in build; use `bun tsc --noEmit` for manual checks.
- **Testing**: Add tests in `src/__tests__/` using Vitest (extend as needed).

### Adding Features

- **New Routes**: Edit `src/main.tsx` to add paths in `createBrowserRouter`.
- **API Endpoints**: Add to `worker/userRoutes.ts` (e.g., `app.get('/api/leads', ...)`). Access via `fetch('/api/leads')`.
- **Custom Components**: Import shadcn/ui primitives (e.g., `Button` from `@/components/ui/button`) and compose with Tailwind.
- **Animations**: Use Framer Motion for transitions: `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />`.
- **State**: Extend Zustand stores for shared data: `create((set) => ({ plan: 'starter', setPlan: (p) => set({ plan: p }) }))`.

Avoid modifying forbidden files (e.g., `worker/index.ts`, `vite.config.ts`). For Tailwind extensions, update `tailwind.config.js` carefully.

### Environment Variables

Set via `.env` (loaded by Vite):
```
VITE_API_URL=https://your-worker.workers.dev/api
```

## Deployment

Deploy to Cloudflare Workers for global edge delivery with zero-config SPA hosting.

1. **Install Wrangler CLI** (if not already): `bun add -g wrangler`

2. **Login to Cloudflare**:
   ```
   wrangler login
   ```

3. **Configure Project**: Ensure `wrangler.jsonc` has your account ID (auto-set on login).

4. **Build and Deploy**:
   ```
   bun run deploy
   ```
   This builds assets and deploys the Worker. Your app will be live at `<project-name>.workers.dev`.

5. **Custom Domain**: In the Cloudflare dashboard, add a custom domain under Workers > Your Project > Triggers.

[cloudflarebutton]

### Post-Deployment

- **API Routes**: Available at `/api/*` (e.g., `/api/health` for testing).
- **Assets**: Static files served from Vite build; SPA routing handled by Worker.
- **Monitoring**: Use Cloudflare's dashboard for logs, analytics, and error tracking.
- **Updates**: Re-run `bun run deploy` after changes.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Follow the code style (ESLint) and ensure no breaking changes to core Worker files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For issues, open a GitHub issue. For Cloudflare-specific help, refer to [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers).