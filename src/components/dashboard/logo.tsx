import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <h3 className="text-2xl">
        Write<span className="text-primary">ItUp</span>
      </h3>
    </Link>
  );
};

export default Logo;
