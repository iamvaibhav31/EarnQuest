"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferDialog from "./OfferDialog";

interface Offer {
    id: number;
    provider: string;
    description: string;
    reward_amount: number;
    image_url?: string;
    created_at: string;
}

interface EventPayload {
    user_id: string;
    offer_id: number;
    event_type: 'impression' | 'click';
}

export default function OffersGrid() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const eventQueue = useRef<EventPayload[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const supabase = createClient();


    const queueEvent = useCallback((event: EventPayload) => {
        if (!userId) return;

        eventQueue.current.push(event);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (eventQueue.current.length === 0) return;

            const events = [...eventQueue.current];
            eventQueue.current = [];

            const uniqueEvents = events.filter((ev, index, self) =>
                index === self.findIndex((e) => e.offer_id === ev.offer_id && e.event_type === ev.event_type)
            );

            const { error } = await supabase.from('offer_events').insert(uniqueEvents);
            if (error) {
                console.error('Batch insert failed:', JSON.stringify(error, null, 2)); // Enhanced log
                console.error('Events attempted:', JSON.stringify(uniqueEvents, null, 2)); // Payload log
            }
        }, 500);
    }, [userId, supabase]);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUserId(user?.id || null);
        });
    }, [supabase]);

    useEffect(() => {
        if (!userId) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const offerId = Number(entry.target.getAttribute('data-offer-id'));
                        if (!isNaN(offerId)) {
                            queueEvent({ user_id: userId, offer_id: offerId, event_type: 'impression' });
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observerRef.current = observer;

        const images = document.querySelectorAll('[data-offer-id]');
        images.forEach((img) => observer.observe(img));

        return () => observer.disconnect();
    }, [userId, offers, queueEvent]);



    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (observerRef.current) observerRef.current.disconnect();
            // Flush remaining queue on unmount
            if (eventQueue.current.length > 0 && userId) {
                queueEvent(eventQueue.current[0]); // Trigger immediate flush
            }
        };
    }, [queueEvent, userId]);

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

    const handleDialogClose = () => {
        setSelectedOffer(null);
    };

    const handleCardClick = (offer: Offer) => {
        if (userId) {
            queueEvent({ user_id: userId, offer_id: offer.id, event_type: 'click' });
        }
        setSelectedOffer(offer);
    };

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
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {offers.map((offer) => (
                    <Button
                        key={offer.id}
                        onClick={() => handleCardClick(offer)}
                        className="bg-gray-800 border-gray-700 text-white hover:shadow-lg transition-shadow h-fit max-w-60 max-h-80 rounded-xl p-3 flex flex-col justify-between gap-2"
                    >
                        <div className="w-full flex-1 min-h-44 rounded-xl overflow-hidden relative" data-offer-id={offer.id}>                            
                            {offer.image_url && (
                            <Image
                                src={offer.image_url}
                                alt={`${offer.provider} logo`}
                                fill
                                sizes="(max-width: 768px:) 100px, 200px"
                                className="object-cover object-center"
                            />
                        )}
                        </div>
                        <div className="w-full flex-1 flex flex-col justify-between gap-1 text-start">
                            <h1 className="text-xl font-bold text-white">{offer.provider}</h1>
                            <span className="text-sm text-gray-300 line-clamp-3 truncate">
                                {offer.description}
                            </span>
                            <span className="flex items-center gap-1 text-white text-lg font-semibold">
                                <DollarSign className="w-4 h-4" />
                                {offer.reward_amount.toFixed(2)}
                            </span>
                        </div>
                    </Button>
                ))}
            </div>
            {selectedOffer && (
                <OfferDialog
                    offer={selectedOffer}
                    isOpen={!!selectedOffer}
                    onOpenChange={handleDialogClose}
                />
            )}
        </>
    );
}