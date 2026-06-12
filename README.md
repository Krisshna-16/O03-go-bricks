# GO-BRICS Operations SOP Portal

A premium, interactive Standard Operating Procedure (SOP) portal and operations handbook built for **GO-BRICS Business Lab (TASK_O03)**. This application enables participants to review, navigate, and verify compliance with operational standards, workflows, and protocols.

---

## 🎨 Design System & Aesthetics

Conforms to standard GO-BRICS visual guidelines:
- **Background**: Dark Mode Slate (`#0A0A0A`)
- **Cards**: Rich Charcoal (`#1A1A1A`)
- **Accent**: Neon Cyber Green (`#00FF41`)
- **Typography**: Inter (UI text) & JetBrains Mono (status / metadata logs)
- **Responsive**: Dynamic sidebar layouts for desktop, collapsing menus for mobile, and custom spacing rules.
- **Micro-animations**: Smooth hover transitions, circular SVG loaders, copy reminders, and tab fade-ins.

---

## ⚡ Technical Stack

- **Framework**: React 19 (Vite environment)
- **Styling**: Tailwind CSS v4 (CSS-first configurations)
- **Icons**: Lucide React
- **Hosting Namespace / Base Path**: `/O03/`
- **Dependency Scope**: Fully self-contained, no external API calls, and zero client-side tracking.

---

## 📦 Features & Interactive Modules

1. **SOP Overview**: Fundamental guidelines on operational standardized instructions, governance cycles, and a comprehensive Roles & Responsibilities matrix.
2. **Task Submission timeline**: Visual step-by-step progress tracking (Steps 1-7). Clicking each node displays specific inputs, outputs, and actions.
3. **Quality Assurance Process**: Core metrics details and a **live QA Inspector simulator** to test hypothetical deliverables against completeness and accuracy guidelines.
4. **Approval Workflow**: Operational flow visualization with response SLA timers (24h reviews, 12h revisions) and escalation thresholds.
5. **Communication Standards**: Guidelines for professional channels, standup frequencies, and **click-to-copy Slack standup/blocker templates**.
6. **Documentation Standards**: Folder hierarchy structures, version control branch prefixes (`feat/`, `fix/`), and naming conventions.
7. **Escalation Procedures**: Standard operating instructions for technical failures, missed deadlines, approval disputes, and submission errors (Levels 1-3).
8. **Compliance Checklist**: Interactive checklist updating a **dynamic circular progress gauge**. Achieving 100% completion unlocks the verification stamp.
9. **SOP Summary Report**: Printable executive briefing report with official signature line overlays.
10. **Compliance Verification Panel**: Checkmarks confirming implementation coverage for TASK_O03.

---

## 📄 Print Optimization

To print the complete handbook or export it to PDF:
- The sidebar navigation and page action buttons are automatically hidden via `.no-print` styling.
- All 8 tabs/sections are forced to print sequentially (`display: block !important`) with clean page break intervals.
- The document prints in a standard, high-contrast, black-and-white A4 layout.
- Click **"Print Manual"** in the header to invoke the print layout directly.

---

## 🚀 Local Development Setup

To run this project locally, ensure you have **Node.js** installed, then execute:

```bash
# Clone the repository
git clone https://github.com/Krisshna-16/O03-go-bricks.git

# Navigate to the folder
cd O03-go-bricks

# Install dependencies
npm install

# Start local dev server
npm run dev
```

The development server will mount locally (typically at `http://localhost:5173/O03/`).

### Production Build
To generate compiled distribution files for hosting, run:
```bash
npm run build
```
Build assets will be emitted directly inside the `/dist` directory.
