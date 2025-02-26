"use client";

interface LetterCounterProps {
    limit: number;
    letters: string;
}
const LetterCounter = ({ letters, limit }: LetterCounterProps) => {
    const limitWarning = letters.length > limit ? "text-red-500 font-bold" : "text-gray-500";
    return <span className="relative right-0 text-sm text-gray-500">
        <span className={limitWarning}>
            {letters.length}
        </span> / {limit}</span>
}

export default LetterCounter;