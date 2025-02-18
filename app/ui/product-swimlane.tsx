'use client';

import { useRef, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { getProducts } from '@/app/lib/data';

export default function ProductSwimlane() {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [scrollState, setScrollState] = useState(-1);

  function updateScrollState() {
    const lst = scrollRef.current;
    if (lst == null) {
      return;
    }
    if (lst.scrollLeft <= 20) {
      setScrollState(-1);
    } else if (lst.scrollLeft >= lst.scrollWidth - lst.clientWidth - 20) {
      setScrollState(+1);
    } else {
      setScrollState(0);
    }
  }

  function swim(offset: number) {
    scrollRef.current?.scrollBy({left: offset * 300, top: 0, behavior: 'smooth'});
  }

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    updateScrollState();
  };

  return (
    <div
      className={`${lusitana.className} relative text-orange-800 w-full h-40 overflow-hidden`}
    >
      <ul
        ref={scrollRef}
        className="flex flex-row items-center overflow-x-scroll overflow-y-hidden pb-10"
        onScroll={handleScroll}
      >
        {
          getProducts().map((product, index) => {
            return (
              <li
                key={`product-${index}`}
                className="w-30 h-38 p-2 rounded-lg overflow-hidden relative shrink-0"
              >
                <Image
                  src={`/product/${product.name}.jpg`}
                  width={96}
                  height={96}
                  className="w-30 h-30 object-cover zoom"
                  alt={`${product.display}`}
                />
                <h4 className="absolute product-swimlane-item-text">{product.display}</h4>
              </li>
            );
          })
        }
      </ul>
      <button
        onClick={() => swim(-1)}
        className={`${scrollState >= 0 ? '' : 'hidden'} absolute round-button zoom left-2 bottom-2 flex items-center justify-center`}
      >
        <Image
          src="/arrow-left.svg"
          width={24}
          height={24}
          alt="Slide products left"
        />
      </button>
      <button
        onClick={() => swim(+1)}
        className={`${scrollState <= 0 ? '' : 'hidden'} absolute round-button zoom right-2 bottom-2 flex items-center justify-center`}
      >
        <Image
          src="/arrow-right.svg"
          width={24}
          height={24}
          alt="Slide products right"
        />
      </button>
    </div>
  );
}
