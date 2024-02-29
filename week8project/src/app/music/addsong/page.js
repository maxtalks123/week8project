import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "./Submitbutton";

export default function AddSong() {
  async function handleAddSong(formData) {
    "use server";
    const title = formData.get("title");
    const year = formData.get("year");
    const name = formData.get("name");
    const artist = formData.get("artist");

    await sql`INSERT INTO music (title, year, artist) VALUES (${title}, ${year}, ${artist})`;
    await sql`INSERT INTO genre (genre) VALUES (${name})`;
    const data =
      await sql`SELECT music.id, music.artist, music.year, genre.genre FROM music INNER JOIN genre ON music.id = genre_id`;
    data.rows;

    revalidatePath("/music");
    redirect("/music");
  }
  return (
    <div>
      <h1>Add your song below</h1>
      <form action={handleAddSong}>
        <label>Song title</label>
        <input name="title" placeholder="Enter song title" />
        <label> Year of release</label>
        <input name="year" placeholder="Enter song release year" />
        <label>Artist</label>
        <input name="artist" placeholder="Enter song artist" />
        <label>Genre</label>
        <input name="name" placeholder="Enter genre of song" />
        <SubmitButton />
      </form>
    </div>
  );
}
