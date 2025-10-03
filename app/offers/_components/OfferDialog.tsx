"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <DialogContent className="max-w-md p-0 bg-gray-900 border-gray-700 rounded-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        {/* Header with Logo */}
        <div className="relative p-4 pt-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-t-2xl">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10">
            {offer.image_url && <img src={offer.image_url} alt={`${offer.provider} logo`} className="w-full h-full" />}
            </div>
            <h2 className="text-xl font-bold text-white text-center">{offer.provider}</h2>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 pb-4 text-gray-300 text-sm leading-relaxed">
          {offer.description}
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 border-t border-gray-700 bg-gray-800/50 rounded-b-2xl">
          <div className="flex justify-between items-center text-sm">
            <div className="text-green-400 font-bold">
              <span className="text-2xl">$</span>{offer.reward_amount.toFixed(2)}
              <p className="text-xs text-green-300 font-normal">Total Reward</p>
            </div>
            <div className="text-gray-400">
              <span className="font-semibold">{offer.id}</span>
              <p className="text-xs">Offer ID</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default OfferDialog;