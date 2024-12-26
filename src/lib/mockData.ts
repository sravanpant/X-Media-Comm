export type Company = {
  id: string;
  name: string;
  location: string;
  linkedInProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number;
  createdAt: string;
  updatedAt: string;
};

export type CommunicationMethod = {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
  count: number;
};

export type Communication = {
  id: string;
  companyId: string;
  methodId: string;
  date: string;
  notes: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
};

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Tech Corp",
    location: "San Francisco, CA",
    linkedInProfile: "https://linkedin.com/company/techcorp",
    emails: ["contact@techcorp.com", "support@techcorp.com"],
    phoneNumbers: ["+1-555-0123", "+1-555-0124"],
    comments: "Key technology partner",
    communicationPeriodicity: 14,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Global Solutions",
    location: "London, UK",
    linkedInProfile: "https://linkedin.com/company/globalsolutions",
    emails: ["info@globalsolutions.com"],
    phoneNumbers: ["+44-20-7123-4567"],
    comments: "International client",
    communicationPeriodicity: 30,
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
];

export const mockCommunicationMethods: CommunicationMethod[] = [
  {
    id: "1",
    name: "LinkedIn Post",
    description: "Share content on LinkedIn",
    sequence: 1,
    isMandatory: true,
    count: 20,
  },
  {
    id: "2",
    name: "Email",
    description: "Direct email communication",
    sequence: 2,
    isMandatory: true,
    count: 30,
  },
  {
    id: "3",
    name: "Phone Call",
    description: "Direct phone communication",
    sequence: 3,
    isMandatory: false,
    count: 15,
  },
];

export const mockCommunications: Communication[] = [
  {
    id: "1",
    companyId: "1",
    methodId: "1",
    date: "2023-11-01T10:00:00Z",
    notes: "Shared company update",
    status: "COMPLETED",
  },
  {
    id: "2",
    companyId: "1",
    methodId: "2",
    date: "2023-11-15T14:30:00Z",
    notes: "Follow-up email sent",
    status: "COMPLETED",
  },
];

export const mockMethodEffectivenessData = [
  { method: "Email", effectiveness: 75 },
  { method: "Phone", effectiveness: 60 },
  { method: "In-person", effectiveness: 90 },
];

export const mockCommunicationTrendsData = [
  { date: "2023-01-01", messages: 50 },
  { date: "2023-01-02", messages: 75 },
  { date: "2023-01-03", messages: 100 },
];

export const mockCompanyEngagementData = [
  { company: "Company A", engagement: 80 },
  { company: "Company B", engagement: 65 },
  { company: "Company C", engagement: 90 },
];

export const mockCommunicationFrequencyData = [
  { name: "Email", count: 120 },
  { name: "Phone Call", count: 75 },
  { name: "Meeting", count: 50 },
  { name: "Video Conference", count: 30 },
  { name: "Social Media", count: 20 },
];
