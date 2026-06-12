import { sections } from "@/store/static";
import SkillBadge from "./SkillBadge";

const { data: skills, hash, heading } = sections.Skills;
const SkillsSection = () => {
  return (
    <div>
      <article id={hash}>
        <h2>{heading}</h2>
      </article>
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ">
        {skills.map((skill) => {
          return <SkillBadge skill={skill} key={skill.label} />;
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
