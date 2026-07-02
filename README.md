# DNB Constructions – Civil Construction ERP

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

A modern, high-performance **Enterprise Resource Planning (ERP)** system custom-built for **DNB Constructions**, an ISO 9001:2015 certified civil construction contractor. 

This full-stack application includes a premium public-facing portfolio website alongside a fully authenticated, deeply integrated administrative portal for managing construction operations.

---

## 🌟 Key Features

### 🏢 Public Portal
- **Hero & Services:** Premium glassmorphism design showcasing structural engineering, roadworks, and architectural services.
- **Live Projects Portfolio:** Animated galleries highlighting ongoing and completed construction sites.
- **Interactive Contact:** Embedded Google Maps and a streamlined inquiry form.

### 🔐 Secure Authentication
- Client-side route guarding locking down all `/admin` paths.
- Mocked authentication system designed for seamless migration to JWT/OAuth.
- **Demo Accounts Included:** Try logging in with `suresh@dnbconstructions.in` (Admin) or `rohan@dnbconstructions.in` (Finance).

### 🏗️ Admin ERP Modules (11 Total)
- **📊 Live Dashboard:** Real-time KPI widgets tracking active sites, daily revenue, and cashflow via dynamic `Recharts`.
- **👷 Labour Management:** Track daily attendance, generate dynamic salary slips, and toggle interactive month-view calendars for accurate wage calculation.
- **🏗️ Project Tracking:** Monitor budgets, timelines, and completion percentages.
- **📦 Materials Inventory:** Track cement, steel, and sand stock with automated low-inventory alerts.
- **🚜 Machinery & Assets:** Manage heavy equipment (excavators, cranes) location, fuel usage, and maintenance schedules.
- **💼 Stakeholders (CRM):** Complete database for high-value Clients and Vendors/Suppliers.
- **📈 Finance & Expenses:** Generate invoices, track overdue payments, and log site-specific petty cash expenses.
- **📁 Document Vault:** Secure repository for structural drawings, ISO compliance PDFs, and safety policies.
- **🤖 AI Analytics:** Built-in predictive analysis for schedule delays and material shortages.

---

## 💻 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library:** React 19
- **Styling:** Tailwind CSS (Custom Color System: Cement Gray + Construction Amber)
- **Data Management:** React Context API (`useStore`) with persistent `localStorage` synchronization
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** Custom SVGs & Emojis

---

## 🚀 Getting Started

### 1. Clone the repository
Ensure you have Node.js (v18+) installed on your machine.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
To create an optimized static/server build:
```bash
npm run build
npm run start
```

---

## 🔒 Demo Access

To explore the Admin ERP, click the **Admin Portal** button on the public website or navigate to `/login`. Use the following credentials (any password will work):

- **Administrator:** `suresh@dnbconstructions.in`
- **Accountant:** `rohan@dnbconstructions.in`
- **Site Manager:** `vikram@dnbconstructions.in`

*(Note: Data is saved to your browser's Local Storage. Clearing your browser data will reset the ERP to its factory seed state).*

---

## 🎨 Design System

The application utilizes a heavily customized Tailwind configuration to reflect the rugged yet professional nature of civil construction:
- **Primary Accent:** Amber/Orange (Safety & Construction)
- **Neutrals:** Custom `cement` scale (Slate-based cool grays)
- **Aesthetics:** Glassmorphism (`backdrop-blur`), soft shadows, and micro-interactions on hover/active states.

---
*Built with precision for DNB Constructions.*
