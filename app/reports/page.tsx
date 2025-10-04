'use client';

import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";

import Table from '@/components/custom/Table';

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
  { accessorKey: "name", header: "Offer Name" },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "ctr", header: "CTR (%)" },
  { accessorKey: "reward", header: "Reward" },
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
      // .range(offset, offset + limit - 1);

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
    <>
      <h1 className="text-2xl font-bold mb-6">Report</h1>

      <div className="bg-card rounded-lg overflow-hidden">


        <Table columns={columns} data={reports}/>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OFFER ID</TableHead>
              <TableHead>OFFER NAME</TableHead>
              <TableHead>IMPRESSIONS</TableHead>
              <TableHead>CLICKS</TableHead>
              <TableHead>CTR (%)</TableHead>
              <TableHead>REWARD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.impressions.toLocaleString()}</TableCell>
                <TableCell>{report.clicks.toLocaleString()}</TableCell>
                <TableCell>{report.ctr.toFixed(2)}</TableCell>
                <TableCell className="text-primary">{report.reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </>
  );
}