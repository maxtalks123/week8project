import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center p-4 m-4">
      <h1 className="text-4xl m-4">
        {" "}
        <strong>Welcome to the home page of the music opinion app</strong>
      </h1>
      <p className="text-xl">
        {" "}
        Here you can find all the music you could ever want
      </p>
      <button className="p-5 m-8 border-4 border-black rounded-md  bg-yellow-600">
        <Link href="/music">Click here to see all music</Link>
      </button>
    </div>
  );
}
