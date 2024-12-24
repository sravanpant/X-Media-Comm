"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/layouts/Card";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// import { format } from "date-fns";
import { CommunicationModal } from "@/components/communications/CommunicationModal";
import { useRouter } from "next/navigation";

export default function CompaniesPage() {
  const { state } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const filteredCompanies = state.companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuickLog = (
    e: React.MouseEvent<HTMLButtonElement>,
    companyId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCompany(companyId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
        <div className="mt-4 sm:mt-0">
          <Link href="/companies/new">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add Company
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Companies List */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredCompanies.map((company) => (
            <li key={company.id}>
              <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                <Link
                  href={`/companies/${company.id}`}
                  className="block flex-grow hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {company.name}
                          </p>
                          <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                            {company.location}
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>
                              Communication every{" "}
                              {company.communicationPeriodicity} days
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {
                            state.communications.filter(
                              (c) => c.companyId === company.id
                            ).length
                          }{" "}
                          communications
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="ml-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => handleQuickLog(e, company.id)}
                  >
                    Quick Log
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedCompany && (
        <CommunicationModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          companyIds={[selectedCompany]}
          onSuccess={() => {
            setSelectedCompany(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
