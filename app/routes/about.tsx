import type { Route } from "./+types/about";
import { getAbout } from "~/lib/about.server";

export const meta: Route.MetaFunction = () => [{ title: "About" }];

export const loader = async () => {
    
    const about = await getAbout();
    
    return about;
};

export default function AboutPage({ loaderData: about }: Route.ComponentProps) {

    return (
        <div className="flex items-center justify-center my-5">
            <div className="border w-[400px] p-5 flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">{about.name}</h1>
                <p>{about.description}</p>
            </div>
        </div>
    );
}