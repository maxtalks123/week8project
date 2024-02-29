import { sql } from "@vercel/postgres";

export default async function music() {
  let music = (
    await sql`SELECT music.id, music.artist, music.year, genre.name FROM music INNER JOIN genre ON music.id = genre.id`
  ).rows;
  return (
    <div>
      <h1>Here is a list of music:</h1>
      {music.map(() => {
        <div key={music.id}>
          <h2>Song title: {music.title}</h2>
          <h2>Artist: {music.artist}</h2>
          <h2>Year of release: {music.year}</h2>
          <p>Genre: {music.name}</p>
        </div>;
      })}
    </div>
  );
}
