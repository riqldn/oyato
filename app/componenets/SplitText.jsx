export default function SplitText(text, identifier) {
  return text.split(" ").map((word, i) => {
    return (
      <span key={i} className="inline-block overflow-hidden">
        <span className={`inline-block ${identifier} word`}>
          {word.split("").map((char, j) => (
            <span key={j} className={`inline-block  ${identifier} char`}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        &nbsp;
      </span>
    );
  });
}