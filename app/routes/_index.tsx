import { type MetaFunction } from "@remix-run/node";
import Home from "~/components/home";


export const meta: MetaFunction = () => {
  return [
    { title: "Remix Firebase Todo App" },
    { name: "description", content: "Remix Firebase Todo App" },
  ];
};


export default function Index() {
  return (
    <Home />
  );
}
