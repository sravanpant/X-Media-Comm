"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CompanyForm } from "@/components/companies/CompanyForm";
import { useApp } from "@/context/AppContext";
import { notFound } from "next/navigation";

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const { state } = useApp();
  const company = state.companies.find((c) => c.id === params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/companies" },
          { label: company.name, href: `/companies/${company.id}` },
          { label: "Edit" },
        ]}
      />

      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit {company.name}
        </h1>
      </div>

      <CompanyForm initialData={company} isEditing />
    </div>
  );
}
