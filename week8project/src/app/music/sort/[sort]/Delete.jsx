"use client";
import handleDelete from "./handledelete";

export default function DeleteButton({ id }) {
  return (
    <button
      className="p-1 m-1 border-4 border-black rounded-md  bg-red-500 text-white"
      onClick={() => handleDelete(id)}
    >
      Delete this song
    </button>
  );
}
