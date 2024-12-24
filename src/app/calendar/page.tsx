"use client";

import { useState } from "react";
import { Calendar } from "@/components/calendar/Calendar";
import { CommunicationModal } from "@/components/communications/CommunicationModal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { format, isSameDay } from "date-fns"; // Add isSameDay to the imports

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { state } = useApp();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Communication Calendar
        </h1>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => setSelectedCompany(state.companies[0]?.id)}>
            Log Communication
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Calendar onDateSelect={handleDateSelect} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          {selectedDate && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-900">
                {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <div className="mt-4 space-y-2">
                {state.communications
                  .filter((comm) =>
                    isSameDay(new Date(comm.date), selectedDate)
                  )
                  .map((comm) => {
                    const company = state.companies.find(
                      (c) => c.id === comm.companyId
                    );
                    const method = state.communicationMethods.find(
                      (m) => m.id === comm.methodId
                    );
                    return (
                      <div
                        key={comm.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">{company?.name}</p>
                          <p className="text-sm text-gray-500">
                            {method?.name}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            comm.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : comm.status === "SCHEDULED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {comm.status.toLowerCase()}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Upcoming Communications */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium text-gray-900">
              Upcoming Communications
            </h2>
            <div className="mt-4 space-y-2">
              {state.communications
                .filter((comm) => new Date(comm.date) > new Date())
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .slice(0, 5)
                .map((comm) => {
                  const company = state.companies.find(
                    (c) => c.id === comm.companyId
                  );
                  return (
                    <div
                      key={comm.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium text-sm">{company?.name}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(comm.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Communication Modal */}
      {selectedCompany && (
        <CommunicationModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          companyIds={[selectedCompany]}
          onSuccess={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
