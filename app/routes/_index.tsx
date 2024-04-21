import { json, type MetaFunction } from "@remix-run/node";
import Home from "~/components/home";
import { useEnv } from "~/lib/use-env";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Firebase Todo App" },
    { name: "description", content: "Remix Firebase Todo App" },
  ];
};

export async function loader() {
  return json({
    PUBLIC_FIREBASE_CONFIG: process.env.PUBLIC_FIREBASE_CONFIG
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  useEnv(data);
  return (
    <Home />
  );
}
