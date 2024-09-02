"use client";

import BigNumber from "bignumber.js";
import Link from "next/link";
import clsx from "clsx";

import useToken from "@/hooks/token/useToken";
import { copyToClipboard, formatBigNumber, shortenAddress } from "@/lib/utils";
import config from "@/uiconfig.json";

import TokenInfoLoading from "./TokenInfoLoading";
import { CHAINS } from "@/constants/chains";
import { Icons } from "../Icons";

const TokenInfo = () => {
  const { contractAddress, chainId, project } = config;
  const chainInfo = CHAINS[chainId as keyof typeof CHAINS];
  const { loading, name, symbol, decimals, tokenSupply } = useToken();

  if (loading) {
    return <TokenInfoLoading />;
  }

  const infoItems = [
    { label: "Token Name", value: project?.name || name },
    { label: "Ticker", value: project?.symbol || symbol },
    {
      label: "Token Supply",
      value: formatBigNumber(
        BigNumber(tokenSupply)
          .dividedBy(BigNumber(10).exponentiatedBy(18))
          .toString(10)
      ),
    },
    {
      label: "Network",
      value: chainInfo.name,
    },
    { label: "Creator Address", value: config.owner, isAddress: true },
    { label: "Contract Address", value: contractAddress, isAddress: true },
  ];

  return (
    <div className="flex flex-col gap-3 justify-between font-bold text-xs sm:text-base">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col sm:flex-row sm:justify-between"
        >
          <p className="mb-1 sm:mb-0 text-xs">{item.label}</p>
          {item.isAddress ? (
            <div className="flex items-center gap-1">
              <button
                  className="border-b border-current text-xs text-foreground hover:text-primary focus-visible:outline-none"
                  onClick={() =>
                    window.open(
                      `${chainInfo?.explorer}/address/${item.value}`,
                      "_blank",
                    )
                  }
                >
                  View on Explorer
                  <Icons.externalLink className="ml-2 inline-block h-4 w-4" />
                </button>
            </div>
          ) : (
            <p className="text-neutral-400 break-all text-xs">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TokenInfo;