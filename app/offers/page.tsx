// Page 3: Explore Offers Grid
import { Input } from "@/components/ui/input";


export default async function ExploreOffersPage() {
  return (
    <>
      {/* Title and Search */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore Offers</h1>
        <Input placeholder="Search for offers" className="max-w-md" />
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Agoda Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/agoda-logo.png" alt="Agoda" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Agoda</h3>
          <p className="text-sm text-muted-foreground mb-2">Book hotels get ...</p>
          <p className="text-primary font-bold">$10.00</p>
        </div>

        {/* Runout Champ Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/runout-champ.png" alt="Runout Champ" className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Runout Champ</h3>
          <p className="text-sm text-muted-foreground mb-2">Aim at the stumps...</p>
          <p className="text-primary font-bold">$11.00</p>
        </div>

        {/* Instagram Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/instagram-logo.png" alt="Instagram" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Instagram</h3>
          <p className="text-sm text-muted-foreground mb-2">Little moments lead...</p>
          <p className="text-primary font-bold">$6.50</p>
        </div>

        {/* Paytm Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/paytm-logo.png" alt="Paytm" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Paytm</h3>
          <p className="text-sm text-muted-foreground mb-2">UPI, Money transfer</p>
          <p className="text-primary font-bold">$14.75</p>
        </div>

        {/* Sea Explorer Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/sea-explorer.png" alt="Sea Explorer" className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Sea Explorer</h3>
          <p className="text-sm text-muted-foreground mb-2">Play and dive as...</p>
          <p className="text-primary font-bold">$170.00</p>
        </div>

        {/* Amazon Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/amazon-logo.png" alt="Amazon" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Amazon</h3>
          <p className="text-sm text-muted-foreground mb-2">Make shopping on...</p>
          <p className="text-primary font-bold">$6.00</p>
        </div>

        {/* Alibaba Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/alibaba-logo.png" alt="Alibaba" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Alibaba.com</h3>
          <p className="text-sm text-muted-foreground mb-2">Enjoy great offers...</p>
          <p className="text-primary font-bold">$1.20</p>
        </div>

        {/* Wood Farm Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/wood-farm.png" alt="Wood Farm" className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Wood Farm</h3>
          <p className="text-sm text-muted-foreground mb-2">Save the farm on...</p>
          <p className="text-primary font-bold">$10.50</p>
        </div>

        {/* Bunny Runner Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/bunny-runner.png" alt="Bunny Runner" className="w-12 h-12 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Bunny Runner</h3>
          <p className="text-sm text-muted-foreground mb-2">Run through the...</p>
          <p className="text-primary font-bold">$15.00</p>
        </div>

        {/* Upstox Card */}
        <div className="bg-card rounded-lg p-4 shadow-card hover:shadow-card-md cursor-pointer">
          <img src="/upstox-logo.png" alt="Upstox" className="w-8 h-8 mb-2" />
          <h3 className="font-semibold mb-1">Upstox</h3>
          <p className="text-sm text-muted-foreground mb-2">Join one of India’s...</p>
          <p className="text-primary font-bold">$15.00</p>
        </div>
      </div>
    </>
  );
}