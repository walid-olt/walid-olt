const Banner = () => {
  return (
    <div
      className="w-full h-48 bg-muted  overflow-hidden
shadow-[0px_1px_0_var(--muted)]
      "
    >
      <img
        width={"auto"}
        height={"auto"}
        className="object-cover w-full h-full"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1--9c2LyF6F0oY5qDMtOBf3kN-2rp4A12TQ&s"
        }
      />
    </div>
  );
};

export default Banner;
