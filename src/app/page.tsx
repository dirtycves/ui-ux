"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { ChangeEvent } from "react";

export default function Home() {
  const router = useRouter();

  const handleSearchSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).search.value;

    if (query) {
      // You'd use router.push here for server-side navigation
      router.push(`/search/${query}`);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h3 className="text-3xl font-bold mb-4">Dirty CVEs</h3>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            Our aim is to make opensource security more better
          </li>
          <li>Make sure anyone can contribute</li>
          <li>Lets Make Application More secure</li>
          <li>All research are under MIT licencese</li>
          <li>Using it from enterprise use is restricted</li>
        </ol>

        <div className="items-center px-4 flex justify-center w-full">
    <div className="relative w-full max-w-xl">
    <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          className="block w-full p-2 pl-10 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:pl-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-800"
          placeholder="CVE-20XX-XXXX, GHSA-h42x-xx2q-6v6g"
        />
      </form>
    </div>
</div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Submit Your research →
        </a>
      </footer>
    </div>
  );
}
