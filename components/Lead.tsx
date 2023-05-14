import EmojiCard from "./EmojiCard";
import { use, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface LeadProps {
  lead: any;
}

export default function Lead({ lead }: LeadProps) {
  const [query, setQuery] = useState("");

  const initialIntro = `Hi [Contact's Name],

    I noticed your expertise in [specific field/industry] on LinkedIn and wanted to connect. As an [Your Position/Role] with a passion for [shared interest/industry], I believe there could be valuable synergies between us. Let's connect and explore potential collaboration opportunities!

    Best regards,
    [Your Name]`;
  
  const [intro, setIntro] = useState(initialIntro);

  useEffect(() => {
    if (lead.intro) {
      setIntro(lead.intro)
    }
  }, [lead]);

  return (
    <div
      className="bg-white flex-1 w-full justify-items-start transition"
      onClick={() => {
        // navigator.clipboard.writeText(generatedLead);
        // toast("Bio copied to clipboard", {
        //   icon: "✂️",
        // });
      }}
      key={lead.lastName}
    >
      <div className="flex flex-row mt-5 mb-2">
        <b>Why we think you should reach out:</b>
      </div>
      <div className="flex flex-row">
        <EmojiCard emoji={"🎓"} text={"Same alma mater"} color={"rose"} />
        <EmojiCard emoji={"📄"} text={"Similar job history"} color={"blue"}/>
      </div>
      <div className="flex flex-row mt-5 mb-2">
        <b>Here's an sample intro message:</b>
      </div>
      <div 
        className="leading-relaxed rounded-xl p-4 text-left hover:bg-gray-100 transition cursor-copy border"
        onClick={() => {
          navigator.clipboard.writeText(intro);
          toast("Intro copied to clipboard", {
            icon: "✂️",
          });
        }}
      >
        {intro}
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={1}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
        placeholder={
          "🔄  For example, say 'shorten' to shorten the provided intro"
        }
      />
    </div>
  );
}