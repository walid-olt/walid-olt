import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import { TableOfContent } from "@/components/TableOfContent";

const page = () => {
  return (
    <main className="min-h-dvh bg-background px-32 pt-16 ">
      <div
        className="h-screen   "
        style={{
          boxShadow: "1px 1px 0 var(--muted), -1px -1px 0 var(--muted)",
        }}
      >
        <Navbar className="shadow-[1px_1px_0_var(--muted),-1px_-1px_0_var(--muted)] p-4" />
        <section className="grid grid-cols-12 ">
          <aside className="col-span-3 shadow-[1px_0px_0_var(--muted)] h-full p-4">
            <TableOfContent />
          </aside>
          <Content />
        </section>
      </div>
    </main>
  );
};

export default page;
