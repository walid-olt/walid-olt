import { useRef } from "react";
import { sections } from "@/store/static";

const section = sections.About;
const AboutMe = () => {
  const ref = useRef<null | HTMLElement>(null);
  return (
    <article id={section.hash} ref={ref} className="h-full pb-6">
      <h2>{section.heading}</h2>
      <p>{section.content}</p>
    </article>
  );
};

export default AboutMe;
