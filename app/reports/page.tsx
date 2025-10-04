'use client';

import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import Table from '@/components/custom/Table';
import Image from 'next/image';

type Report = {
  id: number;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  reward: string;
};


const columns = [
  { accessorKey: "id", header: "Offer ID" },
  {
    accessorKey: "name", header: "Offer Name", cell: ({ row }) =>
      <div className='flex items-center gap-1 '>
        {row.original.image_url && (
          <div className="flex-1 min-h-10 max-w-10 rounded-full overflow-hidden relative" data-offer-id={row.original.id}>
            <Image
              src={row.original.image_url}
              alt={`${row.original.provider} logo`}
              fill
              sizes="(max-width: 768px:) 100px, 200px"
              className="object-cover object-center"
            />
          </div>
        )}
        <div className='flex-1'>
          <h1 className="text-xl text-white">{row.original.provider}</h1>
        </div>
      </div>,
  },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "ctr", header: "CTR (%)" },
  { accessorKey: "reward", header: "Reward" , cell: ({ row }) => <span className='text-green-500'>{row.original.reward}</span>}, 
]



export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();


  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('offer_report')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching reports:', error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();

    // Subscribe to real-time inserts on public_offer_events
    const subscription = supabase
      .channel('offer_events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'offer_events',
        },
        async (payload) => {
          console.log('New event added:', payload);
          // Refetch the report to update aggregates
          await fetchReports();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-2 flex-1 px-10 pt-10'>
      <h1 className="text-2xl font-bold ">Report</h1>
      <Table columns={columns} data={reports} classes={{ toolbar: "flex-row-reverse justify-between item-center" }} NoDataInfo={{ label: "No such Offer found" }} />
    </div>
  
  );
}