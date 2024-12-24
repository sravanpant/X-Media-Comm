"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/layouts/Card";
import { format } from "date-fns";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, Linkedin, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CommunicationModal } from "@/components/communications/CommunicationModal";
import { useState } from "react";

export default function CompanyDetailPage() {
  const params = useParams();
  const { state } = useApp();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const companyId = params.id as string;

  const company = state.companies.find((c) => c.id === companyId);
  if (!company) notFound();

  const communications = state.communications.filter(
    (c) => c.companyId === company.id
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/companies" },
          { label: company.name },
        ]}
      />
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
        <div className="mt-4 sm:mt-0 space-x-3">
          <Link href={`/companies/${company.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button onClick={() => setIsModalOpen(true)}>
            Log Communication
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Company Information</h2>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {company.location}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Communication Frequency
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Every {company.communicationPeriodicity} days
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Contact Details
                </dt>
                <dd className="mt-1 space-y-2">
                  {company.emails.map((email) => (
                    <div key={email} className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <a
                        href={`mailto:${email}`}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        {email}
                      </a>
                    </div>
                  ))}
                  {company.phoneNumbers.map((phone) => (
                    <div key={phone} className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <a
                        href={`tel:${phone}`}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                  {company.linkedInProfile && (
                    <div className="flex items-center text-sm">
                      <Linkedin className="h-4 w-4 text-gray-400 mr-2" />
                      <a
                        href={company.linkedInProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </dd>
              </div>
              {company.comments && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Comments
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {company.comments}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Communication History */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Communication History</h2>
          </CardHeader>
          <CardContent>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {communications.map((comm, idx) => {
                  const method = state.communicationMethods.find(
                    (m) => m.id === comm.methodId
                  );
                  return (
                    <li key={comm.id}>
                      <div className="relative pb-8">
                        {idx !== communications.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              <MessageCircle className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {method?.name}
                                {comm.notes && (
                                  <span className="font-medium text-gray-900">
                                    : {comm.notes}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={comm.date}>
                                {format(new Date(comm.date), "MMM d, yyyy")}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <CommunicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyIds={[company.id]}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
