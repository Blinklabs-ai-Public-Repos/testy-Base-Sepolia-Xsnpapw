import Image from "next/image";
import Link from "next/link";
import config from "@/uiconfig.json";
import ButtonTray from "./components/ButtonTray";
import TokenInfo from "./components/TokenInfo/TokenInfo";
import TokenTabs from "./components/TokenTabs";
import { Icons } from "./components/Icons";

const socialIcons = {
  x: {
    icon: <Icons.twitterX />,
    activeColor: "text-black",
    inactiveColor: "text-gray-500",
  },
  discord: {
    icon: <Icons.discord />,
    activeColor: "text-black",
    inactiveColor: "text-gray-500",
  },
  telegram: {
    icon: <Icons.telegram />,
    activeColor: "text-black",
    inactiveColor: "text-gray-500",
  },
};

const SocialIcons = ({ media }: { media: Record<string, string> }) => (
  <div className="flex gap-2 sm:mt-0 mb-8">
    {Object.entries(socialIcons).map(([key, { icon, activeColor, inactiveColor }]) => {
      const url = media[key];
      const isActive = !!url;

      const socialIcon = (
        <div
          className={`flex h-[27px] w-[27px] items-center justify-center rounded-full p-1 ${
            isActive ? `${activeColor} bg-white` : `${inactiveColor} bg-gray-300/30`
          }`}
        >
          {icon}
        </div>
      );

      return (
        <div className="flex items-center" key={key}>
          <Link href={url} target="_blank" rel="noopener noreferrer">
                  {socialIcon}
                </Link>
          {/* <Icons.externalLink className="ml-1 h-3 w-3" /> */}
        </div>
      );
    })}
  </div>
);

const MintPage = () => {
  const { project } = config;
  const { name, description, logoUrl, bannerUrl, media } = project;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <div className="w-full h-[200px] sm:h-[360px] relative">
          <Image
            src={bannerUrl}
            alt="banner"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
        <div className="w-full px-4 flex flex-col sm:flex-row items-center sm:items-end justify-between absolute -bottom-[50px]">
          <Image
            src={logoUrl}
            alt="logo"
            height={100}
            width={100}
            unoptimized
            className="rounded-lg mb-2 sm:mb-0"
          />
          <SocialIcons media={media} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-18 px-4 py-16 sm:mt-0">
        <div className="sm:col-span-2 flex flex-col gap-3">
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-sm line-clamp-4">{description}</p>
          <ButtonTray />
        </div>
        <TokenInfo />
      </div>
      <TokenTabs />
      <div className="py-4"></div>
    </div>
  );
};

export default MintPage;