"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For dynamic route params
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';


const SearchPage = () => {
  const { page } = useParams(); // This will get the dynamic part from the URL (/search/{page})

  const [data, setData] = useState(null);

  // Fetch data from the API on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/dirtycves/CVE-DATA/refs/heads/main/${page}/packages.json`
        );
        if(response.status == 200){
        const result = await response.json();
        setData(result);
        }
        else{
          toast("This Research is under process kindly check after some time");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If data is not loaded yet, show loading state
  if (!data) {
    return (
      <>
      <ToastContainer />
      <div className="relative h-screen w-screen">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      </>
    );
    
  }

  return (
    <div className="grid grid-rows-[2px_1fr_auto] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <h3 className="text-3xl font-bold mb-4">Result for {page}</h3>

        {/* Container for the vertical line and the content */}
        <div className="flex items-start w-full gap-2">
          {/* Left content - Core Packages */}
          <div className="flex flex-col flex-1">
            <h4 className="text-sm font-bold mb-4">Core Package</h4>

            {/* Dynamically generate cards for each core package */}
            {data.core.map((item, index) => (
              <div key={index} className="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-2">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    {/* Icon */}
                    <svg
                      className="fill-current flex-shrink-0 mr-5"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <path
                        className="text-indigo-300"
                        d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z"
                      />
                      <path
                        className="text-indigo-200"
                        d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z"
                      />
                      <path
                        className="text-indigo-500"
                        d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z"
                      />
                    </svg>
                    {/* Card content */}
                    <div className="flex-grow truncate">
                      {/* Card header */}
                      <div className="w-full sm:flex justify-between items-center mb-3">
                        <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                          {item.pkgname} {/* Dynamically display package name */}
                        </h2>
                      </div>
                      {/* Card body */}
                      <div className="flex items-end justify-between whitespace-normal">
                        <div className="max-w-md text-indigo-100">
                          <p className="mb-2">
                            PKG TYPE: {item.ptype} <br />
                            GHSA ID: {' '}
                            <a
                              href={item.GHSA}
                              className="text-indigo-100 hover:underline"
                            >
                              {item.GHSA}
                            </a>
                          </p>
                        </div>
                        <a
                          className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2"
                          href={`/data/${item.id}`}
                        >
                          <span className="block font-bold">
                            <span className="sr-only">Read more</span> -&gt;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical line */}
          <div className="border-l-2 border-gray-300 dark:border-gray-600 h-full"></div>

          {/* Right content - Dependent Packages */}
          <div className="flex flex-col flex-1">
            <h4 className="text-sm font-bold mb-4">Dependent Package</h4>

            {/* Dynamically generate cards for each dependent package */}
            {data.dependent.map((item, index) => (
              <div key={index} className="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg mb-2">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    {/* Icon */}
                    <svg
                      className="fill-current flex-shrink-0 mr-5"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <path
                        className="text-indigo-300"
                        d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z"
                      />
                      <path
                        className="text-indigo-200"
                        d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z"
                      />
                      <path
                        className="text-indigo-500"
                        d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z"
                      />
                    </svg>
                    {/* Card content */}
                    <div className="flex-grow truncate">
                      {/* Card header */}
                      <div className="w-full sm:flex justify-between items-center mb-3">
                        <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                          {item.pkgname} {/* Dynamically display package name */}
                        </h2>
                      </div>
                      {/* Card body */}
                      <div className="flex items-end justify-between whitespace-normal">
                        <div className="max-w-md text-indigo-100">
                          <p className="mb-2">
                            PKG TYPE: {item.ptype} <br />
                            GHSA ID:{" "}
                            <a
                              href={item.GHSA}
                              className="text-indigo-100 hover:underline"
                            >
                              {item.GHSA}
                            </a>
                          </p>
                        </div>
                        <a
                          className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2"
                          href={item.repo_url}
                        >
                          <span className="block font-bold">
                            <span className="sr-only">Read more</span> -&gt;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
};

export default SearchPage;
