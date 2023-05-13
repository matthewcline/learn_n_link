import EmojiCard from "./EmojiCard";

interface LeadProps {
  lead: any;
}

export default function Lead({ lead }: LeadProps) {
  return (
    <div
      className="bg-white flex-1 w-full justify-items-start transition cursor-copy"
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
        <EmojiCard emoji={"🎓"} text={"Same alma mater"} />
        <EmojiCard emoji={"📄"} text={"Similar job history"} />
      </div>
      <div className="flex flex-row mt-5 mb-2">
        <b>Here's an sample intro message:</b>
      </div>
      <div className="cursor-copy leading-relaxed">
        Hi [Contact's Name],

        I noticed your expertise in [specific field/industry] on LinkedIn and wanted to connect. As an [Your Position/Role] with a passion for [shared interest/industry], I believe there could be valuable synergies between us. Let's connect and explore potential collaboration opportunities!

        Best regards,
        [Your Name]
      </div>
    </div>
  );
}

interface LeadProps {
    lead: any;
  }
  
  export default function Lead({ lead }: LeadProps) {
    return (
      <div
        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
        onClick={() => {
          // navigator.clipboard.writeText(generatedLead);
          // toast("Bio copied to clipboard", {
          //   icon: "✂️",
          // });
        }}
        key={lead.lastName}
      >
        <p>{lead.firstName} {lead.lastName}</p>
        <p className="mt-2 text-slate-600">{lead.locationName}</p>
        <p className="mt-4">{lead.summary}</p>
      </div>
    );
  }
        Best regards,
        [Your Name]
      </div>
    </div>
  );
}