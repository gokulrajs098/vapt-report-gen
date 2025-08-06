

// A reusable component for creating letter icons
function LetterIcon({ letter, bgColor = "bg-gray-500", size = "w-3 h-3" }) {
  return (
    <div
      className={`font-semibold rounded-full flex items-center text-right font-bold text-slate-800 ${size}`}
    >
      {letter}
    </div>
  );
}

export default LetterIcon;