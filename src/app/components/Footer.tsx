import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-customBlue2 h-36">
      <div className="h-full flex justify-center items-center">
        <Link href="/auth/main">
          <Image
            src="/footer_icon.png"
            alt="My Pet Keeper"
            width={175}
            height={50}
          />
        </Link>
      </div>
    </footer>
  );
}
