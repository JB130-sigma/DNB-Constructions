// ── Seed Data: Projects ──────────────────────────────────────────────────────
export type ProjectStatus = "ongoing" | "completed" | "delayed" | "on-hold";
export type ProjectType = "residential" | "commercial" | "industrial" | "infrastructure" | "government";

export interface Project {
  id: string;
  name: string;
  client: string;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  description: string;
  labourCount: number;
  icon: string;
}

export const PROJECTS: Project[] = [
  { id: "P001", name: "NH-48 Six-Lane Expressway", client: "NHAI", type: "infrastructure", status: "ongoing", location: "Surat–Vadodara Corridor", budget: 21500, spent: 14400, progress: 67, startDate: "2024-01-15", endDate: "2026-03-31", manager: "Vikram Shah", description: "Construction of 67km six-lane expressway with flyovers and underpasses.", labourCount: 480, icon: "🛣️" },
  { id: "P002", name: "Sapphire Corporate Tower P2", client: "Skyline Developers", type: "commercial", status: "ongoing", location: "Alkapuri, Vadodara", budget: 4800, spent: 2160, progress: 45, startDate: "2024-06-01", endDate: "2026-12-31", manager: "Priya Nair", description: "G+28 luxury commercial tower with premium office spaces.", labourCount: 220, icon: "🏢" },
  { id: "P003", name: "Baroda Ring Road Section C", client: "GSHEB", type: "government", status: "delayed", location: "Vadodara Bypass", budget: 9200, spent: 2040, progress: 22, startDate: "2024-09-01", endDate: "2027-06-30", manager: "Deepak Joshi", description: "4-lane ring road bypass including 3 major intersections.", labourCount: 310, icon: "🔄" },
  { id: "P004", name: "Housing Block A – Phase 1", client: "VUDA", type: "government", status: "ongoing", location: "Gotri, Vadodara", budget: 2200, spent: 1935, progress: 88, startDate: "2023-12-01", endDate: "2025-08-31", manager: "Rohit Desai", description: "Affordable housing project with 240 units across 4 blocks.", labourCount: 165, icon: "🏠" },
  { id: "P005", name: "Industrial Shed – Zone 4 GIDC", client: "Patel Industries", type: "industrial", status: "ongoing", location: "GIDC, Halol", budget: 800, spent: 440, progress: 55, startDate: "2025-01-15", endDate: "2025-11-30", manager: "Anand Mehta", description: "Pre-engineered industrial shed with 12,000 sq. ft. floor area.", labourCount: 72, icon: "🏭" },
  { id: "P006", name: "Narmada Water Treatment Plant", client: "GWSSB", type: "infrastructure", status: "completed", location: "Bharuch, Gujarat", budget: 3200, spent: 3150, progress: 100, startDate: "2022-04-01", endDate: "2023-12-15", manager: "Vikram Shah", description: "50 MLD water treatment plant serving 3 talukas.", labourCount: 0, icon: "💧" },
  { id: "P007", name: "Sunshine Residency", client: "Sunshine Builders", type: "residential", status: "completed", location: "Waghodia, Vadodara", budget: 1800, spent: 1760, progress: 100, startDate: "2023-01-01", endDate: "2024-10-30", manager: "Priya Nair", description: "128-unit residential complex with clubhouse and amenities.", labourCount: 0, icon: "🌟" },
];

// ── Seed Data: Expenses ──────────────────────────────────────────────────────
export type ExpenseCategory = "Cement" | "Steel" | "Sand" | "Aggregate" | "Bricks" | "Tiles" | "Paint" | "Labour" | "Machinery" | "Fuel" | "Transportation" | "Electrical" | "Plumbing" | "Miscellaneous";
export type ExpenseStatus = "approved" | "pending" | "rejected";
export interface Expense {
  id: string;
  project: string;
  category: ExpenseCategory;
  name: string;
  date: string;
  amount: number;
  gst: number;
  vendor: string;
  status: ExpenseStatus;
  notes?: string;
}

export const EXPENSES: Expense[] = [
  { id: "E001", project: "NH-48 Six-Lane Expressway",        category: "Steel",         name: "TMT Steel Fe500 – 20MT",         date: "2025-06-18", amount: 1240000, gst: 18, vendor: "Shree Steel Industries",   status: "approved", notes: "For NH48 km 14-18 section" },
  { id: "E002", project: "NH-48 Six-Lane Expressway",        category: "Fuel",          name: "HSD Diesel – 500L JCB",          date: "2025-06-17", amount: 48500,   gst: 0,  vendor: "HP Petroleum",             status: "approved", notes: "" },
  { id: "E003", project: "NH-48 Six-Lane Expressway",        category: "Labour",        name: "Labour Wages – May 2025",        date: "2025-06-16", amount: 6840000, gst: 0,  vendor: "—",                        status: "approved", notes: "480 workers" },
  { id: "E004", project: "Housing Block A – Phase 1",        category: "Cement",        name: "OPC 53 Cement – 800 Bags",       date: "2025-06-15", amount: 308000,  gst: 28, vendor: "Ultratech Cement Dealer",  status: "approved", notes: "Block A foundation pour" },
  { id: "E005", project: "Sapphire Corporate Tower P2",      category: "Machinery",     name: "Tower Crane Monthly Hire",       date: "2025-06-14", amount: 285000,  gst: 18, vendor: "Crane Masters Pvt Ltd",    status: "pending",  notes: "" },
  { id: "E006", project: "Industrial Shed – Zone 4 GIDC",    category: "Electrical",    name: "Electrical Fittings & Wiring",   date: "2025-06-13", amount: 124000,  gst: 18, vendor: "Bright Electricals",       status: "pending",  notes: "Phase 2 electrical" },
  { id: "E007", project: "Baroda Ring Road Section C",       category: "Aggregate",     name: "Coarse Aggregate – 60 Brass",    date: "2025-06-12", amount: 510000,  gst: 5,  vendor: "Gujarat Quarries Ltd",     status: "rejected", notes: "Quality issue – vendor replaced" },
  { id: "E008", project: "NH-48 Six-Lane Expressway",        category: "Transportation",name: "Material Transport – 12 Trips",  date: "2025-06-11", amount: 96000,   gst: 5,  vendor: "Speed Logistics",          status: "approved", notes: "" },
];

export type MaterialCategory = "Cement" | "Steel" | "Sand" | "Aggregate" | "Bricks" | "Tiles" | "Paint" | "Electrical" | "Plumbing" | "Miscellaneous";

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  purchased: number;
  used: number;
  wasted: number;
  remaining: number;
  purchaseRate: number;
  minStock: number;
  supplier?: string;
  lastPurchase?: string;
  site: string;
}

export const MATERIALS: Material[] = [
  { id: "M001", name: "Cement OPC 53",       category: "Binding",    unit: "Bags (50kg)", purchased: 8000,  used: 5200, wasted: 400,  remaining: 2400,  purchaseRate: 385,    minStock: 500,  supplier: "Ultratech Cement", lastPurchase: "2025-06-10", site: "NH-48" },
  { id: "M002", name: "TMT Steel Fe500",     category: "Structural", unit: "MT",          purchased: 120,   used: 78,   wasted: 4,    remaining: 38,    purchaseRate: 62000,  minStock: 50,   supplier: "Shree Steel",      lastPurchase: "2025-06-18", site: "Sapphire P2" },
  { id: "M003", name: "Coarse Aggregate",    category: "Aggregate",  unit: "Brass",       purchased: 280,   used: 145,  wasted: 15,   remaining: 120,   purchaseRate: 8500,   minStock: 30,   supplier: "Gujarat Quarries", lastPurchase: "2025-06-05", site: "Housing A" },
  { id: "M004", name: "River Sand (M-Sand)", category: "Aggregate",  unit: "Brass",       purchased: 180,   used: 88,   wasted: 7,    remaining: 85,    purchaseRate: 5200,   minStock: 40,   supplier: "Sand Traders",     lastPurchase: "2025-06-01", site: "Multiple" },
  { id: "M005", name: "Bricks Class-A",      category: "Masonry",   unit: "Nos (1000)",  purchased: 2800,  used: 1540, wasted: 60,   remaining: 1200,  purchaseRate: 7800,   minStock: 200,  supplier: "Brick Depot",      lastPurchase: "2025-05-25", site: "Housing A" },
  { id: "M006", name: "Plywood 18mm",        category: "Formwork",  unit: "Sheets",      purchased: 200,   used: 145,  wasted: 13,   remaining: 42,    purchaseRate: 1800,   minStock: 100,  supplier: "Formwork Solutions",lastPurchase: "2025-06-02", site: "Sapphire P2" },
  { id: "M007", name: "Waterproofing Comp.", category: "Chemical",  unit: "Ltrs",        purchased: 400,   used: 215,  wasted: 5,    remaining: 180,   purchaseRate: 320,    minStock: 50,   supplier: "Pidilite Dealer",  lastPurchase: "2025-05-20", site: "Industrial" },
  { id: "M008", name: "Binding Wire",        category: "Structural", unit: "Kg",          purchased: 800,   used: 624,  wasted: 28,   remaining: 148,   purchaseRate: 65,     minStock: 200,  supplier: "Wire Depot",       lastPurchase: "2025-06-08", site: "Multiple" },
];

// ── Seed Data: Labour ────────────────────────────────────────────────────────
export type TradeType = "Mason" | "Carpenter" | "Electrician" | "Plumber" | "Painter" | "Welder" | "Helper" | "Supervisor";

export interface LabourWorker {
  id: string;
  name: string;
  aadhaar: string;
  mobile: string;
  trade: TradeType;
  dailyWage: number;
  site: string;
  joinDate: string;
  status: "present" | "absent" | "half-day" | "overtime";
  monthDays: number;
  overtime: number;
  advance: number;
  attendance?: number[];
}

export const LABOUR: LabourWorker[] = [
  { id: "L001", name: "Ramesh Mishra",    aadhaar: "XXXX-XXXX-1234", mobile: "9876543001", trade: "Mason",       dailyWage: 700, site: "NH-48",      joinDate: "2024-01-20", status: "present",  monthDays: 26, overtime: 8,  advance: 2000 },
  { id: "L002", name: "Suresh Kumar",     aadhaar: "XXXX-XXXX-2345", mobile: "9876543002", trade: "Electrician", dailyWage: 900, site: "Sapphire P2", joinDate: "2024-06-10", status: "present",  monthDays: 24, overtime: 4,  advance: 0 },
  { id: "L003", name: "Vikash Yadav",     aadhaar: "XXXX-XXXX-3456", mobile: "9876543003", trade: "Plumber",     dailyWage: 850, site: "Housing A",   joinDate: "2023-12-05", status: "absent",   monthDays: 20, overtime: 0,  advance: 5000 },
  { id: "L004", name: "Anil Singh",       aadhaar: "XXXX-XXXX-4567", mobile: "9876543004", trade: "Carpenter",   dailyWage: 700, site: "NH-48",       joinDate: "2024-01-20", status: "present",  monthDays: 25, overtime: 0,  advance: 0 },
  { id: "L005", name: "Mohd. Aslam",     aadhaar: "XXXX-XXXX-5678", mobile: "9876543005", trade: "Welder",      dailyWage: 900, site: "Industrial",  joinDate: "2025-01-15", status: "half-day", monthDays: 22, overtime: 12, advance: 3000 },
  { id: "L006", name: "Harish Patel",     aadhaar: "XXXX-XXXX-6789", mobile: "9876543006", trade: "Supervisor",  dailyWage: 1200,site: "Sapphire P2", joinDate: "2024-06-01", status: "present",  monthDays: 26, overtime: 0,  advance: 0 },
  { id: "L007", name: "Raju Thakur",      aadhaar: "XXXX-XXXX-7890", mobile: "9876543007", trade: "Helper",      dailyWage: 500, site: "NH-48",       joinDate: "2024-02-01", status: "present",  monthDays: 25, overtime: 0,  advance: 0 },
  { id: "L008", name: "Dinesh Singh",     aadhaar: "XXXX-XXXX-8901", mobile: "9876543008", trade: "Mason",       dailyWage: 700, site: "Housing A",   joinDate: "2023-12-10", status: "present",  monthDays: 26, overtime: 6,  advance: 1000 },
  { id: "L009", name: "Bharat Rathod",    aadhaar: "XXXX-XXXX-9012", mobile: "9876543009", trade: "Helper",      dailyWage: 500, site: "NH-48",       joinDate: "2024-01-25", status: "overtime", monthDays: 24, overtime: 16, advance: 0 },
  { id: "L010", name: "Narayan Das",      aadhaar: "XXXX-XXXX-0123", mobile: "9876543010", trade: "Mason",       dailyWage: 700, site: "Ring Road",   joinDate: "2024-09-10", status: "absent",   monthDays: 18, overtime: 0,  advance: 4000 },
];

// ── Seed Data: Machinery ─────────────────────────────────────────────────────
export type EquipmentCategory = "Excavator" | "Crane" | "Truck" | "Concrete Mixer" | "Roller" | "Loader" | "Generator" | "Other";

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  model: string;
  regNo?: string;
  site: string;
  operator?: string;
  fuelL?: number;
  cost: number;
  rentalCost?: number;
  fuelCost: number;
  maintenanceCost: number;
  lastService?: string;
  purchaseDate?: string;
  status: "active" | "maintenance" | "idle" | "repair";
}

export const MACHINERY: Equipment[] = [
  { id: "EQ01", name: "Excavator",           category: "Excavator",      model: "JCB JS220",     regNo: "GJ06AB1234", site: "NH-48 km 14",  operator: "Bharat Rathod",   fuelL: 280, cost: 2500000, rentalCost: 85000,  fuelCost: 42000, maintenanceCost: 5000,  lastService: "2025-05-12", status: "active" },
  { id: "EQ02", name: "Concrete Mixer 6m³",  category: "Concrete Mixer", model: "Ajax Fiori RM",  regNo: "GJ06CD5678", site: "Sapphire P2",  operator: "Narayan Das",     fuelL: 150, cost: 1800000, rentalCost: 45000,  fuelCost: 22500, maintenanceCost: 2500,  lastService: "2025-06-02", status: "active" },
  { id: "EQ03", name: "Tower Crane 60T",     category: "Crane",          model: "Liebherr 130EC", regNo: "—",          site: "Sapphire P2",  operator: "Suresh Maurya",   fuelL: 0,   cost: 8500000, rentalCost: 285000, fuelCost: 0,     maintenanceCost: 15000, lastService: "2025-04-15", status: "maintenance" },
  { id: "EQ04", name: "Tipper Truck 16W",    category: "Truck",          model: "Ashok Leyland",  regNo: "GJ06EF9012", site: "NH-48 km 42",  operator: "Raju Thakur",     fuelL: 480, cost: 3500000, rentalCost: 35000,  fuelCost: 72000, maintenanceCost: 3000,  lastService: "2025-05-28", status: "active" },
  { id: "EQ05", name: "Road Roller 10T",     category: "Roller",         model: "DYNAPAC CA250",  regNo: "GJ06GH3456", site: "Ring Road",    operator: "Hari Prasad",     fuelL: 90,  cost: 2200000, rentalCost: 40000,  fuelCost: 13500, maintenanceCost: 2000,  lastService: "2025-06-05", status: "idle" },
  { id: "EQ06", name: "Batching Plant 30m³", category: "Other",          model: "Rex Conmix",     regNo: "—",          site: "NH-48 Camp",   operator: "Dinesh Singh",    fuelL: 0,   cost: 5000000, rentalCost: 120000, fuelCost: 0,     maintenanceCost: 25000, lastService: "2025-03-10", status: "repair" },
];

// ── Seed Data: Finance ───────────────────────────────────────────────────────
export interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  date: string;
  due: string;
  status: "paid" | "pending" | "overdue" | "sent";
}

export const INVOICES: Invoice[] = [
  { id: "INV-2025-0128", client: "NHAI",             project: "NH-48",       amount: 32000000, date: "2025-06-01", due: "2025-07-01", status: "paid" },
  { id: "INV-2025-0131", client: "Skyline Dev",      project: "Sapphire P2", amount: 8500000,  date: "2025-06-10", due: "2025-07-10", status: "pending" },
  { id: "INV-2025-0129", client: "VUDA",             project: "Housing A",   amount: 4200000,  date: "2025-05-15", due: "2025-06-15", status: "overdue" },
  { id: "INV-2025-0130", client: "GSHEB",            project: "Ring Road",   amount: 11000000, date: "2025-06-20", due: "2025-07-20", status: "sent" },
  { id: "INV-2025-0132", client: "Patel Industries", project: "Industrial",  amount: 2400000,  date: "2025-06-22", due: "2025-07-22", status: "sent" },
];

// ── Seed Data: Vendors ───────────────────────────────────────────────────────
export type VendorCategory = "Material Supplier" | "Subcontractor" | "Equipment Rental" | "Logistics" | "Consultant";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  gstin: string;
  contactPerson: string;
  phone: string;
  email?: string;
  totalBusiness: number;
  creditLimit?: number;
  outstanding: number;
  rating: number;
  status?: "active" | "on-notice" | "blacklisted";
}

export const VENDORS: Vendor[] = [
  { id: "V001", name: "Shree Steel Industries",  category: "Material Supplier", gstin: "24AABCS1234M1Z5", contactPerson: "Ramesh Bhai", phone: "9876500001", totalBusiness: 12500000, outstanding: 840000, rating: 5 },
  { id: "V002", name: "Ultratech Cement Dealer", category: "Material Supplier", gstin: "24AABCU5678M1Z5", contactPerson: "Suresh Patel", phone: "9876500002", totalBusiness: 8500000,  outstanding: 210000, rating: 4 },
  { id: "V003", name: "HP Petroleum Outlet",     category: "Material Supplier", gstin: "24AABHP9012M1Z5", contactPerson: "Vikram Das",   phone: "9876500003", totalBusiness: 4200000,  outstanding: 0,      rating: 5 },
  { id: "V004", name: "Formwork Solutions Co.",  category: "Equipment Rental",  gstin: "24AABFF3456M1Z5", contactPerson: "Anil Sharma",  phone: "9876500004", totalBusiness: 3500000,  outstanding: 280000, rating: 4 },
  { id: "V005", name: "Gujarat Quarries Ltd",    category: "Material Supplier", gstin: "24AABGQ7890M1Z5", contactPerson: "Hari Prasad",  phone: "9876500005", totalBusiness: 6200000,  outstanding: 510000, rating: 4 },
  { id: "V006", name: "Crane Masters Pvt Ltd",   category: "Equipment Rental",  gstin: "24AABCM2345M1Z5", contactPerson: "Mukesh Shah",  phone: "9876500006", totalBusiness: 8900000,  outstanding: 285000, rating: 5 },
];

// ── Seed Data: Clients ───────────────────────────────────────────────────────
export type ClientCategory = "Government" | "Corporate" | "Private" | "Industrial";
export type ClientStatus = "active" | "inactive" | "blacklisted";

export interface Client {
  id: string;
  name: string;
  company: string;
  category: ClientCategory;
  phone: string;
  email: string;
  projectsCount: number;
  totalBilled: number;
  outstanding: number;
  status: ClientStatus;
  rating?: number;
}

export const CLIENTS: Client[] = [
  { id: "C001", name: "Suresh Rao",     company: "NHAI",             category: "Government", phone: "9876510001", email: "nhai@gov.in",                projectsCount: 2, totalBilled: 21500000, outstanding: 0,       status: "active" },
  { id: "C002", name: "Rajesh Kumar",   company: "Skyline Developers",category: "Corporate",  phone: "9876510002", email: "rajesh@skyline.in",          projectsCount: 3, totalBilled: 6200000,  outstanding: 850000,  status: "active" },
  { id: "C003", name: "Sushma Mehta",   company: "GSHEB",            category: "Government", phone: "9876510003", email: "se.gsheb@gujarat.gov.in",    projectsCount: 1, totalBilled: 9200000,  outstanding: 1100000, status: "active" },
  { id: "C004", name: "AO Patel",       company: "VUDA",             category: "Government", phone: "9876510004", email: "vuda@vadodara.gov.in",       projectsCount: 1, totalBilled: 2200000,  outstanding: 420000,  status: "active" },
  { id: "C005", name: "Arjun Patel",    company: "Patel Industries", category: "Industrial", phone: "9876510005", email: "arjun@patelind.com",         projectsCount: 2, totalBilled: 800000,   outstanding: 0,       status: "active" },
];

// ── Seed Data: Users ─────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  role: "Admin" | "Site Manager" | "Accountant" | "Client";
  email: string;
  projects: string;
  lastLogin: string;
  status: "active" | "inactive";
  initials: string;
}

export const USERS: User[] = [
  { id: "U001", name: "Dhruvil Bhandari",  role: "Admin",        email: "Dhruvil@dnbconstructions.in",  projects: "All",           lastLogin: "Today, 09:15", status: "active", initials: "DB" },
  { id: "U002", name: "Vikram Shah",   role: "Site Manager", email: "vikram@dnbconstructions.in",  projects: "NH-48, Ring Rd",lastLogin: "Today, 07:30", status: "active", initials: "VS" },
  { id: "U003", name: "Priya Nair",    role: "Site Manager", email: "priya@dnbconstructions.in",   projects: "Sapphire P2",   lastLogin: "Yesterday",    status: "active", initials: "PN" },
  { id: "U004", name: "Rohan Kaul",    role: "Accountant",   email: "rohan@dnbconstructions.in",   projects: "All (Finance)", lastLogin: "Today, 10:00", status: "active", initials: "RK" },
  { id: "U005", name: "Rajesh Kumar",  role: "Client",       email: "rajesh@skyline.in",           projects: "Sapphire P2",   lastLogin: "2 days ago",   status: "active", initials: "RJ" },
];

// ── Analytics helper data ────────────────────────────────────────────────────
export const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 4200, expense: 3500, profit: 700 },
  { month: "Feb", revenue: 5800, expense: 4800, profit: 1000 },
  { month: "Mar", revenue: 6500, expense: 5200, profit: 1300 },
  { month: "Apr", revenue: 7100, expense: 5800, profit: 1300 },
  { month: "May", revenue: 8800, expense: 6800, profit: 2000 },
  { month: "Jun", revenue: 9500, expense: 7400, profit: 2100 },
];

export const EXPENSE_BY_CATEGORY = [
  { name: "Labour",      value: 32, fill: "#374151" },
  { name: "Material",    value: 28, fill: "#6b7280" },
  { name: "Machinery",   value: 18, fill: "#8C8C7A" },
  { name: "Fuel",        value: 10, fill: "#9ca3af" },
  { name: "Overhead",    value: 8,  fill: "#c4c0b4" },
  { name: "Safety",      value: 4,  fill: "#d8d5cc" },
];

// ── Seed Data: Documents ──────────────────────────────────────────────────────
export interface Document {
  id: string;
  title: string;
  type: string;
  project: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: "verified" | "pending" | "expired";
}

export const DOCUMENTS: Document[] = [
  { id: "DOC-001", title: "Environmental Clearance", type: "Compliance", project: "NH-48", uploadedBy: "Vikram Shah", date: "2024-01-10", size: "2.4 MB", status: "verified" },
  { id: "DOC-002", title: "Structural Blueprints v2", type: "Drawing", project: "Sapphire P2", uploadedBy: "Priya Nair", date: "2024-05-15", size: "15.8 MB", status: "verified" },
  { id: "DOC-003", title: "Site Safety Protocol", type: "Policy", project: "All Projects", uploadedBy: "Suresh Patel", date: "2025-01-20", size: "1.1 MB", status: "verified" },
  { id: "DOC-004", title: "Vendor Agreement - Shree Steel", type: "Contract", project: "General", uploadedBy: "Rohan Kaul", date: "2025-06-01", size: "4.5 MB", status: "pending" },
  { id: "DOC-005", title: "Labor Insurance Policy 2024", type: "Insurance", project: "All Projects", uploadedBy: "Suresh Patel", date: "2024-01-01", size: "3.2 MB", status: "expired" },
];

export const PROJECT_STATUS_DATA = [
  { name: "On Track",   value: 10, fill: "#374151" },
  { name: "Delayed",    value: 3,  fill: "#d97706" },
  { name: "On Hold",    value: 2,  fill: "#dc2626" },
  { name: "Completed",  value: 127,fill: "#16a34a" },
];
