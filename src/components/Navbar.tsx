import Links from "./Links";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex shrink-0 shadow-[1px_1px_0_var(--muted),-1px_-1px_0_var(--muted)]   p-4  justify-between ">
      <Logo />
      <Links />
    </nav>
  );
};

export default Navbar;
