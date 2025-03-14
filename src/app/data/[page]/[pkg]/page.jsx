"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChevronDownIcon,
  Clock,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';



const AdvisoryPage = () => {
  const [expanded, setExpanded] = useState(false);
  const { page } = useParams(); // This will get the dynamic part from the URL (/search/{page})
  const { pkg } = useParams();
  const [data, setData] = useState(null);

  // Fetch data from the API on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/dirtycves/CVE-DATA/refs/heads/main/${page}/${pkg}.json`
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

  console.log(data)

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

 
  const timelineData = [
    {
      icon: (
        <CheckCircle
          className="bg-green-500 text-black p-1.5 rounded-full"
          size={28}
        />
      ),
      userImage:
        "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg",
      user: "agouin",
      action: "published to",
      link: "strangelove-ventures/horcrux",
      time: "yesterday",
    },
    {
      icon: (
        <CheckCircle
          className="bg-green-500 text-black p-1.5 rounded-full"
          size={28}
        />
      ),
      action: "Published to the GitHub Advisory Database",
      time: "yesterday",
    },
    {
      icon: (
        <MessageSquare
          className="bg-gray-400 text-black p-1.5 rounded-full"
          size={28}
        />
      ),
      action: "Reviewed",
      time: "yesterday",
    },
    {
      icon: (
        <Clock
          className="bg-gray-500 text-black p-1.5 rounded-full"
          size={28}
        />
      ),
      action: "Last updated",
      time: "yesterday",
    },
  ];
  return (
    <div className="flex flex-col max-w-7xl mx-auto pb-2">
      <div className="pb-8">
        <h1 className="text-4xl font-thin pb-2 pt-5">
          {data.title}
        </h1>
        <div className="flex gap-2">
          <h3 className="text-red-400 text-xs border w-fit rounded-full border-red-400 px-3 py-1">
            {data.tags.priority}
          </h3>
          <h3 className="text-gray-400 text-xs border w-fit rounded-full border-gray-400 px-3 py-1">
            {data.tags.type}
          </h3>
          <h3 className="text-green-400 text-xs border w-fit rounded-full border-green-400 px-3 py-1">
            {data.tags.status}
          </h3>
        </div>
      </div>
      <div className="flex flex-col md:grid grid-cols-4 gap-4">
        {/* grid 1 */}
        <div className="col-span-3 gap-4 flex flex-col">
          {/* Packages */}
          <div className="border-collapse rounded-xl border border-white/20 bg-white/5 p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="text-sm font-bold">Package</th>
                  <th className="text-sm font-bold">Affected Versions</th>
                  <th className="text-sm font-bold">Patched Version</th>
                </tr>
              </thead>
              <tbody>
                {data.pkg.map((pkg, index) => (
                  <tr key={index}>
                    <td className="p-2">
                        {pkg.package}
                    </td>
                    <td className="p-2">{pkg.affectedVersions}</td>
                    <td className="p-2">{pkg.patchedVersion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Details */}
          <div className="p-2 rounded-xl border border-white/20 bg-white/5">
            <div className="p-6">
              <h1 className="text-2xl font-thin">
                {data.title}
              </h1>
              <hr className="my-2" />

              {/* Summary */}
              <div className="pb-1">
                <h4 className="text-xl font-semibold my-3">Summary</h4>
                <p
  className="my-2 text-gray-300"
  dangerouslySetInnerHTML={{ __html: data.summary }}
></p>
              </div>
              {/* Technical Details */}
              <div className="pb-3">
      <h4 className="text-2xl font-semibold my-3">
        {data.technicalDetails.title}
      </h4>

      {data.technicalDetails.sections.map((section, index) => (
        <div key={index}>
          <h4 className="text-lg font-semibold my-3">{section.title}</h4>

          {section.description.map((desc, i) => (
            <p key={i} className="my-2 text-gray-300 pb-2" dangerouslySetInnerHTML={{ __html: desc }}></p>
          ))}

          {section.list && (
            <ol className="list-decimal pl-5 my-2 text-gray-300 pb-2">
              {section.list.map((item, j) => (
                <li key={j}>
                  {item.text}{" "}
                  <code className="bg-white/10 p-1 rounded-lg">
                    {item.code}
                  </code>{" "}
                  {item.afterText}
                </li>
              ))}
            </ol>
          )}

          {section.codeBlock && (
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs my-2 overflow-auto">
              {section.codeBlock}
            </pre>
          )}

          {section.additionalText && (
            <p className="my-2 text-gray-300"  dangerouslySetInnerHTML={{ __html: section.additionalText }}></p>
          )}
        </div>
      ))}
    </div>

    <h4 className="text-lg font-semibold my-3">References</h4>
<ul className="list-disc pl-5 my-2 text-gray-300">
  {data.references.map((ref, index) => (
    <li key={index}>
      <span className="font-semibold capitalize">{ref.type}: </span>
      <a href={ref.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        {ref.location}
      </a>
    </li>
  ))}
</ul>
      
            </div>
          </div>
         
        </div>
        {/* grid 2 */}
        <div className="col-span-1 gap-4 flex- flex-col">
          {/* Severity */}
          <div className="p-6 rounded-xl">
            <h6 className="text-sm font-bold mb-4">Severity</h6>
            <div className="flex gap-4">
              <h3 className="text-orange-400 border-2 w-fit rounded-full border-orange-400 px-3">
                {data.tags.priority}
              </h3>
              <p className="text-sm text-gray-400 my-1">{data.tags.score}/10</p>
            </div>
          </div>
          {/* CVSS */}
          <div className="p-6 rounded-xl border border-white/20 bg-white/5">
      <h6 className="text-sm font-bold mb-4">{data.cvssMetrics.title}</h6>
      <div className="flex flex-col gap-4">
        {data.cvssMetrics.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h6 className="text-md font-bold">{section.title}</h6>
            {section.metrics.map((metric, i) => (
              <div key={i} className="flex justify-between">
                <h6 className="text-xs">{metric.label}</h6>
                <h6 className="text-xs pl-2">{metric.value}</h6>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
          {/* EPSS */}
          <div className="flex flex-col gap-3 break-words p-6">
          <h6 className="text-sm">{data.cvssVector}</h6>
  <hr />
  
  <h6 className="text-xs">EPSS score</h6>
  <h6 className="text-sm">{data.epssScore || "N/A"}</h6>
  <hr />

  <h6 className="text-xs font-bold">Weakness</h6>
  <div
    className="flex flex-col text-sm"
    onClick={() => setExpanded(!expanded)}
  >
    <h6 className="flex items-center gap-1 text-sm">
      {data.weakness.id} - {data.weakness.description}
    </h6>
  </div>
  
  <hr />
  <h6 className="text-xs font-bold">CVE ID</h6>
  <h6 className="text-sm">{data.cve.id}</h6>
  <hr />

  <h6 className="text-xs font-bold">Analysis Name</h6>
  <h6 className="text-sm">{data.analysis.name}</h6>
  <hr />

  <h6 className="text-xs font-bold">Source Code</h6>
  <h6 className="text-sm">
    <a href={data.sourceCode.url} className="text-blue-400">
      {data.sourceCode.name}
    </a>
  </h6>
            <hr />
            <h6 className="text-xs text-white/35">
              See something to contribute?{" "}
              <a href="https://github.com/dirtycves/CVE-DATA/issues/new" className="text-blue-400">
                Suggest improvements for this vulnerability.
              </a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryPage;
