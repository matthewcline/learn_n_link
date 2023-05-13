
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