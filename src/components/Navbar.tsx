import Logo from "./Logo";
type Props = React.ComponentPropsWithoutRef<"nav">;
const Navbar = (props: Props) => {
  return (
    <nav {...props}>
      <Logo />
    </nav>
  );
};

export default Navbar;
