// src/components/reports/CompanyEngagementTable.tsx
"use client";

import { useApp } from "@/context/AppContext";
// import { format } from "date-fns";

interface Props {
  dateRange: { from: Date; to: Date };
}

export function CompanyEngagementTable({ dateRange }: Props) {
  const { state } = useApp();

  // Calculate engagement metrics for each company
  const companyMetrics1 = state.companies // eslint-disable-line
    .map((company) => {
      const communications = state.communications.filter(
        (comm) =>
          comm.companyId === company.id &&
          new Date(comm.date) >= dateRange.from &&
          new Date(comm.date) <= dateRange.to
      );

      const totalCommunications = communications.length;
      const completedCommunications = communications.filter(
        (comm) => comm.status === "COMPLETED"
      ).length;

      return {
        company,
        totalCommunications,
        completedCommunications,
        engagementRate:
          totalCommunications > 0
            ? (completedCommunications / totalCommunications) * 100
            : 0,
      };
    })
    .sort((a, b) => b.engagementRate - a.engagementRate);
  
  // currently using manually added mock data
  const companyMetrics = [
    {
      company: { id: 1, name: "Acme Corp" },
      totalCommunications: 120,
      completedCommunications: 100,
      engagementRate: 83.3,
    },
    {
      company: { id: 2, name: "Globex Inc." },
      totalCommunications: 90,
      completedCommunications: 70,
      engagementRate: 77.8,
    },
    {
      company: { id: 3, name: "Soylent Corp" },
      totalCommunications: 60,
      completedCommunications: 45,
      engagementRate: 75.0,
    },
    {
      company: { id: 4, name: "Initech" },
      totalCommunications: 80,
      completedCommunications: 60,
      engagementRate: 75.0,
    },
    {
      company: { id: 5, name: "Umbrella Corp" },
      totalCommunications: 50,
      completedCommunications: 35,
      engagementRate: 70.0,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Communications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engagement Rate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companyMetrics.map(
            ({
              company,
              totalCommunications,
              completedCommunications,
              engagementRate,
            }) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {company.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {totalCommunications}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {completedCommunications}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {engagementRate.toFixed(1)}%
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
