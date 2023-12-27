"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer w-auto"
      height="50"
      width="100"
      src="/images/logo2.svg"
    />
  );
};

export default Logo;
