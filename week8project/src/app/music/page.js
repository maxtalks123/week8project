import { sql } from "@vercel/postgres";
import "../globals.css";
import Sortfunction from "./sort/[sort]/page";
import { Suspense } from "react";

export default async function Music() {
  let music = (
    await sql`SELECT music.id, music.title, music.artist, music.year, music.comment, music.genre_id, genre.genre FROM music INNER JOIN genre ON music.genre_id = genre.id`
  ).rows;
  return (
    <div>
      <h1>Here is a list of music:</h1>
      <Suspense>
        <Sortfunction music={music} />
      </Suspense>
    </div>
  );
}
