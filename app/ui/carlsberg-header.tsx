import Image from 'next/image';
import Link from 'next/link';

export default function CarlsbergHeader() {
  return (
    <div className="h-full hidden lg:flex items-center justify-center">
      <Link
        href="/brand/carlsberg"
      >
        <Image
          src="/carlsberg.png"
          width={450}
          height={248}
          className="p-0 m-0 h-50 object-contain zoom"
          alt="Carlsberg wet beer"
        />
      </Link>
    </div>
  );
}
