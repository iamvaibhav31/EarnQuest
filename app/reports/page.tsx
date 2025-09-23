// Page 8: Report Table
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reports = [
  { id: 1, name: "Agoda", impressions: 12540, clicks: 428, ctr: 3.41, reward: "$10.00" },
  { id: 2, name: "Instagram", impressions: 15820, clicks: 695, ctr: 4.39, reward: "$6.50" },
  { id: 3, name: "Sea Explorer", impressions: 9320, clicks: 274, ctr: 2.94, reward: "$170" },
  { id: 4, name: "Alibaba.com", impressions: 18670, clicks: 712, ctr: 3.81, reward: "$1.20" },
  { id: 5, name: "Bunny Runner", impressions: 7840, clicks: 593, ctr: 7.56, reward: "$15.00" },
];

export default function ReportPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Report</h1>

      <div className="bg-card rounded-lg overflow-hidden">
        <Table>
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
                <TableCell>{report.impressions}</TableCell>
                <TableCell>{report.clicks}</TableCell>
                <TableCell>{report.ctr}</TableCell>
                <TableCell className="text-primary">{report.reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-2 text-sm text-muted-foreground flex justify-between">
          <span>Rows per page 5</span>
          <span>1-5 of 20</span>
        </div>
      </div>
    </>
  );
}