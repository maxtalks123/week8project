"use client";
import handleDelete from "./handledelete";

export default function DeleteButton({ id }) {
  return <button onClick={() => handleDelete(id)}>Delete this song</button>;
}
