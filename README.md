# React Router + Firebase Todo

Server-rendered React Router framework app with React, Firebase Authentication,
Firestore, Tailwind CSS, and Vite.

## Requirements

Node.js 24.x and npm.

Create a local `.env` file containing `VITE_FIREBASE_CONFIG`, a JSON object with
your Firebase web app configuration. This value is intentionally exposed to the
browser; never put server credentials in it. Enable Google sign-in in Firebase
Authentication and configure Firestore rules for the signed-in user's todos.
The About route reads the existing `about/ZlNJrKd6LcATycPRmBPA` document.

## Development

```sh
npm install
npm run dev
```

Routes are declared in `app/routes.ts`. React Router generates route types in
`.react-router/types`; `npm run typecheck` generates them before checking the app.
Tailwind uses its Vite plugin and the CSS entry point in `app/tailwind.css`.
Oxlint uses `.oxlintrc.json`.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
```

## Production

```sh
npm run build
npm start
```

Deploy `build/client` and `build/server` with the runtime dependencies.
Vite loads `.env` and `.env.local` automatically during development and builds.
Provide `VITE_FIREBASE_CONFIG` before building; it is embedded into both browser and
server bundles. Restart development or rebuild production after changing it.

## Reference and React Router translations

This app follows [Next.js Todo App with Firebase](https://code.build/p/sWvbf7/next-js-todo-app-with-firebase).
The authentication context, todo converter, subscription lifecycle, write helpers,
form state, and per-item errors use the same APIs and behavior.

| Next.js example | React Router equivalent |
| --- | --- |
| `src/app/page.tsx` | `app/routes/_index.tsx`, with the home-only `UserProvider` |
| `src/app/layout.tsx` | `app/root.tsx` document layout and `Outlet` |
| `src/app/about/page.tsx` async component | `app/routes/about.tsx` server loader and generated `Route.ComponentProps` |
| `metadata` | Route `meta` export |
| `force-dynamic` | Request-time loader with SSR enabled, without prerendering |
| `server-only` | `.server.ts` modules, enforced by the framework |
| `next/link` and `href` | React Router `Link` and `to` |
| `next/image` | Native `img` with explicit dimensions |
| `NEXT_PUBLIC_FIREBASE_CONFIG` | `import.meta.env.VITE_FIREBASE_CONFIG`, embedded by Vite at build time |
| `@/*` | `~/*` |
| Tailwind PostCSS plugin | Tailwind Vite plugin |

React Router hydrates interactive route components without Next's `use client` directive.
The server About helper uses a separate Firestore Lite module and validates its document
with Valibot. It follows public Firestore rules and has no browser authentication session.

The todo query requires a composite index on `todos` with `uid` ascending and
`createdAt` ascending. Firestore rules must restrict todo reads and writes to the
owning authenticated UID and allow public reads of the About document. Configure
these in your Firebase project before testing; app builds do not deploy Firebase rules.

To check behavior, sign in with Google, add a task, toggle it, delete it, and verify
updates in a second signed-in tab. Sign out and switch accounts to verify previous
account tasks disappear. Check loading and error states and the server-rendered About page.

## Vercel

`vercel.json` overrides the old Remix framework preset and builds with
`npm run build`. Vercel serves `build/client` as static files and sends remaining
requests to `api/index.js`, which uses React Router's Node request listener for SSR.
The server build is included in the function. This supports React Router 8 without
using the Vercel React Router preset, whose current stable package requires v7.

Set `VITE_FIREBASE_CONFIG` in the Vercel environment before building and set the
project Node.js version to 24.x. Remove any old Remix build or output-directory
overrides in Project Settings. Redeploy after committing these changes.
