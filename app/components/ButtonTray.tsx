import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";
import { LINKS } from "@/constants/common";

import config from "@/uiconfig.json";

const ButtonTray = () => {
  const { project } = config;

  const isLiquidityUrlAvailable = project?.liquidityUrl && project.liquidityUrl.trim() !== "";

  return (
    <div className="flex items-center gap-2 mt-6">
      <Button
        className="font-bold"
        variant={"default"}
        disabled={!isLiquidityUrlAvailable}
      >
        {isLiquidityUrlAvailable ? (
          <Link href={project.liquidityUrl} target="_blank">
            Buy on PancakeSwap
          </Link>
        ) : (
          "Liquidity not supplied"
        )}
      </Button>
    </div>
  );
};

export default ButtonTray;
