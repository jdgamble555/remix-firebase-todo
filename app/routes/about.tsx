import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAbout } from "~/lib/about.server";

export const loader = async () => {
    
    const about = await getAbout();
    
    return json(about);
};

export default function AboutPage() {

    const about = useLoaderData<typeof loader>();

    return (
        <div className="flex items-center justify-center my-5">
            <div className="border w-[400px] p-5 flex flex-col gap-3">
                <h1 className="text-3xl font-semibold">{about.name}</h1>
                <p>{about.description}</p>
            </div>
        </div>
    );
}