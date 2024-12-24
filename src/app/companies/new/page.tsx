import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CompanyForm } from "@/components/companies/CompanyForm";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/companies" },
          { label: "New Company" },
        ]}
      />

      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">New Company</h1>
      </div>

      <CompanyForm />
    </div>
  );
}
