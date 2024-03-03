import { sql } from "@vercel/postgres";

export default async function Page({ params }) {
  let music = (
    await sql`SELECT music.id, music.title, music.artist, music.year, music.comment, music.genre_id, genre.genre FROM music INNER JOIN genre ON music.genre_id = genre.id
        WHERE genre.genre = ${params.genre}`
  ).rows;
  return (
    <div>
      <h1> Below are all the songs with the genre: {params.genre}</h1>
      {music.map((music) => (
        <div
          key={music.id}
          className="p-4 m-4 bg-green-300 rounded border-4 border-black w-2/5 inline-flex flex-col items-center"
        >
          <h2>Song title: {music.title}</h2>
          <h2>Artist: {music.artist}</h2>
          <h2>Year of release: {music.year}</h2>
          <p>Genre: {music.genre}</p>
          <p>Comments: {music.comment}</p>
        </div>
      ))}
    </div>
  );
}
