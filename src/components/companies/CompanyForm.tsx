"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/layouts/Card";
import { Plus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Company } from "@/lib/mockData";

type CompanyFormData = Omit<Company, "id" | "createdAt" | "updatedAt">;

type Props = {
  initialData?: Company;
  isEditing?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function CompanyForm({ initialData, isEditing }: Props) {
  const router = useRouter();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState<CompanyFormData>({
    name: initialData?.name || "",
    location: initialData?.location || "",
    linkedInProfile: initialData?.linkedInProfile || "",
    emails: initialData?.emails || [""],
    phoneNumbers: initialData?.phoneNumbers || [""],
    comments: initialData?.comments || "",
    communicationPeriodicity: initialData?.communicationPeriodicity || 14,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && initialData) {
      dispatch({
        type: "UPDATE_COMPANY",
        payload: {
          ...initialData,
          ...formData,
        },
      });
    } else {
      dispatch({
        type: "ADD_COMPANY",
        payload: {
          id: crypto.randomUUID(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }

    router.push("/companies");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Company Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="sm:col-span-2">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin"
                value={formData.linkedInProfile}
                onChange={(e) =>
                  setFormData({ ...formData, linkedInProfile: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Emails */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Addresses
              </label>
              {formData.emails.map((email, index) => (
                <div key={index} className="mt-1 flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...formData.emails];
                      newEmails[index] = e.target.value;
                      setFormData({ ...formData, emails: newEmails });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="ml-2"
                    onClick={() => {
                      const newEmails = formData.emails.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, emails: newEmails });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() =>
                  setFormData({ ...formData, emails: [...formData.emails, ""] })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Email
              </Button>
            </div>

            {/* Phone Numbers */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Numbers
              </label>
              {formData.phoneNumbers.map((phone, index) => (
                <div key={index} className="mt-1 flex">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const newPhones = [...formData.phoneNumbers];
                      newPhones[index] = e.target.value;
                      setFormData({ ...formData, phoneNumbers: newPhones });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="ml-2"
                    onClick={() => {
                      const newPhones = formData.phoneNumbers.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, phoneNumbers: newPhones });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() =>
                  setFormData({
                    ...formData,
                    phoneNumbers: [...formData.phoneNumbers, ""],
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Phone Number
              </Button>
            </div>

            {/* Communication Periodicity */}
            <div className="sm:col-span-2">
              <label
                htmlFor="periodicity"
                className="block text-sm font-medium text-gray-700"
              >
                Communication Periodicity (days)
              </label>
              <input
                type="number"
                id="periodicity"
                min="1"
                value={formData.communicationPeriodicity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    communicationPeriodicity: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Comments */}
            <div className="sm:col-span-2">
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700"
              >
                Comments
              </label>
              <textarea
                id="comments"
                rows={4}
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update" : "Create"} Company</Button>
      </div>
    </form>
  );
}
