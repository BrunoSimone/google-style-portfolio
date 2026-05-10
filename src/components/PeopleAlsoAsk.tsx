"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
interface PeopleAlsoAskProps {
  items: readonly { question: string; answer: string }[];
  title?: string;
}

export function PeopleAlsoAsk({ items, title = "Más preguntas" }: PeopleAlsoAskProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[600px]">
      <h3 className="text-xl text-content-primary font-normal mb-4">
        {title}
      </h3>
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            className="border-b border-surface-border"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex items-center justify-between w-full py-4 text-left cursor-pointer"
            >
              <span className="text-[14px] text-content-primary pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`size-4 text-content-tertiary shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4">
                <p className="text-[13px] text-content-secondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
