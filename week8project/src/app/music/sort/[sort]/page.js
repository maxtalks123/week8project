"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./Delete";

export default function Sortfunction({ music }) {
  const searchParams = useSearchParams();
  const sortType = searchParams.get("sort");

  if (sortType === "asc") {
    music.sort(handleSort);
  }
  if (sortType === "desc") {
    music.sort(handleSort).reverse();
  }

  function handleSort(a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }

  return (
    <div>
      <div className="p-2 m-2 space-x-8 h-12 text-lg">
        <button>
          {" "}
          <Link href="/music?sort=asc">Sort A-Z</Link>
        </button>
        <button>
          {" "}
          <Link href="/music?sort=desc">Sort Z-A</Link>
        </button>
        <button>
          {" "}
          <Link href="/music">Without sort</Link>
        </button>
      </div>
      <>
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
            <Link
              href={`/music/${music.genre}`}
              className="p-1 m-1 border-4 border-white  bg-black text-white rounded-md"
            >
              {" "}
              See all songs with this genre!
            </Link>
            <DeleteButton id={music.id} />
          </div>
        ))}
      </>
    </div>
  );
}
