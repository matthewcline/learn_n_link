import Image from 'next/image';

interface LeadCardProps {
  lead: any;
}

export default function LeadCard({ lead }: LeadCardProps) {
  const imageUrl = `/${lead.imageUrl}`
  return (
    <div
      className="bg-white rounded-xl max-w-xl shadow-md p-4 hover:bg-gray-100 transition border"
      onClick={() => {
        // navigator.clipboard.writeText(generatedLead);
        // toast("Bio copied to clipboard", {
        //   icon: "✂️",
        // });
      }}
      key={lead.lastName}
    >
      <div className="flex flex-row mt-1 mb-2">
        <Image
          alt="header text"
          src={imageUrl}
          className="w-14 h-14 rounded-lg mr-2"
          width={100}
          height={100}
        />
        <div className="flex flex-col ml-2">
          <p>{lead.firstName} {lead.lastName}</p>
          <p className="mt-1 text-slate-600">{lead.locationName}</p>
        </div>
      </div>
      <p className="mt-4">{lead.summary}</p>
    </div>
  );
}