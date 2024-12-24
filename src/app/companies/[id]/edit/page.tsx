// src/app/companies/[id]/edit/page.tsx
"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CompanyForm } from "@/components/companies/CompanyForm";
import { useApp } from "@/context/AppContext";
import { notFound, useRouter, useParams } from "next/navigation";
import { Card } from "@/components/layouts/Card";

export default function EditCompanyPage() {
  const params = useParams(); // Use useParams to get route parameters
  const { state } = useApp();
  const router = useRouter();
  const companyId = params.id as string; // Ensure id is a string
  const company = state.companies.find((c) => c.id === companyId);

  if (!company) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/companies" },
          { label: company.name, href: `/companies/${company.id}` },
          { label: "Edit" },
        ]}
      />

      <div className="mt-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Edit {company.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <div className="px-4 py-5 sm:p-6">
            <CompanyForm
              initialData={company}
              isEditing
              onSuccess={() => {
                router.push(`/companies/${company.id}`);
              }}
              onCancel={() => {
                router.back();
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
