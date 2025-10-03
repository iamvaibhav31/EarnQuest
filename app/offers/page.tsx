// Page 3: Explore Offers Grid
import { Input } from "@/components/ui/input";
import OffersGrid from "./_components/OffersList";


export default async function ExploreOffersPage() {
  return (
    <main id="offers" className="flex-1 w-full flex flex-col items-center justify-center gap-4 select-none p-4">
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Explore Offers</h1>
        <Input placeholder="Search for offers" className="max-w-md rounded-lg" />
      </div>
      <OffersGrid />
    </main>
  );
}