import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link } from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import stylesheet from "~/tailwind.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <nav className="flex gap-3 justify-center mt-5">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
