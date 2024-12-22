"use client";

import Image from "next/image";

import { twJoin } from "tailwind-merge";

interface PromotionCardProps {
  hashTagKeywords: string[];
  hashTagColorStyle: string;
  imgSrc: string;
  title: string | JSX.Element;
  url: string;
  content: JSX.Element;
}

const PromotionCard = ({
  hashTagKeywords,
  imgSrc,
  title,
  hashTagColorStyle,
  url,
  content,
}: PromotionCardProps) => {
  const tagStyle = "px-4 py-2 rounded-lg text-md";

  const openUrl = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="my-5">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center justify-center">
          <Image
            className="w-full cursor-pointer"
            src={imgSrc}
            alt="AC_NOTE1"
            width={600}
            height={300}
            onClick={openUrl}
          />
          <div className="slideRightReturn p-5">
            <div className="text-2xl font-bold text-center">{title}</div>
            <div className="py-5 flex justify-center flex-wrap gap-2">
              {hashTagKeywords.map((item: string, index: number) => (
                <span
                  key={index}
                  className={twJoin(tagStyle, hashTagColorStyle)}
                >
                  #{item}
                </span>
              ))}
            </div>
            <div className="leading-[40px]">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionCard;
