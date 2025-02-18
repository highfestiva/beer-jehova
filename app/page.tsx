import JvolLogo from '@/app/ui/jvol-logo';
import CarlsbergHeader from '@/app/ui/carlsberg-header';
import BeerPick from '@/app/ui/beer-pick';
import ProductSwimlane from '@/app/ui/product-swimlane';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-20 h-40 shrink-0 rounded-lg bg-yellow-800 p-4 md:h-70">
        { <JvolLogo /> }

        { <CarlsbergHeader /> }

        { <BeerPick /> }
      </div>

      <div className="mt-10">
        { <ProductSwimlane /> }
      </div>
    </main>
  );
}
