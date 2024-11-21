import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '../ui/button/Button';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const mockData = {
  monthlyReviews: [
    { month: 'Jan', reviews: 145 },
    { month: 'Feb', reviews: 168 },
    { month: 'Mar', reviews: 156 },
    { month: 'Apr', reviews: 192 },
    { month: 'May', reviews: 178 },
    { month: 'Jun', reviews: 201 },
    { month: 'Jul', reviews: 187 },
    { month: 'Aug', reviews: 195 },
    { month: 'Sep', reviews: 189 },
    { month: 'Oct', reviews: 204 },
    { month: 'Nov', reviews: 198 },
    { month: 'Dec', reviews: 167 }
  ],
  stats: {
    dailyReviews: 12,
    weeklyReviews: 84,
    monthlyReviews: 167,
    averageReviews: 182,
    dailyGoal: 15
  }
};

export const ProfileAnalytics = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mockData.monthlyReviews);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reviews");
    XLSX.writeFile(wb, "reviews_data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reviews Report", 20, 10);
    
    const tableData = mockData.monthlyReviews.map(item => [
      item.month,
      item.reviews.toString()
    ]);

    (doc as any).autoTable({
      head: [["Month", "Reviews"]],
      body: tableData,
      startY: 20
    });

    doc.save("reviews_report.pdf");
  };

  const exportToCSV = () => {
    const csvContent = mockData.monthlyReviews
      .map(row => `${row.month},${row.reviews}`)
      .join("\n");
    
    const blob = new Blob([`Month,Reviews\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reviews_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Subscription Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#E9E9E9]/80">Subscription</h3>
        <div className="p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#E9E9E9]/60">Current Plan</span>
            <span className="text-sm font-medium text-[#96C21A]">Professional</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#E9E9E9]/60">Add-ons</span>
            <span className="text-xs text-[#E9E9E9]/40">API Integration, Advanced Analytics</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#E9E9E9]/80">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
            <div className="text-2xl font-light text-[#96C21A]">{mockData.stats.dailyReviews}</div>
            <div className="text-sm text-[#E9E9E9]/60">Today's Reviews</div>
            <div className="text-xs text-[#E9E9E9]/40 mt-1">
              Goal: {mockData.stats.dailyGoal} reviews/day
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
            <div className="text-2xl font-light text-[#96C21A]">{mockData.stats.weeklyReviews}</div>
            <div className="text-sm text-[#E9E9E9]/60">This Week</div>
          </div>
          <div className="p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
            <div className="text-2xl font-light text-[#96C21A]">{mockData.stats.monthlyReviews}</div>
            <div className="text-sm text-[#E9E9E9]/60">This Month</div>
          </div>
          <div className="p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
            <div className="text-2xl font-light text-[#96C21A]">{mockData.stats.averageReviews}</div>
            <div className="text-sm text-[#E9E9E9]/60">Monthly Average</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#E9E9E9]/80">Monthly Reviews</h3>
        <div className="h-64 p-4 rounded-lg bg-[#0D1D2D]/50 border border-[#96C21A]/10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.monthlyReviews}>
              <XAxis 
                dataKey="month" 
                stroke="#E9E9E9" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#E9E9E9" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0D1D2D',
                  border: '1px solid rgba(150, 194, 26, 0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="reviews" 
                fill="#96C21A" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#E9E9E9]/80">Export Data</h3>
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            className="flex-1 justify-center hover:bg-[#96C21A]/10"
            onClick={exportToExcel}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2 text-[#96C21A]" />
            Excel
          </Button>
          <Button
            variant="ghost"
            className="flex-1 justify-center hover:bg-[#96C21A]/10"
            onClick={exportToPDF}
          >
            <FileText className="w-4 h-4 mr-2 text-[#96C21A]" />
            PDF
          </Button>
          <Button
            variant="ghost"
            className="flex-1 justify-center hover:bg-[#96C21A]/10"
            onClick={exportToCSV}
          >
            <Download className="w-4 h-4 mr-2 text-[#96C21A]" />
            CSV
          </Button>
        </div>
      </div>
    </div>
  );
};