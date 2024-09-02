import React from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MarkdownText } from "@/components/MarkdownText";

import config from "@/uiconfig.json";

const TokenDetails = () => {
  const { tokenDetails } = config.project;
  return (
    <div className="flex flex-col gap-4 p-4">
      <MarkdownText
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 animate-fade-in-up break-words p-2"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          h1({ children }) {
            return <h1 className="mb-4 text-2xl font-extrabold">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="mb-3 text-xl font-bold">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="mb-2 text-lg font-medium">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="mb-2 text-base font-medium">{children}</h4>;
          },
          p({ children }) {
            return (
              <p className="mb-2 text-sm text-subtle last:mb-0">{children}</p>
            );
          },
          ul({ children }) {
            return <ul className="mb-2 list-disc pl-4">{children}</ul>;
          },
          li({ children }) {
            return <li className="mb-1 text-sm text-subtle">{children}</li>;
          },
          code({ children }) {
            return (
              <code className="rounded-md bg-black px-2 text-white">
                {children}
              </code>
            );
          },
          strong({ children }) {
            return <strong className="font-bold">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
        }}
      >
        {tokenDetails}
      </MarkdownText>
    </div>
  );
};

export default TokenDetails;
