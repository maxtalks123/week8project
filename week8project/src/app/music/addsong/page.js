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
    await sql`INSERT INTO music (title, year, artist, genre_id, comment) VALUES (${title}, ${year}, ${artist}, ${genreId}, ${comment})`;

    revalidatePath("/music");
    redirect("/music");
  }
  return (
    <div className="bg-blue-400 m-2 p-2 flex flex-col items-center">
      <h1>Add your song below</h1>
      <form
        action={handleAddSong}
        className="p-8 w-6/12 flex flex-col justify-center"
      >
        <label>
          <strong>Song title </strong>{" "}
        </label>
        <input name="title" placeholder="Enter song title" />
        <label>
          {" "}
          <strong>Year of release </strong>
        </label>
        <input name="year" placeholder="Enter song release year" />
        <label>
          <strong>Artist </strong>
        </label>
        <input name="artist" placeholder="Enter song artist" />
        <label>
          <strong>Genre </strong>
        </label>
        <input name="genre" placeholder="Enter genre of song" />
        <label name="comment">
          <strong>Add your comments below </strong>
        </label>
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
