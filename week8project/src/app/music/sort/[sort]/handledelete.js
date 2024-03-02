"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function handleDelete(id) {
  await sql`DELETE from music where music.id = ${id}`;
  revalidatePath("/music");
}
