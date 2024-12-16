"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

import gasp from "gsap"; // 필요
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

import { twJoin } from "tailwind-merge";

import "@/styles/global/animation/slideLeftReturn.scss"; // 스무스한 효과를 위해 필요
import "@/styles/global/animation/slideRightReturn.scss"; // 스무스한 효과를 위해 필요
import "@/styles/promotion/promotionPage.scss";

gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

const PromotionPage = () => {
  const { t, i18n } = useTranslation();

  const tagStyle = "px-4 py-2 rounded-lg text-md";

  useEffect(() => {
    gsap.from(".slideLeftReturn", {
      scrollTrigger: {
        trigger: ".slideLeftReturn",
        start: "top bottom",
        end: "top center",
        scrub: true,
        onEnter: () => console.log("trigger"),
      },
      opacity: 1,
      duration: 1.0,
    });

    gsap.from(".slideRightReturn", {
      scrollTrigger: {
        trigger: ".slideRightReturn",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      opacity: 1,
      duration: 1.0, // 애니메이션 지속 시간
    });
  }, []);

  const renderAcnhSection = () => {
    const hashTagKeywords = [
      "모동숲커미션",
      "동숲공지표커미션",
      "모여봐요 동물의 숲",
      "걍진커미션",
      "SD커미션",
    ];
    return (
      <>
        <div>
          <div className="grid grid-cols-2 items-center">
            <Image
              className="slideLeftReturn"
              src={"/assets/image/AC_NOTE1.jpg"}
              alt="AC_NOTE1"
              width={600}
              height={300}
            />
            <div className="slideRightReturn">
              <div className="text-2xl font-bold text-center">
                💗 공지표, 초대장 💗
              </div>
              <div className="py-5 flex justify-center flex-wrap gap-2">
                {hashTagKeywords.map((item: string, index: number) => (
                  <span
                    key={index}
                    className={twJoin(tagStyle, "bg-blue-100 text-blue-600")}
                  >
                    #{item}
                  </span>
                ))}
              </div>
              <div className="animal-crossing-notice-desc">
                <div className="text-lg font-semibold text-center">
                  {"🌟 게임을 함께할 커뮤니티를 모집하세요! 🌟"}
                </div>
                <div>
                  {
                    "원하시는 컨셉과 분위기에 맞추어 공지표를 제작해드립니다. 분위기와 색상을 말씀해주세요! 🎨"
                  }
                </div>
                <div>
                  {
                    "프로필 등으로 사용할 수 있도록 캐릭터와 주민 일러스트를 별도 전송해 드립니다! 💌"
                  }
                </div>
                <div>
                  {
                    "같은 디자인에 2종류 다른 문구를 지원합니다. 2가지 버전을 모두 신청서에 첨부해 주세요 📝"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAcnhCoupleSection = () => {
    const hashTagKeywords = [
      "모동숲커미션",
      "모동숲커플커미션",
      "동숲프로필커미션",
      "걍진커미션",
      "SD커미션",
    ];
    return (
      <>
        <div className="py-10">
          <div className="grid grid-cols-2 items-center">
            <Image
              className="slideLeftReturn"
              src={"/assets/image/AC_NOTE1.jpg"}
              alt="AC_NOTE1"
              width={600}
              height={300}
            />
            <div>
              <div className="text-2xl font-bold text-center ">
                💗 커플 프로필 💗
              </div>
              <div className="py-5 flex justify-center flex-wrap gap-2">
                {hashTagKeywords.map((item: string, index: number) => (
                  <span
                    key={index}
                    className={twJoin(tagStyle, "bg-green-100 text-green-600")}
                  >
                    #{item}
                  </span>
                ))}
              </div>
              <div className="animal-crossing-notice-desc">
                <div className="text-lg font-semibold text-center">
                  {"🌟 게임을 함께할 커뮤니티를 모집하세요! 🌟"}
                </div>
                <div>
                  {
                    "원하시는 컨셉과 분위기에 맞추어 공지표를 제작해드립니다. 분위기와 색상을 말씀해주세요! 🎨"
                  }
                </div>
                <div>
                  {
                    "프로필 등으로 사용할 수 있도록 캐릭터와 주민 일러스트를 별도 전송해 드립니다! 💌"
                  }
                </div>
                <div>
                  {
                    "이펙트와 배경을 추가하면 더 예쁜 그림을 얻을 수 있습니다. 📝"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderLostArkSection = () => {
    const hashTagKeywords = [
      "로스트아크",
      "로스트아크커미션",
      "게임커미션",
      "걍진커미션",
      "SD커미션",
    ];
    return (
      <>
        <div className="py-10">
          <div className="grid grid-cols-2 items-center">
            <Image
              className="slideLeftReturn"
              src={"/assets/image/AC_NOTE1.jpg"}
              alt="AC_NOTE1"
              width={600}
              height={300}
            />
            <div>
              <div className="text-2xl font-bold text-center ">
                💗 로스트아크 커미션 💗
              </div>
              <div className="py-5 flex justify-center flex-wrap gap-2">
                {hashTagKeywords.map((item: string, index: number) => (
                  <span
                    key={index}
                    className={twJoin(
                      tagStyle,
                      "bg-orange-100 text-orange-600"
                    )}
                  >
                    #{item}
                  </span>
                ))}
              </div>
              <div className="animal-crossing-notice-desc">
                <div className="text-lg font-semibold text-center">
                  {"🌟 게임을 함께할 커뮤니티를 모집하세요! 🌟"}
                </div>
                <div>
                  {
                    "원하시는 컨셉과 분위기에 맞추어 공지표를 제작해드립니다. 분위기와 색상을 말씀해주세요! 🎨"
                  }
                </div>
                <div>
                  {
                    "프로필 등으로 사용할 수 있도록 캐릭터와 주민 일러스트를 별도 전송해 드립니다! 💌"
                  }
                </div>
                <div>
                  {
                    "이펙트와 배경을 추가하면 더 예쁜 그림을 얻을 수 있습니다. 📝"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="px-5">
      <div className="py-5 text-center font-bold text-2xl">
        {t("ANIMAL_CROSSING.LONG-ALIAS")} ({t("ANIMAL_CROSSING.SHORT-ALIAS")})
      </div>
      {renderAcnhSection()}
      {renderAcnhCoupleSection()}
      {renderLostArkSection()}
    </div>
  );
};

export default PromotionPage;
