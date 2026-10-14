import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [index("routes/_index.tsx"), route("about", "routes/about.tsx")] satisfies RouteConfig;
