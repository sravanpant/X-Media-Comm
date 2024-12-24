// src/app/dashboard/page.tsx
"use client";

import { CompanyGrid } from "@/components/dashboard/CompanyGrid";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CommunicationModal } from "@/components/communications/CommunicationModal";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/layouts/Card";

export default function DashboardPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Notifications */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          <Button
            disabled={selectedCompanies.length === 0}
            onClick={() => setShowCommunicationModal(true)}
          >
            Log Communication ({selectedCompanies.length})
          </Button>
        </div>
      </div>

      {/* Notification Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-medium text-red-600">
              Overdue Communications
            </h2>
            <div className="mt-2 space-y-2">
              {/* Add overdue communications list */}
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-medium text-yellow-600">Due Today</h2>
            <div className="mt-2 space-y-2">
              {/* Add due today communications list */}
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-medium text-green-600">
              Upcoming Communications
            </h2>
            <div className="mt-2 space-y-2">
              {/* Add upcoming communications list */}
            </div>
          </div>
        </Card>
      </div>

      {/* Main Company Grid */}
      <CompanyGrid
        selectedCompanies={selectedCompanies}
        onCompanySelect={handleCompanySelect}
      />

      {/* Communication Modal */}
      {showCommunicationModal && (
        <CommunicationModal
          isOpen={showCommunicationModal}
          onClose={() => {
            setShowCommunicationModal(false);
            setSelectedCompanies([]);
          }}
          companyIds={selectedCompanies}
          onSuccess={() => {
            setShowCommunicationModal(false);
            setSelectedCompanies([]);
          }}
        />
      )}
    </div>
  );
}
