import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface GoToButtonProps {
    href: string;
    style: string;
    filled?: boolean;
    children: React.ReactNode;
}

const GoToButton: React.FC<GoToButtonProps> = ({ href, style, filled, children }) => {
    return <Link
        href={href}
        className={twMerge("block w-full mt-4 p-2 rounded text-center cursor-pointer", 
            filled ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500",
            style)}
    >
        {children}
    </Link>
}

export default GoToButton;