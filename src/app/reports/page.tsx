// src/app/reports/page.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/layouts/Card";
import { CommunicationFrequencyChart } from "@/components/reports/CommunicationFrequencyChart";
import { CompanyEngagementTable } from "@/components/reports/CompanyEngagementTable";
import { CommunicationTrendsChart } from "@/components/reports/CommunicationTrendsChart";
import { MethodEffectivenessChart } from "@/components/reports/MethodEffectivenessChart";
import { DateRangePicker } from "@/components/reports/DateRangePicker";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

type DateProps = {
  from: Date;
  to: Date;
};

export default function ReportsPage() {
  const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const toDate = new Date();

  const [dateRange, setDateRange] = useState<DateProps>({
    from: fromDate,
    to: toDate,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reports & Analytics
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Communication Frequency Chart */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium">Communication Frequency</h3>
            <div className="mt-4 h-80">
              <CommunicationFrequencyChart dateRange={dateRange} />
            </div>
          </div>
        </Card>

        {/* Method Effectiveness */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium">Method Effectiveness</h3>
            <div className="mt-4 h-80">
              <MethodEffectivenessChart dateRange={dateRange} />
            </div>
          </div>
        </Card>

        {/* Communication Trends */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium">Communication Trends</h3>
            <div className="mt-4 h-80">
              <CommunicationTrendsChart dateRange={dateRange} />
            </div>
          </div>
        </Card>

        {/* Company Engagement */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium">Company Engagement</h3>
            <div className="mt-4">
              <CompanyEngagementTable dateRange={dateRange} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
