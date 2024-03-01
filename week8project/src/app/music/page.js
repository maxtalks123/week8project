import { sql } from "@vercel/postgres";
import "../globals.css";
import Link from "next/link";

export default async function Music() {
  let music = (
    await sql`SELECT music.id, music.title, music.artist, music.year, music.comment, music.genre_id, genre.genre FROM music INNER JOIN genre ON music.genre_id = genre.id`
  ).rows;
  return (
    <div>
      <h1>Here is a list of music:</h1>
      {music.map((music) => (
        <div key={music.id} className="p-2 m-2 bg-green-300 rounded border-2">
          <h2>Song title: {music.title}</h2>
          <h2>Artist: {music.artist}</h2>
          <h2>Year of release: {music.year}</h2>
          <p>Genre: {music.genre}</p>
          <p>Comments: {music.comment}</p>
          <Link href={`/music/${music.genre}`}>
            {" "}
            See all songs with this genre!
          </Link>
        </div>
      ))}
    </div>
  );
}
