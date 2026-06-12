import { Separator } from "@/components/ui/separator";
import type { Skill } from "@/store/static";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";

type Props = {
  skill: Skill;
};

const SkillBadge = ({ skill }: Props) => {
  const { Icon, label, description } = skill;
  return (
    <Item variant="outline">
      <ItemMedia>
        <Icon size={48} />
      </ItemMedia>
      <ItemContent className="gap-0 justify-between !">
        <ItemTitle>{label}</ItemTitle>
        <ItemDescription className="">{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default SkillBadge;
