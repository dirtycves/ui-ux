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

  const [data, setData] = useState(null);

  // Fetch data from the API on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/dirtycves/CVE-DATA/refs/heads/main/${page}/data.json`
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

  const packageData = [
    {
      package: "github.com/strangelove-ventures/horcrux/v3",
      affectedVersions: ">= 3.1.0, < 3.3.2",
      patchedVersion: "3.3.2",
    },
  ];
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
    <div className="flex flex-col max-w-7xl mx-auto">
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
          <div className="p-6 rounded-xl border border-white/20 bg-white/5">
            <h6 className="text-sm font-bold mb-4">Description</h6>
            <div className="p-6">
              <h1 className="text-4xl font-thin">
                {data.title}
              </h1>
              <hr className="my-2" />

              {/* Summary */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Summary</h4>
                <p className="my-2 text-gray-300">
                  {data.summary}
                </p>
              </div>

              {/* Probability */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Probability</h4>
                <p className="my-2 text-gray-300">
                  The bug has an extremely low probability of occurrence,
                  affecting one validator out of hundreds that have been using
                  the affected software versions to validate over the past few
                  years. The probability of an exploit happening is in the range
                  of 1 in 1 billion per signed vote.
                </p>
              </div>

              {/* Severity */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Severity</h4>
                <p className="my-2 text-gray-300">
                  While rare, it is of high severity, as the double-sign
                  (tombstone) slashing on most Cosmos chains is typically 5% of
                  the validator’s self-stake and the stake of delegators
                  associated with the validator. While the bug is not
                  exploitable, the urgency to patch the issue is high due to the
                  nature of double-signing penalties.
                </p>
              </div>

              {/* Impact */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Impact</h4>
                <ul className="list-disc pl-5 my-2 text-gray-300">
                  <li>One known validator (01node) was affected.</li>
                  <li>
                    The validator and its delegators were slashed 5% of their
                    staked assets (~75,000 OSMO, ~$20,000 USD).
                  </li>
                  <li>
                    The incident occurred at Osmosis block height 30968345.
                  </li>
                </ul>
              </div>

              {/* Technical Details */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">
                  Technical Details
                </h4>

                <h4 className="text-lg font-semibold my-3">Root Cause</h4>
                <p className="my-2 text-gray-300">
                  The issue was caused by a race condition in the signature
                  state handling code. Two sign requests arrived nearly
                  simultaneously for the same Height-Round-Step (HRS), but a
                  split read-write lock was used, allowing both requests to
                  proceed instead of being serialized. This led to Horcrux
                  signing both a "yes" vote (non-BlockID) and a "no" vote (nil
                  BlockID) for the same block, constituting a double-sign
                  violation.
                </p>

                <p className="my-2 text-gray-300">
                  The affected code had two issues:
                </p>
                <ol className="list-decimal pl-5 my-2 text-gray-300">
                  <li>
                    The{" "}
                    <code className="bg-white/10 p-1 rounded-lg">
                      GetSigState()
                    </code>{" "}
                    method used a read lock to check the current signature
                    state.
                  </li>
                  <li>
                    The{" "}
                    <code className="bg-white/10 p-1 rounded-lg">
                      UpdateSigState()
                    </code>{" "}
                    method used a separate write lock to update the state.
                  </li>
                </ol>

                <p className="my-2 text-gray-300">
                  Because the usage of these operations unlocked in the middle
                  to perform checks rather than occurring under a single lock,
                  they were not atomic. Very rarely, two concurrent signature
                  requests could both pass the initial safety check before
                  either one updated the state, leading to a double signature.
                </p>

                <p className="my-2 text-gray-300">
                  Evidence from logs shows two different signatures were
                  produced within 1.5 milliseconds of each other:
                </p>
                <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs my-2 overflow-auto">
                  {`DuplicateVoteEvidence{
  VoteA: Vote{69:03C016AB7EC3 30968345/00/SIGNED_MSG_TYPE_PREVOTE(Prevote) 000000000000 BEEB4E1F5432 000000000000 @ 2025-03-06T21:35:48.759070033Z}, 
  VoteB: Vote{69:03C016AB7EC3 30968345/00/SIGNED_MSG_TYPE_PREVOTE(Prevote) 817EB28D720F FAE04CB3CF89 000000000000 @ 2025-03-06T21:35:48.760639069Z}
}`}
                </pre>

                <p className="my-2 text-gray-300">
                  The affected code had two issues:
                </p>
                <ol className="list-decimal pl-5 my-2 text-gray-300">
                  <li>
                    The{" "}
                    <code className="bg-white/10 p-1 rounded-lg">
                      GetSigState()
                    </code>{" "}
                    method used a read lock to check the current signature
                    state.
                  </li>
                  <li>
                    The{" "}
                    <code className="bg-white/10 p-1 rounded-lg">
                      UpdateSigState()
                    </code>{" "}
                    method used a separate write lock to update the state.
                  </li>
                </ol>

                <h4 className="text-lg font-semibold my-3">Fix</h4>
                <p className="my-2 text-gray-300">
                  The fix implements a single mutex lock that covers both the
                  reading of the current signature state and the subsequent
                  writing of any updates:
                </p>

                <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs my-2 overflow-auto">
                  {`func (signState *SignState) Save(
	ssc SignStateConsensus,
	pendingDiskWG *sync.WaitGroup,
) error {
	signState.mu.Lock()
	if err := signState.getErrorIfLessOrEqual(ssc.Height, ssc.Round, ssc.Step); err != nil {
		signState.mu.Unlock()
		return err
	}

	// HRS is greater than existing state, move forward with caching and saving.
	signState.cache[ssc.HRSKey()] = ssc
	
	// Update state
	// ...
	
	signStateCopy := signState.copy()
	signState.mu.Unlock()
	
	// Perform disk operations
	// ...
}`}
                </pre>

                <p className="my-2 text-gray-300">
                  By using a single lock for both operations, we ensure that
                  only one signature request for a given HRS can proceed at a
                  time, eliminating the race condition.
                </p>
              </div>

              {/* Timeline */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Timeline</h4>
                <ul className="list-disc pl-5 my-2 text-gray-300">
                  <li>
                    <strong>July 6, 2023:</strong> Vulnerability introduced in
                    PR #169 (“sign state signaling”).
                  </li>
                  <li>
                    <strong>March 6, 2025, 21:35 UTC:</strong> 01node
                    double-sign occurred at Osmosis block height 30968345.
                  </li>
                  <li>
                    <strong>March 6, 2025, 22:35 UTC:</strong> 01node reported
                    the incident.
                  </li>
                  <li>
                    <strong>March 7, 2025, 01:00 UTC:</strong> Root cause
                    identified and fix developed.
                  </li>
                  <li>
                    <strong>March 7, 2025:</strong> Fix released and deployed
                    (planned).
                  </li>
                </ul>
              </div>

              {/* Recommendations */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Recommendations</h4>
                <p className="my-2 text-gray-300">
                  All Horcrux users running versions v3.1.0 through v3.3.1
                  should update to the patched version immediately. The fix is
                  backward compatible and does not require any configuration
                  changes.
                </p>

                <h4 className="text-lg font-semibold my-3">
                  Update Instructions
                </h4>
                <ol className="list-decimal pl-5 my-2 text-gray-300">
                  <li>
                    Download the v3.3.2 release binary or container image, or
                    build from source on the v3.3.2 tag.
                  </li>
                  <li>Apply the release binary or image to your deployment.</li>
                  <li>
                    Restart your cosigner processes one at a time to ensure
                    continuous validator operation.
                  </li>
                </ol>
              </div>

              {/* Preventive Measures */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">
                  Preventive Measures
                </h4>
                <ol className="list-decimal pl-5 my-2 text-gray-300">
                  <li>
                    Adding additional tests focused on concurrent signature
                    requests.
                  </li>
                  <li>
                    Implementing a comprehensive review of all critical-path
                    mutex usage in the codebase.
                  </li>
                  <li>
                    Adding additional logging and monitoring for potential
                    double-sign conditions.
                  </li>
                  <li>
                    Enhancing the code review process for security-critical
                    components.
                  </li>
                </ol>
              </div>

              {/* Conclusion */}
              <div className="pb-3">
                <h4 className="text-2xl font-semibold my-3">Conclusion</h4>
                <p className="my-2 text-gray-300">
                  We deeply regret this incident and the impact it has had on
                  affected validators. Horcrux was specifically designed to
                  prevent double-signing, and we take this failure extremely
                  seriously. We are committed to making all necessary
                  improvements to prevent this type of incident from occurring
                  again.
                </p>

                <p className="my-2 text-gray-300">
                  Strangelove is in direct communication with affected parties
                  and will provide any assistance needed, including detailed
                  technical information about the incident and remediation
                  steps.
                </p>

                <p className="my-2 text-gray-300">
                  We will be working with 01node to reimburse those impacted by
                  the tombstone event slash.
                </p>

                <p className="my-2 text-gray-300">
                  For any questions or concerns regarding this incident, please
                  contact
                  <a
                    href="mailto:security@strange.love"
                    className="text-blue-400"
                  >
                    {" "}
                    security@strange.love
                  </a>
                  .
                </p>

                <h4 className="text-lg font-semibold my-3">References</h4>

                <ul className="list-disc pl-5 my-2 text-gray-300">
                  <li>GHSA-6wxf-7784-62fp</li>
                  <li>strangelove-ventures/horcrux#169</li>
                  <li>
                    strangelove-ventures/horcrux@
                    <code className="bg-white/10 p-1 rounded-lg">fb49be9</code>
                  </li>
                  <li>strangelove-ventures/horcrux@fb49be9</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative border-l-2 border-white/20 ml-8 space-y-8 -mt-4 pt-4">
            {/* Top Connecting Line */}
            <div className="absolute left-[-2px] bg-white/20"></div>

            {timelineData.map((item, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline Icons */}
                <div className="relative -left-3.5 -mt-1">{item.icon}</div>

                {/* Timeline Text */}
                <div className="flex text-sm text-gray-300 ml-3 gap-1">
                  {item.userImage && (
                    <Image
                      src={item.userImage}
                      alt={item.user}
                      width={24}
                      height={24}
                      className="rounded-full mr-1"
                      unoptimized
                    />
                  )}
                  {item.user && (
                    <span className="font-semibold text-white">
                      {item.user}{" "}
                    </span>
                  )}
                  {item.action}{" "}
                  {item.link && (
                    <a href="#" className="text-blue-400 hover:underline ">
                      {item.link}
                    </a>
                  )}
                  <span className="text-gray-400"> {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* grid 2 */}
        <div className="col-span-1 gap-4 flex- flex-col">
          {/* Severity */}
          <div className="p-6 rounded-xl">
            <h6 className="text-sm font-bold mb-4">Severity</h6>
            <div className="flex gap-4">
              <h3 className="text-orange-400 border-2 w-fit rounded-full border-orange-400 px-3">
                High
              </h3>
              <p className="text-sm text-gray-400 my-1">8.7/10</p>
            </div>
          </div>
          {/* CVSS */}
          <div className="p-6 rounded-xl border border-white/20 bg-white/5">
            <h6 className="text-sm font-bold mb-4">CVSS v4 base metrics</h6>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h6 className="text-md font-bold">Exploitability Metrics</h6>
                <div className="flex justify-between">
                  <h6 className="text-xs">Attack Vector</h6>
                  <h6 className="text-xs pl-2">Network</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Attack Complexity</h6>
                  <h6 className="text-xs pl-2">Low</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Attack Requirements</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Privileges Required</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">User interaction</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="text-md font-bold">
                  Vulnerable System Impact Metrics
                </h6>
                <div className="flex justify-between">
                  <h6 className="text-xs">Confidentiality</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Integrity</h6>
                  <h6 className="text-xs pl-2">High</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Availability</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="text-md font-bold">
                  Subsequent System Impact Metrics
                </h6>
                <div className="flex justify-between">
                  <h6 className="text-xs">Confidentiality</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Integrity</h6>
                  <h6 className="text-xs pl-2">High</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-xs">Availability</h6>
                  <h6 className="text-xs pl-2">None</h6>
                </div>
              </div>
            </div>
          </div>
          {/* EPSS */}
          <div className="flex flex-col gap-3 break-words p-6">
            <h6 className="text-sm">
              CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:H/VA:N/SC:N/SI:N/SA:N/E:A
            </h6>
            <hr />
            <h6 className="text-xs">EPSS score</h6>
            <hr />
            <h6 className="text-xs font-bold">weakness</h6>
            <div
              className="flex flex-col text-sm"
              onClick={() => setExpanded(!expanded)}
            >
              <h6 className="flex items-center gap-1 text-sm">
                CWE-362{" "}
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDownIcon size={16} />
                </motion.div>
              </h6>
              <motion.p
                className="text-xs overflow-hidden"
                initial={false}
                animate={{
                  height: expanded ? "auto" : 0,
                  opacity: expanded ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <a href="#" className="text-blue-400">
                  Concurrent Execution using Shared Resource with Improper
                  Synchronization ('Race Condition')
                </a>{" "}
                The product contains a code sequence that can run concurrently
                with other code, and the code sequence requires temporary,
                exclusive access to a shared resource, but a timing window
                exists in which the shared resource can be modified by another
                code sequence that is operating concurrently.
                <a href="#" className="text-blue-400">
                  {" "}
                  Learn more on MITRE.
                </a>
              </motion.p>
            </div>

            <hr />
            <h6 className="text-xs font-bold">CVE ID</h6>
            <h6 className="text-sm">No known CVE </h6>
            <hr />
            <h6 className="text-xs font-bold">GHSA ID</h6>
            <h6 className="text-sm">GHSA-6wxf-7784-62fp</h6>
            <hr />
            <h6 className="text-xs font-bold">Source code</h6>
            <h6 className="text-sm">
              <a href="#" className="text-blue-400">
                strangelove-ventures/horcrux
              </a>
            </h6>
            <hr />
            <h6 className="text-xs text-white/35">
              See something to contribute?{" "}
              <a href="#" className="text-blue-400">
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
