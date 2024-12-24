"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
// import { Communication, CommunicationMethod } from "@/lib/mockData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  companyIds: string[];
  onSuccess?: () => void;
};
type FormData = {
  methodId: string;
  date: string;
  notes: string;
  status: "COMPLETED" | "SCHEDULED" | "CANCELLED";
};

export function CommunicationModal({
  isOpen,
  onClose,
  companyIds,
  onSuccess,
}: Props) {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState<FormData>({
    methodId: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    status: "COMPLETED" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCommunications = companyIds.map((companyId) => ({
      id: crypto.randomUUID(),
      companyId,
      methodId: formData.methodId,
      date: formData.date,
      notes: formData.notes,
      status: formData.status,
    }));

    newCommunications.forEach((comm) => {
      dispatch({
        type: "ADD_COMMUNICATION",
        payload: comm,
      });
    });

    onSuccess?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Communication">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Communication Method */}
        <div>
          <label
            htmlFor="method"
            className="block text-sm font-medium text-gray-700"
          >
            Communication Method
          </label>
          <select
            id="method"
            required
            value={formData.methodId}
            onChange={(e) =>
              setFormData({ ...formData, methodId: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a method</option>
            {state.communicationMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            required
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as
                  | "COMPLETED"
                  | "SCHEDULED"
                  | "CANCELLED",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="COMPLETED">Completed</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button type="submit" className="sm:ml-3">
            Log Communication
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
