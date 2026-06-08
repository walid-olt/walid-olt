import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import { TableOfContent } from "@/components/TableOfContent";

const page = () => {
  return (
    <main className="min-h-dvh bg-background px-32 pt-16">
      <Navbar />
      <section className="grid grid-cols-12">
        <aside className="col-span-3">
          <TableOfContent />
        </aside>
        <Content />
      </section>
    </main>
  );
};

export default page;
