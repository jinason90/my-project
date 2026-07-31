import { fontFamily, palette } from "../theme";

const PATTERN = /\[\[(.+?)\]\]/g;

export const BracketText: React.FC<{
  text: string;
  size: number;
  color?: string;
  accent?: string;
  weight?: number;
}> = ({ text, size, color = palette.white, accent = palette.red, weight = 800 }) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(
      <span key={key++} style={{ color: accent }}>
        [ {match[1]} ]
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return (
    <div style={{ fontSize: size, fontWeight: weight, color, lineHeight: 1.3, fontFamily }}>
      {parts}
    </div>
  );
};
