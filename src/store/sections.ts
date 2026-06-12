import { create } from "zustand";
import type { sections } from "./static.tsx";

type Section = keyof typeof sections;

type ActiveSectionStore = {
  active: Section;
  setActiveSection: (s: Section) => void;
};

export const useActiveSection = create<ActiveSectionStore>((set) => ({
  active: "about",
  setActiveSection: (s) => set({ active: s }),
}));
