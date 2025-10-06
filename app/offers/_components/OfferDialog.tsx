"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Offer {
  id: number;
  provider: string;
  description: string;
  reward_amount: number;
  image_url?: string;
  created_at: string;
}

interface OfferDialogProps {
  offer: Offer;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function OfferDialog({ offer, isOpen, onOpenChange }: OfferDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 bg-gray-900 border-gray-700 rounded-xl backdrop-blur-sm max-h-[90vh] overflow-y-auto flex flex-col gap-0">

        <div className="relative flex-1" >
          <div className="w-full min-h-44" style={{
            backgroundImage: `url(${offer.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(5px)',
            opacity: 0.2
          }} />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl border-1 border-gray-400"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4 font-bold" />
          </Button>

          {offer.image_url && (
            <div className="w-24 h-24 rounded-xl overflow-hidden absolute top-1/2 right-1/2  transform translate-x-1/2 -translate-y-1/2 " data-offer-id={offer.id}>
              <Image
                src={offer.image_url}
                alt={`${offer.provider} logo`}
                fill
                sizes="(max-width: 768px:) 100px, 200px"
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 gap-4">
          <div>
            <DialogTitle className="text-2xl font-bold text-white ">{offer.provider}</DialogTitle>
            <div className=" text-gray-300 text-sm leading-relaxed">
              {offer.description}
            </div>
          </div>
          <div className="p-4 flex items-center justify-center gap-6 md:gap-12 ">
            <div className="flex flex-col items-center text-white">
              <span className="text-green-400 font-bold text-2xl">${offer.reward_amount.toFixed(2)}</span>
              <p className="text-xs font-normal">Total Reward</p>
            </div>
            <div className="flex flex-col items-center text-white ">
              <span className="font-bold text-2xl">{offer.id}</span>
              <p className="text-xs text-gray-400">Offer ID</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default OfferDialog;