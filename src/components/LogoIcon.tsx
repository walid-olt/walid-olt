import Link from "next/link";

const LogoIcon = () => {
  return (
    <Link href={"/"}>
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_11_2)" className="*:stroke-space-indigo-500">
          <path
            d="M13.4996 13.4996V13.5159M25.0234 1.97587C22.4778 -0.569759 15.2451 2.52509 8.88915 8.89079C2.52508 15.2549 -0.569768 22.4778 1.97586 25.0251C4.52149 27.5691 11.7542 24.4742 18.1101 18.1085C24.4742 11.7444 27.5691 4.52313 25.0234 1.97587Z"
            strokeWidth="1.92857"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.97585 1.97588C-0.569774 4.52151 2.52507 11.7542 8.89077 18.1102C15.2548 24.4742 22.4778 27.5691 25.025 25.0234C27.569 22.4778 24.4742 15.2451 18.1085 8.88917C11.7444 2.52509 4.52311 -0.569753 1.97585 1.97588Z"
            strokeWidth="1.92857"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_11_2">
            <rect width="27" height="27" className="fill-almond-silk-500" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};

export default LogoIcon;
