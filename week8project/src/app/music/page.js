import { sql } from "@vercel/postgres";

export default async function music() {
  let music = (await sql`SELECT * from music`).rows;
  return (
    <div>
      <h1>Here is a list of music:</h1>
      {music.map(() => {
        <div key={music.id}>
          <h2>Song title: {music.title}</h2>
          <h2>Year of release: {music.year}</h2>
          <h2>Artist: {music.artist}</h2>
          <p>Genre: {music.genre}</p>
          console.log({music.genre})
        </div>;
      })}
    </div>
  );
}
