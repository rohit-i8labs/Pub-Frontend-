"use server";

import { cookies } from "next/headers";

export default async function getCookie(name: string) {
    const cookieStore = cookies();
    return (await cookieStore).get(name)?.value || "";
}
