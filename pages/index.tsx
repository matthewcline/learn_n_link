import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Lead from "../components/Lead";
import LeadCard from "../components/LeadCard";
import leads from "../lib/sampleLeads.json";
import Accordion from "../components/accordion";


const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [questionSet, setQuestionSet] = useState("GenerateLeads");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [JobLink, setJobLink] = useState("");
  const [bioHighlight, setBioHighlight] = useState("");
  const [Experience, setExperience]  = useState("");
  const [generatedLeads, setGeneratedLeads] = useState(leads.leads);

  const leadRef = useRef<null | HTMLDivElement>(null);

  const scrollToLeads = () => {
    if (leadRef.current !== null) {
      leadRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const questionSet1 = {
    bioQuestion: "What experience do you want to highlight?",
    connectQuestion: "Who are you looking to connect with?",
  };

  const questionSet2 = {
    bioQuestion: "What is your favorite hobby?",
    connectQuestion: "What is your dream job?",
  };

  const prompt = ``;

  // URL Validation
  const isValidURL = (s: string) => {
    try {
      new URL(s);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateLeads = async (e: any) => {
    e.preventDefault();
    // Check if LinkedIn link is valid
    if (!isValidURL(linkedInLink)) {
      toast.error("Please enter a valid LinkedIn URL");
      return;
    }

    // Check if Job link is valid (only for the "WriteCover" questionSet)
    if (questionSet === "WriteCover" && !isValidURL(JobLink)) {
      toast.error("Please enter a valid job link URL");
      return;
    }
    setGeneratedLeads([]);
    setLoading(true);
    const response = await fetch("https://learn-and-link.vercel.app/intro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "candidate_summary": "candidate summary",
        "lead_summary": "lead summary",
        "aspiration": bioHighlight,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setGeneratedLeads((prev) => prev + chunkValue);
    // }
    setGeneratedLeads(leads.leads);
    scrollToLeads();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Learn-n-Link</title>
        <link rel="icon" href="/handshake.png" />
      </Head>

    <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-4xl text-4xl max-w-[708px] font-bold text-slate-900">
          Find the perfect intro to the people and jobs you want to connect with!
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex justify-center mt-8">
            <button
              className={`px-4 py-2 rounded-md mx-2 ${
                questionSet === "GenerateLeads"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => {
                setQuestionSet("GenerateLeads");
                setBio("");
                setBioHighlight("");
                setLinkedInLink("");
                setJobLink("");
              }}
            >
              Generate Leads
            </button>
            <button
              className={`px-4 py-2 rounded-md mx-2 ${
                questionSet === "WriteCover"
                  ? "bg-black text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => {
                setQuestionSet("WriteCover");
                setBio("");
                setBioHighlight("");
                setLinkedInLink("");
                setJobLink("");
              }}
            >
              Write Cover Letters
            </button>
          </div>
          <div className="flex mt-10 items-center space-x-3">
            <h1 className="text-2xl">🔁</h1>
            <p className="text-left font-medium">Connect your LinkedIn</p>
          </div>
          <textarea
            value={linkedInLink}
            onChange={(e) => setLinkedInLink(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"https://www.linkedin.com/in/yourname"}
          />
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl">👩‍💻</h1>
            <p className="text-left font-medium">
              {questionSet === "GenerateLeads"
                ? questionSet1.bioQuestion
                : questionSet2.bioQuestion}
            </p>
          </div>
          <textarea
            value={Experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com."
            }
          />
          {questionSet === "WriteCover" && ( // Add this conditional rendering block
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl">🔗</h1>
            <p className="text-left font-medium">Sample job link</p>
          </div>
          )}
          {questionSet === "WriteCover" && ( // Add this conditional rendering block
          <textarea
            value={JobLink}
            onChange={(e) => setJobLink(e.target.value)}
            rows={1}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"https://www.example.com/job/sample-job"}
          />
          )}
          <div className="flex items-center space-x-3">
          <h1 className="text-2xl">🤝</h1>
          <p className="text-left font-medium">
            {questionSet === "GenerateLeads"
              ? questionSet1.connectQuestion
              :questionSet2.connectQuestion}
            </p>
            </div>
            <textarea
            value={bioHighlight}
            onChange={(e) => setBioHighlight(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Engineering managers, recruiters, and developers at companies like Google, Facebook, and Amazon."
            }
            />
            
            {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt8 hover:bg-black/80 w-full"
              onClick={(e) => generateLeads(e)}
              >
              Generate your leads →
              </button>
              )}
              {loading && (
              <button
                         className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                         disabled
                       >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedLeads && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={leadRef}
                >
                  Your generated leads
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center mx-auto">
                {generatedLeads
                  .map((generatedLead) => (
                    <Accordion key={generatedLead.lastName} title={<LeadCard key={generatedLead.lastName} lead={generatedLead} />} content={<Lead key={generatedLead.lastName} lead={generatedLead} />} />
                  ))
                }
              </div>
            </>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;