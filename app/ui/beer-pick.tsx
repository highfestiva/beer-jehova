import { mainCategories } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Link from 'next/link';

export default function BeerPick() {
  return (
    <div
      className={`${lusitana.className} grid grid-cols-3 grid-rows-2 xl:grid-cols-4 gap-2 items-center leading-none text-orange-800 h-full overflow-hidden`}
    >
      {
        mainCategories.map((category, index) => {
          return (
            <Link
              key={`cat-${index}`}
              href={`/type/${category.name}`}
              className={`${category.className} w-full h-full rounded-lg overflow-hidden relative`}
            >
              <div className={`${category.className} w-full h-full rounded-lg overflow-hidden relative`}>
                <Image
                  src={`/${category.name}.jpg`}
                  width={248}
                  height={248}
                  className="w-full h-full object-cover zoom"
                  alt={`${category.display || category.name}`}
                />
                <p className={`absolute bottom-1 right-2 p-[1px] rounded-md ${category.textClassName}`}>{category.display}</p>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}
