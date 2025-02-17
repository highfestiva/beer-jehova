import { products } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function BeerSwimlane() {
  return (
    <div className={`${lusitana.className} text-orange-800 h-full overflow-hidden`} >
      <div className="flex flex-row items-center">
        {
          products.map((prod) => {
            return (
              <div className="w-30 h-38 rounded-lg overflow-hidden relative">
                <Image
                  src={`/beer/${prod.name}.jpg`}
                  width={96}
                  height={96}
                  className="w-30 h-30 object-cover zoom"
                  alt={`${prod.display}`}
                />
                <h4 className="absolute beer-swimlane-item-text">{prod.display}</h4>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
