"use client";

import { links } from "@/store/static";
import ResumeDownload from "./ResumeDownload";
import { Button } from "./ui/button";

const Links = () => {
  return (
    <div className="flex gap-8 items-center ">
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          className="h-fit"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            aria-label={label}
            title={label}
            variant="link"
            size="icon-xs"
            className="cursor-pointer group/btn flex items-center justify-center "
          >
            <Icon className="transition-colors ease-in-out duration-200 size-full stroke-primary fill-space-indigo-200 group-hover/btn:fill-space-indigo-500" />
          </Button>
        </a>
      ))}
      <ResumeDownload />
    </div>
  );
};

export default Links;
