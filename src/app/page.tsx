"use client";
import AboutMe from "@/components/AboutMe";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";
import { TableOfContent } from "@/components/TableOfContent";

const page = () => {
  return (
    <main className="min-h-dvh bg-background px-32  ">
      <div
        className="flex h-screen flex-col overflow-hidden"
        style={{
          boxShadow: "1px 1px 0 var(--muted), -1px -1px 0 var(--muted)",
        }}
      >
        <Navbar />
        <section className="grid min-h-0 flex-1 grid-cols-12">
          <TableOfContent />

          <div className="col-span-9 flex min-h-0 flex-col ">
            <Banner />
            <div className="py-4 px-4 overflow-y-scroll">
              <AboutMe />
              <SkillsSection />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
