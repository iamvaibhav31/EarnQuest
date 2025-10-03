// Page 3: Explore Offers Grid
import { Input } from "@/components/ui/input";
import OffersGrid from "./_components/OffersList";


export default async function ExploreOffersPage() {
  return (
    <>
      {/* Title and Search */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore Offers</h1>
        <Input placeholder="Search for offers" className="max-w-md" />
      </div>


      <OffersGrid />
    </>
  );
}