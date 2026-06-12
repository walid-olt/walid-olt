"use client";

import { DotOutlineIcon, ListDashesIcon } from "@phosphor-icons/react";
import {
  FileItem,
  Files,
  FolderItem,
  SubFiles,
} from "@/components/animate-ui/components/radix/files";
import { sections } from "@/store/static";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";

export const TableOfContent = () => {
  return (
    <aside className="sticky top-0 col-span-3 h-full self-start overflow-y-auto shadow-[1px_0px_0_var(--muted)]">
      <StarsBackground starColor={"#9299d3"}>
        <div className="">
          <Files>
            <FolderItem value="app">
              <FileItem icon={ListDashesIcon} className="text-md">
                Table of content
              </FileItem>
              <SubFiles className="pl-4 *:hover-cursor-pointer *:hover:text-space-indigo-500 *:transition-colors *:ease-in-out *:duration-300">
                {Object.entries(sections).map(([key, { hash }]) => (
                  <a key={key} href={`#${hash.toLowerCase()}`}>
                    <FileItem icon={DotOutlineIcon}>{hash}</FileItem>
                  </a>
                ))}
              </SubFiles>
            </FolderItem>
          </Files>
        </div>
      </StarsBackground>
    </aside>
  );
};

export default TableOfContent;
