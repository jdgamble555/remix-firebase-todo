import type { Route } from "./+types/_index";
import Home from "~/components/home";
import { UserProvider } from "~/lib/use-user";

export const meta: Route.MetaFunction = () => [
  { title: "React Router Firebase Todo App" },
  { name: "description", content: "Sign in with Google and manage your realtime Firebase todo list with React Router." },
];

export default function Index() {
  return <main><UserProvider><Home /></UserProvider></main>;
}
