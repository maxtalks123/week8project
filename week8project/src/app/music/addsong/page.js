import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "./Submitbutton";

export default function AddSong() {
  async function handleAddSong(formData) {
    "use server";
    const title = formData.get("title");
    const year = formData.get("year");
    const genre = formData.get("genre");
    const artist = formData.get("artist");
    const comment = formData.get("comment");

    let genreResult = await sql`SELECT id FROM genre WHERE genre = ${genre}`;
    let genreId;
    if (genreResult.rows.length > 0) {
      genreId = genreResult.rows[0].id;
    } else {
      let insertResult =
        await sql`INSERT INTO genre (genre) VALUES (${genre}) RETURNING id`;
      genreId = insertResult.rows[0].id;
    }
    await sql`INSERT INTO music (title, year, artist, comment, genre_id) VALUES (${title}, ${year}, ${artist}, ${comment}, ${genreId})`;

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
        <input name="genre" placeholder="Enter genre of song" />
        <label name="comment">Add your comments below</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Enter your comments here"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
