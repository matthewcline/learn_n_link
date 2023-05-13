
interface EmojiCardProps {
  emoji: string;
  text: string;
}

export default function EmojiCard({ emoji, text }: EmojiCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 mr-4 mb-4 hover:bg-gray-100 transition cursor-copy"
      key={text}
    >
      {emoji} {text}
    </div>
  );
}