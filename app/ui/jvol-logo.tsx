import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function JvolLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-orange-200 overflow-hidden`}
    >
      <Image
        src="/logo.jpg"
        width={124}
        height={256}
        className="p-0 mr-5 h-full object-contain"
        alt="JVØL logo"
      />
      <p className="text-[18px] sm:text-[30px] md:text-[38px] lg:text-[30px] xl:text-[44px] md:w-83 text-right">Jehovas Vidners Øl Levering</p>
    </div>
  );
}
