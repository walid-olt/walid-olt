import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const ResumeDownload = () => {
  return (
    <a href="/walid.oumoulilte.fr.pdf" download>
      <Button variant="outline" className={"cursor-pointer"}>
        <DownloadSimpleIcon size={32} /> resume
      </Button>
    </a>
  );
};

export default ResumeDownload;
