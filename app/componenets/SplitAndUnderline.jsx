export default function SplitAndUnderline(text, underlineWord, identifier) {
  return text.split(" ").map((word, i) => {
    const isUnderline = word.toUpperCase() === underlineWord.toUpperCase();

    return (
      <span key={i} className="inline-block">
        <span className={`inline-block ${identifier} word opacity-0`}>
          {word.split("").map((char, j) => (
            <span key={j} className={`inline-block char ${isUnderline ? "underline" : ""}`}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        &nbsp;
      </span>
    );
  });
}