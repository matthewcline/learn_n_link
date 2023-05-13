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

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [questionSet, setQuestionSet] = useState("GenerateLeads");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [JobLink, setJobLink] = useState("");
  const [bioHighlight, setBioHighlight] = useState("");
  const [connectWith, setConnectWith] = useState("");
  

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const questionSet1 = {
    bioQuestion: "What experience do you want to highlight?",
    connectQuestion: "Who are you looking to connect with!",
  };

  const questionSet2 = {
    bioQuestion: "What is your favorite hobby?",
    connectQuestion: "What is your dream job?",
  };

  const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
  }
      Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
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

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
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
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
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
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
              onClick={(e) => generateBio(e)}
              >
              Generate your bios →
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
              {generatedBios && (
              <>
              <div>
              <h2
                             className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                             ref={bioRef}
                           >
              Your generated bios
              </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              {generatedBios.split("\n").map((generatedBio, index) => (
              <div key={index}>{generatedBio}</div>
              ))}
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