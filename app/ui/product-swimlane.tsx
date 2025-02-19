'use client';

import { useRef, useState } from 'react';
import { inter, lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/currency';

export default function ProductSwimlane() {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [scrollState, setScrollState] = useState(-1);

  function updateScrollState(offset: number) {
    const lst = scrollRef.current;
    if (lst == null) {
      return;
    }
    if (lst.scrollLeft + offset <= 2) {
      setScrollState(-1);
    } else if (lst.scrollLeft + offset >= lst.scrollWidth - lst.clientWidth - 2) {
      setScrollState(+1);
    } else {
      setScrollState(0);
    }
  }

  function swim(offset: number) {
    offset *= 300;
    updateScrollState(offset);
    scrollRef.current?.scrollBy({left: offset, top: 0, behavior: 'smooth'});
  }

  return (
    <div
      className={`${lusitana.className} relative text-orange-800 w-full h-55 overflow-hidden`}
    >
      <ul
        ref={scrollRef}
        className="flex flex-row items-center overflow-x-scroll overflow-y-hidden pb-10"
      >
        {
          getProducts().map((product, index) => {
            return (
              <li
                key={`product-${index}`}
                className="relative w-30 h-52 rounded-lg relative shrink-0"
              >
                <Link
                  href={`/product/${product.name}`}
                >
                  <Image
                    src={`/products/${product.name}.jpg`}
                    width={96}
                    height={96}
                    className="w-30 h-30 object-contain zoom"
                    alt={`${product.display}`}
                  />
                  <h4 className="absolute w-30 product-swimlane-item-text">{product.display}</h4>
                  <h4 className={`${inter.className} absolute product-swimlane-item-price`}>{formatCurrency(product.price)}</h4>
                  </Link>
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
