"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Offer {
    id: number;
    provider: string;
    description: string;
    reward_amount: number;
    image_url?: string;
    created_at: string;
}

export default function OffersGrid() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchOffers() {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching from Supabase...");
                const { data, error: fetchError } = await supabase
                    .from("offers")
                    .select("*")
                    .order("created_at", { ascending: true });

                console.log("Fetched data:", data);
                if (fetchError) throw fetchError;
                setOffers(data || []);
            } catch (err) {
                console.error("Error fetching offers:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchOffers();
    }, [supabase]);

    if (loading) {
        return <div className="flex justify-center items-center h-64 text-white">Loading offers...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-red-400 bg-gray-900">
                <h3>Error: {error}</h3>
                <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-600 rounded">
                    Retry
                </button>
            </div>
        );
    }

    if (offers.length === 0) {
        return <div className="text-center py-8 text-gray-400">No offers available. Check console for details.</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {offers.map((offer) => (
                <Button key={offer.id} className="bg-gray-800 border-gray-700 text-white hover:shadow-lg transition-shadow h-fit max-w-60 max-h-80 rounded-xl p-3 flex flex-col justify-between gap-2">
                    <div className="w-full flex-1 rounded-xl overflow-hidden ">
                        {offer.image_url && <img src={offer.image_url} alt={`${offer.provider} logo`} className="w-full h-full" />}
                    </div>
                    <div className="w-full flex-1 flex flex-col justify-between gap-1 text-start">
                        <h1 className="text-xl font-bold text-white">{offer.provider}</h1>
                        <span className="text-sm text-gray-300 line-clamp-3 truncate">
                            {offer.description}
                        </span>
                        <span className="flex items-center gap-1 text-white text-lg  font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {offer.reward_amount.toFixed(2)}
                        </span>
                    </div>
                </Button>
            ))}
        </div>
    );
}