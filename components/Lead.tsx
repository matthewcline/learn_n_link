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
      <p>{lead.summary}</p>
      <p>{lead.locationName}</p>
    </div>
  );
}