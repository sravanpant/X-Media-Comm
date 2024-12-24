// src/components/dashboard/CompanyGrid.tsx
"use client";

import { useApp } from "@/context/AppContext";
import { format, differenceInDays, addDays } from "date-fns";
import { Tooltip } from "@/components/ui/Tooltip";
import { Checkbox } from "@/components/ui/Checkbox";
import { Company, Communication } from "@/lib/mockData";

interface CompanyGridProps {
  selectedCompanies: string[];
  onCompanySelect: (companyId: string) => void;
}

export function CompanyGrid({
  selectedCompanies,
  onCompanySelect,
}: CompanyGridProps) {
  const { state } = useApp();

  const getCompanyStatus = (company: Company) => {
    const lastComm = state.communications
      .filter((c) => c.companyId === company.id)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    if (!lastComm) return "overdue";

    const daysSinceLastComm = differenceInDays(
      new Date(),
      new Date(lastComm.date)
    );

    if (daysSinceLastComm > company.communicationPeriodicity) return "overdue";
    if (daysSinceLastComm === company.communicationPeriodicity) return "due";
    return "normal";
  };

  const getLastFiveCommunications = (companyId: string): Communication[] => {
    return state.communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (company: Company): Date => {
    const lastComm = state.communications
      .filter((c) => c.companyId === company.id)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    if (!lastComm) {
      // If no previous communication, schedule from today
      return addDays(new Date(), company.communicationPeriodicity);
    }

    // Schedule next communication based on the last one
    return addDays(new Date(lastComm.date), company.communicationPeriodicity);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-6 py-3">
              <Checkbox
                checked={
                  selectedCompanies.length === state.companies.length &&
                  state.companies.length > 0
                }
                indeterminate={
                  selectedCompanies.length > 0 &&
                  selectedCompanies.length < state.companies.length
                }
                onChange={() => {
                  if (selectedCompanies.length === state.companies.length) {
                    // Deselect all
                    state.companies.forEach((company) =>
                      onCompanySelect(company.id)
                    );
                  } else {
                    // Select all
                    state.companies.forEach((company) => {
                      if (!selectedCompanies.includes(company.id)) {
                        onCompanySelect(company.id);
                      }
                    });
                  }
                }}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Five Communications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Scheduled
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {state.companies.map((company) => {
            const status = getCompanyStatus(company);
            const lastFive = getLastFiveCommunications(company.id);
            const nextScheduled = getNextScheduledCommunication(company);

            return (
              <tr
                key={company.id}
                className={`
                  ${status === "overdue" ? "bg-red-50" : ""}
                  ${status === "due" ? "bg-yellow-50" : ""}
                  hover:bg-gray-50
                `}
              >
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onChange={() => onCompanySelect(company.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {company.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {company.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {lastFive.map((comm) => {
                      const method = state.communicationMethods.find(
                        (m) => m.id === comm.methodId
                      );
                      return (
                        <Tooltip
                          key={comm.id}
                          content={
                            <div className="space-y-1">
                              <p className="font-medium">{method?.name}</p>
                              <p>{comm.notes}</p>
                              <p className="text-xs text-gray-400">
                                {format(new Date(comm.date), "PPP")}
                              </p>
                            </div>
                          }
                        >
                          <span
                            className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${
                                method?.name === "LinkedIn Post"
                                  ? "bg-blue-100 text-blue-800"
                                  : method?.name === "Email"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            `}
                          >
                            {format(new Date(comm.date), "MMM d")}
                          </span>
                        </Tooltip>
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(nextScheduled, "MMM d, yyyy")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        status === "overdue"
                          ? "bg-red-100 text-red-800"
                          : status === "due"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    `}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
