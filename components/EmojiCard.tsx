
interface EmojiCardProps {
  emoji: string;
  text: string;
  color: string;
}

export default function EmojiCard({ emoji, text, color }: EmojiCardProps) {
  return (
    <div
      className={`border-2 border-${color}-300 rounded-xl p-4 mr-4 mb-4`}
      key={text}
    >
      {emoji} {text}
    </div>
  );
}