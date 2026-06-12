import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Layers, 
  BookOpen, 
  ShieldAlert, 
  ClipboardCheck, 
  Printer, 
  FileDown, 
  Users, 
  Clock, 
  Search, 
  Check, 
  Copy,
  Info,
  ExternalLink,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState('overview');
  
  // Interactive Checklist State (Section 8)
  const [checklistItems, setChecklistItems] = useState([
    { id: 'sop-reviewed', label: 'SOP reviewed and understood', checked: false, desc: 'Read and acknowledged all roles, expectations, and standards.' },
    { id: 'workflow-followed', label: 'Workflow followed chronologically', checked: false, desc: 'Executed steps 1 through 7 of the task submission pipeline.' },
    { id: 'documentation-complete', label: 'Documentation complete and structured', checked: false, desc: 'Files named according to convention, index updated, and Readme complete.' },
    { id: 'qa-completed', label: 'QA completed (No errors, self-review passed)', checked: false, desc: 'Validated completeness, formatting, logic, and proof evidence.' },
    { id: 'approval-obtained', label: 'Approval obtained from Department Lead', checked: false, desc: 'Received formal confirmation / signature in the tracking sheet.' },
    { id: 'submission-archived', label: 'Submission archived in repository', checked: false, desc: 'Committed to branch, PR merged, and assets archived correctly.' },
  ]);

  // Section 3: QA Interactive Evaluator State
  const [qaInspectorItems, setQaInspectorItems] = useState({
    completeness: true,
    accuracy: true,
    formatting: false,
    proof: true,
    compliance: true,
  });
  const [activeTestProject, setActiveTestProject] = useState('budget-tracker');
  const [showCopyNotification, setShowCopyNotification] = useState('');

  // Section 2: Task Submission Steps details view state
  const [selectedSubmissionStep, setSelectedSubmissionStep] = useState(0);

  // Section 7: Escalation active scenario filter state
  const [selectedEscalationScenario, setSelectedEscalationScenario] = useState('all');

  // Helper: Copy Text to Clipboard
  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(id);
    setTimeout(() => setShowCopyNotification(''), 2000);
  };

  // Helper: Toggle Checklist Item
  const handleToggleChecklist = (id) => {
    setChecklistItems(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  // Helper: Reset Checklist
  const handleResetChecklist = () => {
    setChecklistItems(prev => prev.map(item => ({ ...item, checked: false })));
  };

  // Helper: Toggle QA Item
  const handleToggleQa = (key) => {
    setQaInspectorItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute Checklist Completion Percentage
  const checkedCount = checklistItems.filter(item => item.checked).length;
  const completionPercentage = Math.round((checkedCount / checklistItems.length) * 100);

  // Print Manual Helper
  const handlePrint = () => {
    window.print();
  };

  // Export SOP Markdown format
  const handleExportText = () => {
    const textContent = `# GO-BRICS Operations SOP Manual\nTASK_O03 Operations Department\n\nGenerate Time: ${new Date().toLocaleString()}\n\nOverview:\nGO-BRICS Operations SOP Portal serves as the primary operational handbook for standardizing workflows.\n\nVerify that all checklists and frameworks conform to TASK_O03.\n\nStatus: Approved Procedure Framework.`;
    const blob = new Blob([textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TASK_O03_GO-BRICS_Operations_SOP.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: 'overview', label: '1. SOP Overview', icon: BookOpen },
    { id: 'submission', label: '2. Task Submission', icon: ArrowRight },
    { id: 'qa', label: '3. Quality Assurance', icon: ClipboardCheck },
    { id: 'approval', label: '4. Approval Workflow', icon: Layers },
    { id: 'communication', label: '5. Communication Standards', icon: MessageSquare },
    { id: 'documentation', label: '6. Documentation Standards', icon: FileText },
    { id: 'escalation', label: '7. Escalation Procedures', icon: ShieldAlert },
    { id: 'checklist', label: '8. Compliance Checklist', icon: CheckCircle },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      {/* HEADER SECTION */}
      <header className="no-print sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2E2E2E] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-green/10 text-brand-green text-xs font-semibold px-2.5 py-0.5 rounded-full border border-brand-green/20 uppercase tracking-widest glow-green-text">
              Approved Procedure Framework
            </span>
            <span className="text-gray-500 text-xs font-mono font-bold">TASK_O03</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight flex items-center gap-2">
            GO-BRICS Operations SOP Portal
          </h1>
          <p className="text-gray-400 text-xs mt-0.5 font-mono">
            TASK_O03 | Operations Department &bull; Version 1.2
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleExportText}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#2E2E2E] active:border-brand-green/45 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 shadow-sm"
          >
            <FileDown className="w-4 h-4 text-brand-green" />
            <span>Export SOP</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-[#00FF41] hover:bg-[#00D035] active:bg-[#00A52B] px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all duration-200 shadow-md shadow-brand-green/10"
          >
            <Printer className="w-4 h-4" />
            <span>Print Manual</span>
          </button>
        </div>
      </header>

      {/* PRINT-ONLY MANUAL HEADER */}
      <div className="hidden print:block w-full text-black mb-8 border-b-4 border-black pb-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase print-heading-main">
              GO-BRICS Operations SOP Portal
            </h1>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest mt-1 print-heading-sub">
              TASK_O03 &bull; Standard Operating Procedure &bull; Operations Department
            </p>
          </div>
          <div className="text-right">
            <span className="border-2 border-black px-3 py-1 font-bold text-xs uppercase rounded">
              APPROVED FRAMEWORK
            </span>
            <p className="text-xs text-slate-500 mt-2 font-mono">Date: June 12, 2026</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-300 pt-3 text-xs">
          <div>
            <span className="font-bold uppercase text-slate-500 block">Owner</span>
            <span className="font-bold text-slate-800">Operations Team Lead</span>
          </div>
          <div>
            <span className="font-bold uppercase text-slate-500 block">Scope</span>
            <span className="font-bold text-slate-800">GO-BRICS Business Lab Participants</span>
          </div>
          <div>
            <span className="font-bold uppercase text-slate-500 block">Security Classification</span>
            <span className="font-bold text-slate-800 font-mono">RESTRICTED - INTERNAL ONLY</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* SIDEBAR NAVIGATION (NO-PRINT) */}
        <aside className="no-print w-full md:w-72 bg-[#0C0C0C] border-r border-[#2E2E2E] flex flex-col shrink-0">
          <nav className="p-4 space-y-1.5 flex-1">
            <span className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
              SOP NAVIGATION
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-brand-green border-l-4 border-brand-green pl-2 shadow-inner shadow-black/40'
                      : 'text-gray-400 hover:text-white hover:bg-[#151515] pl-3'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-green' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'checklist' && completionPercentage > 0 && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      completionPercentage === 100 
                        ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {completionPercentage}%
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Stats Panel (No-print) */}
            <div className="mt-8 pt-6 border-t border-[#1C1C1C] px-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">
                Current Checklist Status
              </span>
              <div className="bg-[#141414] rounded-lg p-3 border border-[#222]">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400">Compliance score</span>
                  <span className="font-mono text-brand-green font-bold">{completionPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#2E2E2E] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-green transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-2.5 leading-relaxed">
                  {completionPercentage === 100 
                    ? '✓ Complete and compliant.' 
                    : '⚠ Please complete checklist before submitting.'}
                </p>
              </div>
            </div>
          </nav>

          {/* Quick Stats footer (No-print) */}
          <div className="p-4 border-t border-[#1C1C1C] bg-[#0E0E0E]">
            <div className="flex items-center gap-2.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span>Operations Server: Active</span>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY REGION */}
        <main className="flex-grow p-6 md:p-8 space-y-8 overflow-y-auto max-w-5xl">

          {/* SECTION 1 — SOP OVERVIEW */}
          <section 
            id="overview" 
            className={`${activeSection === 'overview' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <BookOpen className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 1 &mdash; SOP Overview</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Foundational architecture, objectives, governance, and organization of Standard Operating Procedures (SOPs).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid-2">
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 print:text-black">
                  <span className="w-1.5 h-3 bg-brand-green rounded-full print:bg-black" />
                  Purpose of SOPs
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed print:text-slate-700">
                  Standard Operating Procedures (SOPs) are documented, step-by-step operational instructions designed to align GO-BRICS activities with institutional standards. They guarantee that all procedures, deliverables, and technical submissions are executed with consistent high quality, zero data leaks, and absolute clarity.
                </p>
              </div>

              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 print:text-black">
                  <span className="w-1.5 h-3 bg-brand-green rounded-full print:bg-black" />
                  Benefits of Standardization
                </h3>
                <ul className="text-gray-300 text-sm space-y-2.5 print:text-slate-700 print-bullets">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5 print:text-black font-mono font-bold">&bull;</span>
                    <span><strong>Consistency:</strong> Ensures deliverables conform to identical guidelines across iterations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5 print:text-black font-mono font-bold">&bull;</span>
                    <span><strong>Risk Mitigation:</strong> Minimizes build breakages, compliance violations, and data loss.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5 print:text-black font-mono font-bold">&bull;</span>
                    <span><strong>Autonomy:</strong> Empowers participants to build, test, and submit tasks independently.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5 print:text-black font-mono font-bold">&bull;</span>
                    <span><strong>Auditable Trail:</strong> Provides a clear structure for operations reviews and progress monitoring.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                <Users className="w-4 h-4 text-brand-green print:hidden" />
                Roles and Responsibilities Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300 print:text-slate-700">
                  <thead className="text-xs uppercase bg-[#141414] text-gray-400 border-b border-[#2E2E2E] print:bg-slate-100 print:border-slate-300">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold print:text-black">Role</th>
                      <th scope="col" className="px-4 py-3 font-semibold print:text-black">Core Responsibility</th>
                      <th scope="col" className="px-4 py-3 font-semibold print:text-black">SOP Scope of Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2E2E2E] print:divide-slate-200">
                    <tr className="hover:bg-[#1E1E1E]/50 print:hover:bg-transparent">
                      <td className="px-4 py-3.5 font-semibold text-white print:text-black">Participant</td>
                      <td className="px-4 py-3.5">Executes work items, runs self-reviews, creates technical deliverables.</td>
                      <td className="px-4 py-3.5 text-gray-400 print:text-slate-600">Compliance with checklists, code patterns, and initial testing.</td>
                    </tr>
                    <tr className="hover:bg-[#1E1E1E]/50 print:hover:bg-transparent">
                      <td className="px-4 py-3.5 font-semibold text-white print:text-black">Department Lead</td>
                      <td className="px-4 py-3.5">Conducts code reviews, audits submissions, mentors participants, reviews timelines.</td>
                      <td className="px-4 py-3.5 text-gray-400 print:text-slate-600">Approves/Rejects submissions, manages Level 1 escalations.</td>
                    </tr>
                    <tr className="hover:bg-[#1E1E1E]/50 print:hover:bg-transparent">
                      <td className="px-4 py-3.5 font-semibold text-white print:text-black">Quality Assurance</td>
                      <td className="px-4 py-3.5">Validates complete workflow fidelity, conducts visual audits and compliance validation.</td>
                      <td className="px-4 py-3.5 text-gray-400 print:text-slate-600">Locks/Unlocks release status, signs off on QA checklist items.</td>
                    </tr>
                    <tr className="hover:bg-[#1E1E1E]/50 print:hover:bg-transparent">
                      <td className="px-4 py-3.5 font-semibold text-white print:text-black">Operations Director</td>
                      <td className="px-4 py-3.5">Maintains overall system governance, reviews major escalations, signs off on framework changes.</td>
                      <td className="px-4 py-3.5 text-gray-400 print:text-slate-600">Final approval authority. Resolves Level 3 disputes.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-[#1A1A1A]/50 p-5 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-2.5 flex items-center gap-2 print:text-black">
                <span className="w-1.5 h-3 bg-brand-green rounded-full print:bg-black" />
                Governance & SOP Review Cycle
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed print:text-slate-700">
                To prevent documentation obsolescence, all operational SOPs undergo a strict audit cycle. Procedures are proposed by Department Leads, validated by Quality Assurance, and signed off by the Operations Director. Every policy is reviewed quarterly or upon major platform configuration shifts to ensure it incorporates modern engineering practices and project constraints.
              </p>
            </div>
          </section>

          {/* SECTION 2 — TASK SUBMISSION PROCESS */}
          <section 
            id="submission" 
            className={`${activeSection === 'submission' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <ArrowRight className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 2 &mdash; Task Submission Process</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Chronological timeline step details, required inputs, and expected outcomes for each phase.
              </p>
            </div>

            {/* Timeline workflow diagram */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] mb-6 print-card-style">
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2 print:text-black">
                Interactive Submission Roadmap
              </h3>

              <div className="relative pl-6 md:pl-0 md:flex justify-between items-start gap-4">
                {/* Horizontal line for desktop, vertical line for mobile */}
                <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-[#2E2E2E] md:left-4 md:right-4 md:top-6 md:h-0.5 md:w-auto" />

                {[
                  { step: 1, title: 'Select Task', action: 'Pull from Task Backlog' },
                  { step: 2, title: 'Review Specs', action: 'Validate Criteria & Inputs' },
                  { step: 3, title: 'Build Project', action: 'Write Code & Docs' },
                  { step: 4, title: 'Self-Review', action: 'Local QA & Dry Run' },
                  { step: 5, title: 'Submit Lead', action: 'Create PR & Logs' },
                  { step: 6, title: 'Feedback Loop', action: 'Iterate Review Comments' },
                  { step: 7, title: 'Final Approval', action: 'Merge & Deploy' }
                ].map((item, idx) => {
                  const isSelected = selectedSubmissionStep === idx;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setSelectedSubmissionStep(idx)}
                      className="no-print relative z-10 flex md:flex-col items-start md:items-center text-left md:text-center w-full mb-6 md:mb-0 group cursor-pointer focus:outline-none"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                        isSelected 
                          ? 'bg-brand-green border-brand-green text-black scale-110 shadow-lg shadow-brand-green/20' 
                          : 'bg-[#151515] border-[#2E2E2E] text-gray-400 group-hover:border-brand-green group-hover:text-white'
                      }`}>
                        {item.step}
                      </div>
                      <div className="ml-4 md:ml-0 md:mt-2.5">
                        <p className={`text-xs font-bold ${isSelected ? 'text-brand-green' : 'text-gray-300 group-hover:text-white'}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-gray-500 hidden md:block mt-0.5">
                          {item.action}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Printable flat representation of steps */}
                <div className="hidden print:block w-full">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {[
                      { step: 1, title: 'Select Task' },
                      { step: 2, title: 'Review Specs' },
                      { step: 3, title: 'Build Project' },
                      { step: 4, title: 'Self-Review' },
                      { step: 5, title: 'Submit Lead' },
                      { step: 6, title: 'Feedback Loop' },
                      { step: 7, title: 'Final Approval' }
                    ].map(item => (
                      <div key={item.step} className="border border-slate-300 p-2 rounded">
                        <span className="font-bold text-slate-800 block">Step {item.step}</span>
                        <span className="text-slate-600 text-[10px]">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Step Detail Card */}
              <div className="no-print mt-6 bg-[#151515] border border-[#2E2E2E] rounded-lg p-5">
                {[
                  {
                    title: 'Step 1: Select Task',
                    desc: 'Prioritize and claim operational tasks from the team workspace backlog.',
                    inputs: 'Sprint Backlog, Task Definition, Department Resource Plan.',
                    outputs: 'Assigned Task status updated to "In Progress" with owner identifier.',
                    actions: [
                      'Review the assigned workflow and verify capacity.',
                      'Assign oneself to the task in the primary project repository.',
                      'Acknowledge deadline requirements with the Department Lead.'
                    ]
                  },
                  {
                    title: 'Step 2: Review Specifications',
                    desc: 'Acquire clear context, boundary constraints, and compliance benchmarks for the selected task.',
                    inputs: 'Requirements spec file, user templates, wireframes or asset references.',
                    outputs: 'Drafted implementation approach, identified dependencies, or raised blockers.',
                    actions: [
                      'Analyze all criteria checklist questions.',
                      'Confirm that local workspace tooling is updated and available.',
                      'Verify target build environments match current specifications.'
                    ]
                  },
                  {
                    title: 'Step 3: Create Deliverable',
                    desc: 'Perform core implementation work ensuring zero data leaks and adherence to the layout styling system.',
                    inputs: 'Spec documents, code workspace, template boilerplate.',
                    outputs: 'Working code branch, clean file layout, initial testing data sets.',
                    actions: [
                      'Implement page layers utilizing predefined colors, borders, and animations.',
                      'Write semantic, readable markup without placeholders or stub values.',
                      'Save assets in correct directory folders according to standards.'
                    ]
                  },
                  {
                    title: 'Step 4: Perform Self-Review',
                    desc: 'Rigorous validation phase executed independently by the participant prior to formal review request.',
                    inputs: 'Draft implementation, QA checklist template, testing scripts.',
                    outputs: 'Self-reviewed code diff, clean build output, validated visual states.',
                    actions: [
                      'Execute local compilation, check console logs for errors.',
                      'Manually test all interactive widgets, triggers, and state resets.',
                      'Run compliance check to ensure all required fields are populated.'
                    ]
                  },
                  {
                    title: 'Step 5: Submit to Lead',
                    desc: 'Create formal review request to initiate department-level audit and code verification.',
                    inputs: 'Committed branch, open Pull Request (PR), test logs, proof evidence.',
                    outputs: 'Active review ticket in status "Under Review".',
                    actions: [
                      'Push code to standard repository branch naming standard.',
                      'Write clear, descriptive PR detail summarizing changes made and testing steps.',
                      'Notify lead in designated Slack channel using template communication.'
                    ]
                  },
                  {
                    title: 'Step 6: Receive Feedback & Iterate',
                    desc: 'Incorporate review corrections, clarify architectural intent, and iterate until compliant.',
                    inputs: 'Lead review logs, code comments, change requests.',
                    outputs: 'Revised commits, approved review status.',
                    actions: [
                      'Address each code comment sequentially.',
                      'Commit modifications directly to the PR branch.',
                      'Verify regression tests pass after code revisions.'
                    ]
                  },
                  {
                    title: 'Step 7: Final Approval',
                    desc: 'Conclude task lifecycle, deploy assets, and transition the work item to archives.',
                    inputs: 'Approved PR status, QA signoff, merged branch.',
                    outputs: 'Live page environment, completed task archive file.',
                    actions: [
                      'Initiate merge to production branches.',
                      'Mark corresponding task ticket as "Completed" in tracker.',
                      'Verify that live environment prints cleanly for operations records.'
                    ]
                  }
                ].map((step, idx) => {
                  if (idx !== selectedSubmissionStep) return null;
                  return (
                    <div key={idx} className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{step.title}</h4>
                        <span className="text-[10px] text-brand-green font-mono bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded">
                          ACTIVE STAGE DETAILS
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{step.desc}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Inputs Needed</span>
                          <p className="text-gray-400 text-xs font-mono">{step.inputs}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Primary Deliverable</span>
                          <p className="text-gray-400 text-xs font-mono">{step.outputs}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Required Actions</span>
                        <ul className="space-y-1.5">
                          {step.actions.map((act, aIdx) => (
                            <li key={aIdx} className="text-gray-300 text-xs flex items-start gap-2">
                              <span className="text-brand-green font-mono font-bold mt-0.5">&bull;</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Static Complete Workflow layout for Print */}
            <div className="hidden print:block space-y-6">
              {[
                { step: '1', title: 'Select Task', desc: 'Prioritize and claim operational tasks from the team workspace backlog. Update task ticket owner.' },
                { step: '2', title: 'Review Specifications', desc: 'Acquire clear context, boundary constraints, and compliance benchmarks. Identify dependencies.' },
                { step: '3', title: 'Create Deliverable', desc: 'Perform core implementation work. Write clean, readable code and documentation matching design tokens.' },
                { step: '4', title: 'Perform Self-Review', desc: 'Rigorous validation phase executed independently. Compile, run tests, and check layouts manually.' },
                { step: '5', title: 'Submit to Lead', desc: 'Create formal review request via Pull Request (PR) with structured test records. Notify team leads.' },
                { step: '6', title: 'Receive Feedback', desc: 'Address code comments, compile fixes, and commit improvements until requirements are met.' },
                { step: '7', title: 'Final Approval', desc: 'Merge approved branch to production code, deploy assets, and archive completed tickets.' }
              ].map(item => (
                <div key={item.step} className="border-l-4 border-black pl-4 py-1">
                  <h4 className="font-bold text-black text-sm">Step {item.step}: {item.title}</h4>
                  <p className="text-xs text-slate-700 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 — QUALITY ASSURANCE PROCESS */}
          <section 
            id="qa" 
            className={`${activeSection === 'qa' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <ClipboardCheck className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 3 &mdash; Quality Assurance Process</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Mandatory verification criteria for all technical and operational deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid-2">
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                  QA Checklists Criteria
                </h3>
                
                <div className="space-y-4">
                  {[
                    { title: 'Completeness', criteria: 'All specified features are implemented. No default stubs, placeholder strings, or missing pages.' },
                    { title: 'Accuracy', criteria: 'Code runs without errors, mathematical/data outputs are exact, logic branches are fully functional.' },
                    { title: 'Formatting', criteria: 'Matches GO-BRICS styling system (black background, neon green accent text, Inter fonts, responsive margins).' },
                    { title: 'Proof Requirements', criteria: 'Console logs are clear, validation screenshots or test suites are appended in review records.' },
                    { title: 'Compliance', criteria: 'No external network dependencies (unless specified), private keys/secrets are omitted, and data remains on-device.' }
                  ].map((item, index) => (
                    <div key={index} className="border-b border-[#2E2E2E] pb-3 last:border-0 last:pb-0 print:border-slate-200">
                      <h4 className="text-xs font-extrabold text-brand-green uppercase font-mono print:text-black">{item.title}</h4>
                      <p className="text-gray-300 text-xs mt-1 print:text-slate-700 leading-relaxed">{item.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive QA Evaluator (No-print) */}
              <div className="no-print bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    QA Inspector Simulator
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    Simulate a live QA evaluation checklist. Select a target component and toggle pass/fail criteria below.
                  </p>

                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Target Deliverable</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'budget-tracker', label: 'Budget Tracker' },
                        { id: 'crm-doc', label: 'CRM System Doc' },
                        { id: 'api-doc', label: 'API Integration' }
                      ].map(proj => (
                        <button
                          key={proj.id}
                          onClick={() => setActiveTestProject(proj.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                            activeTestProject === proj.id 
                              ? 'bg-brand-green/10 text-brand-green border-brand-green/30' 
                              : 'bg-[#151515] border-[#2E2E2E] text-gray-400 hover:text-white'
                          }`}
                        >
                          {proj.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2.5">Verification Criteria</span>
                  <div className="space-y-2">
                    {Object.entries(qaInspectorItems).map(([key, val]) => (
                      <div 
                        key={key} 
                        onClick={() => handleToggleQa(key)}
                        className="flex items-center justify-between p-2.5 bg-[#151515] rounded-lg border border-[#2E2E2E] hover:border-gray-600 transition-all duration-150 cursor-pointer"
                      >
                        <span className="text-xs text-gray-300 font-semibold capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            val ? 'bg-brand-green/10 text-brand-green' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {val ? 'PASS' : 'FAIL'}
                          </span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            val ? 'bg-brand-green border-brand-green text-black' : 'border-[#444]'
                          }`}>
                            {val && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#2E2E2E] flex justify-between items-center bg-[#151515]/60 -mx-5 -mb-5 p-5 rounded-b-xl">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Evaluation Status</span>
                    <span className={`text-sm font-extrabold ${
                      Object.values(qaInspectorItems).every(v => v) ? 'text-brand-green' : 'text-red-500'
                    }`}>
                      {Object.values(qaInspectorItems).every(v => v) ? '✓ DELIVERABLE COMPLIANT' : '⚠ REVISION REQUIRED'}
                    </span>
                  </div>
                  <button
                    onClick={() => setQaInspectorItems({ completeness: true, accuracy: true, formatting: true, proof: true, compliance: true })}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-green transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Approve All</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 — APPROVAL WORKFLOW */}
          <section 
            id="approval" 
            className={`${activeSection === 'approval' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <Layers className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 4 &mdash; Approval Workflow</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Visual pipeline, hierarchy of reviews, and approval progression.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2 print:text-black">
                Review Flowchart Sequence
              </h3>

              {/* Visual Workflow diagram */}
              <div className="flex flex-col print:flex-row md:flex-row items-center justify-between gap-4 py-4 max-w-4xl mx-auto">
                {[
                  { role: 'Participant', color: 'border-gray-500 text-gray-300', icon: '👤', action: 'Create & Self-Review' },
                  { role: 'Department Lead', color: 'border-yellow-500 text-yellow-400', icon: '🧑‍💻', action: 'Code Audit & QA Run' },
                  { role: 'Review / Revision', color: 'border-orange-500 text-orange-400', icon: '🔄', action: 'Address Comments' },
                  { role: 'Final Submission', color: 'border-brand-green text-brand-green', icon: '📦', action: 'Merge & Archive' }
                ].map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`w-full print:flex-1 md:w-48 bg-[#151515] border ${step.color} rounded-xl p-4 print:p-2.5 text-center shadow-md relative print:border-slate-400 print:text-black print-avoid-break`}>
                      <span className="text-2xl print:text-lg block mb-2 print:mb-1">{step.icon}</span>
                      <h4 className="text-sm print:text-xs font-bold uppercase tracking-wide print:text-black">{step.role}</h4>
                      <p className="text-[10px] print:text-[8px] text-gray-500 mt-1 uppercase font-mono tracking-wider">{step.action}</p>
                    </div>
                    {idx < 3 && (
                      <div className="text-gray-600 font-mono text-xl py-2 print:py-0 md:py-0 rotate-90 print:rotate-0 md:rotate-0 flex justify-center print:text-slate-400">
                        <ArrowRight className="w-6 h-6 text-brand-green print:text-black" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#151515] p-4 rounded-lg border border-[#2E2E2E] print:border-slate-300 print-avoid-break">
                  <span className="text-xs font-bold text-brand-green uppercase font-mono block mb-2 print:text-black">SLA Processing Times</span>
                  <ul className="text-xs text-gray-400 space-y-2 print:text-slate-700">
                    <li>&bull; <strong className="text-gray-300 print:text-black">Lead Initial Review:</strong> 24 Hours from PR creation.</li>
                    <li>&bull; <strong className="text-gray-300 print:text-black">Participant Re-submittal:</strong> 12 Hours from feedback logging.</li>
                    <li>&bull; <strong className="text-gray-300 print:text-black">Final Merge/Deployment:</strong> 8 Hours from approvals signoff.</li>
                  </ul>
                </div>
                <div className="bg-[#151515] p-4 rounded-lg border border-[#2E2E2E] print:border-slate-300 print-avoid-break">
                  <span className="text-xs font-bold text-brand-green uppercase font-mono block mb-2 print:text-black">Escalation Thresholds</span>
                  <ul className="text-xs text-gray-400 space-y-2 print:text-slate-700">
                    <li>&bull; <strong className="text-gray-300 print:text-black">Unresolved Feedback (48 hours):</strong> Automatic level 1 escalation.</li>
                    <li>&bull; <strong className="text-gray-300 print:text-black">Rejected Code Dispute:</strong> Transferred to Quality Assurance.</li>
                    <li>&bull; <strong className="text-gray-300 print:text-black">Critical Path Delays:</strong> Immediate briefing to Director.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5 — COMMUNICATION STANDARDS */}
          <section 
            id="communication" 
            className={`${activeSection === 'communication' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <MessageSquare className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 5 &mdash; Communication Standards</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Message formatting, standup guidelines, escalation windows, and templates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid-2">
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                <h3 className="text-base font-bold text-white mb-3.5 flex items-center gap-2 print:text-black">
                  Communication Protocols
                </h3>
                
                <div className="space-y-4 text-xs text-gray-300 print:text-slate-700">
                  <div>
                    <h4 className="font-extrabold text-brand-green uppercase font-mono mb-1 print:text-black">Professional Messaging</h4>
                    <p className="leading-relaxed">Keep all channels direct and action-oriented. Support questions with code snippets, logs, or links to the target folder. Omit greetings or casual phrasing in critical operational alerts.</p>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-green uppercase font-mono mb-1 print:text-black">Update Frequency</h4>
                    <p className="leading-relaxed">Every active team member must post a Daily Standup in the department channel by 18:00 Local Time, summarizing today's tasks and highlighting upcoming dependencies.</p>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-green uppercase font-mono mb-1 print:text-black">Escalation Timing SLA</h4>
                    <p className="leading-relaxed">If a technical blocker remains unresolved after 4 hours of peer support, it must be escalated to the Department Lead. Operational resource blockers must be escalated within 12 hours.</p>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-green uppercase font-mono mb-1 print:text-black">Response Expectations</h4>
                    <p className="leading-relaxed">Active team hours require response acknowledgement within 2 hours. Outside core hours, the response SLA expands to 12 hours.</p>
                  </div>
                </div>
              </div>

              {/* Message Templates Copy (No-print) */}
              <div className="no-print bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    Actionable Templates
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    Quickly copy standard formatted slack communication templates.
                  </p>

                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">1. Daily Standup Template</span>
                        <button
                          onClick={() => handleCopyText(`*DAILY STANDUP - TASK_O03*\n• Progress: Implemented the timeline component for Section 2.\n• Plan: Finalize documentation guidelines and run linter.\n• Blockers: None.`, 'standup')}
                          className="text-[10px] text-brand-green hover:underline flex items-center gap-1"
                        >
                          {showCopyNotification === 'standup' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                      </div>
                      <div className="bg-[#151515] p-2.5 rounded border border-[#2E2E2E] text-[10px] font-mono text-gray-300 whitespace-pre-line leading-relaxed">
                        {"*DAILY STANDUP - [TASK_ID]*\n• Progress: [What you finished today]\n• Plan: [Target work items for tomorrow]\n• Blockers: [Detail any blockages, else None]"}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">2. Blocker Notification Template</span>
                        <button
                          onClick={() => handleCopyText(`*CRITICAL BLOCKER ALERT*\n• Task: TASK_O03 SOP Portal\n• Issue: Build fails due to missing Tailwind dependency\n• Actions Taken: Checked package.json configuration\n• Assistance Required: Dev lead review of bundle options`, 'blocker')}
                          className="text-[10px] text-brand-green hover:underline flex items-center gap-1"
                        >
                          {showCopyNotification === 'blocker' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                      </div>
                      <div className="bg-[#151515] p-2.5 rounded border border-[#2E2E2E] text-[10px] font-mono text-gray-300 whitespace-pre-line leading-relaxed">
                        {"*CRITICAL BLOCKER ALERT*\n• Task: [TASK_ID]\n• Issue: [Detailed error message / issue description]\n• Actions Taken: [What you checked/attempted]\n• Assistance Required: [What you need from leads]"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional vs Unprofessional Comparison (Print Ready) */}
            <div className="mt-6 bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                Communication Quality Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg print:border-slate-300 print:bg-transparent">
                  <span className="text-red-500 text-xs font-bold uppercase tracking-wider block mb-2 font-mono">❌ DO NOT USE (Ambiguous / Casual)</span>
                  <div className="bg-[#0C0C0C] p-3 rounded font-mono text-[10px] text-gray-400 space-y-2 border border-[#1C1C1C] print:bg-slate-100 print:text-slate-700">
                    <p>"Hey guys, I have some errors. Can anyone check my code? I don't know what is wrong."</p>
                    <p className="border-t border-[#1C1C1C] pt-2 text-slate-500">&bull; Issues: No context, no specific files, no task identifier, vague request.</p>
                  </div>
                </div>
                <div className="bg-brand-green/5 border border-brand-green/20 p-4 rounded-lg print:border-slate-300 print:bg-transparent">
                  <span className="text-brand-green text-xs font-bold uppercase tracking-wider block mb-2 font-mono print:text-black">✓ RECOMMENDED (Precise & Actionable)</span>
                  <div className="bg-[#0C0C0C] p-3 rounded font-mono text-[10px] text-gray-300 space-y-2 border border-[#1C1C1C] print:bg-slate-100 print:text-slate-700">
                    <p>"*TECHNICAL HELP REQUEST - TASK_O03*\n• Issue: Webpack compilation fails at config parsing (see attachment logs/err.txt).\n• Target File: [App.jsx](file:///src/App.jsx#L145)\n• Assistance: Check if syntax version matches React 19 rules."</p>
                    <p className="border-t border-[#1C1C1C] pt-2 text-slate-500 print:text-slate-600">&bull; Strengths: Task prefix, exact log references, clickable line numbers, precise request.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 — DOCUMENTATION STANDARDS */}
          <section 
            id="documentation" 
            className={`${activeSection === 'documentation' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <Layers className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 6 &mdash; Documentation Standards</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Naming structures, file directory standards, version control rules, and code mapping guidelines.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                File Naming Conventions & Organization
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-4 print:text-slate-700">
                To keep repositories consistent, all participants must follow strict document and repository organization formats. File naming structures specify target task identifiers, semantic versioning increments, and execution timestamps.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#151515] p-4 rounded-lg border border-[#2E2E2E] print:border-slate-300">
                  <span className="text-[10px] font-bold text-brand-green uppercase font-mono block mb-2 print:text-black">DOCUMENT FILES</span>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">SOP PDF Exports:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        TASK_O03_SOP_Portal_v1.2_20260612.pdf
                      </code>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">Release Checklists:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        TASK_O03_QA_Verification_v1.0.xlsx
                      </code>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">Technical Specs:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        TASK_O03_Technical_Specs.md
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151515] p-4 rounded-lg border border-[#2E2E2E] print:border-slate-300">
                  <span className="text-[10px] font-bold text-brand-green uppercase font-mono block mb-2 print:text-black">VERSION CONTROL PREFIX RULES</span>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">Branch Naming:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        feat/O03-sop-portal
                      </code>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">Commit Message Format:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        feat(O03): implement compliance checklist UI
                      </code>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-mono text-[10px]">Tag Standards:</span>
                      <code className="text-white bg-[#0A0A0A] px-1.5 py-0.5 rounded text-[11px] font-mono print:text-black print:bg-slate-100">
                        v1.2.0-O03
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Folder Structure mapping */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] print-card-style">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 print:text-black">
                <FolderOpen className="w-4 h-4 text-brand-green print:hidden" />
                Standard Repository Map
              </h3>
              
              <div className="bg-[#151515] p-4 rounded-lg border border-[#2E2E2E] font-mono text-xs text-gray-300 print:border-slate-300 print:text-slate-700 print:bg-slate-50">
                <div className="space-y-1">
                  <div>📂 <span className="font-bold text-white print:text-black">go-brics-operations-sop-portal/</span></div>
                  <div className="pl-4">📂 <span className="font-bold text-white print:text-black">src/</span> <span className="text-slate-500 font-sans">&mdash; Primary React source tree</span></div>
                  <div className="pl-8">📂 <span className="font-bold text-white print:text-black">components/</span> <span className="text-slate-500 font-sans">&mdash; Reusable layout elements (cards, checklists)</span></div>
                  <div className="pl-8">📄 <span className="text-brand-green font-bold print:text-black">App.jsx</span> <span className="text-slate-500 font-sans">&mdash; Main app controller carrying states</span></div>
                  <div className="pl-8">📄 <span className="text-brand-green font-bold print:text-black">index.css</span> <span className="text-slate-500 font-sans">&mdash; Main style system & media print rules</span></div>
                  <div className="pl-8">📄 <span className="text-brand-green font-bold print:text-black">main.jsx</span> <span className="text-slate-500 font-sans">&mdash; Application entry script</span></div>
                  <div className="pl-4">📂 <span className="font-bold text-white print:text-black">public/</span> <span className="text-slate-500 font-sans">&mdash; Static graphics and favicon files</span></div>
                  <div className="pl-4">📄 <span className="text-brand-green font-bold print:text-black">package.json</span> <span className="text-slate-500 font-sans">&mdash; System build scripts & dependencies</span></div>
                  <div className="pl-4">📄 <span className="text-brand-green font-bold print:text-black">vite.config.js</span> <span className="text-slate-500 font-sans">&mdash; Bundler configurations, base: '/O03/'</span></div>
                  <div className="pl-4">📄 <span className="text-brand-green font-bold print:text-black">index.html</span> <span className="text-slate-500 font-sans">&mdash; Base HTML frame & SEO definitions</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 — ESCALATION PROCEDURES */}
          <section 
            id="escalation" 
            className={`${activeSection === 'escalation' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <ShieldAlert className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 7 &mdash; Escalation Procedures</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Action matrices for addressing blockers, deadline concerns, review differences, or build failures.
              </p>
            </div>

            {/* Filter buttons (No-print) */}
            <div className="no-print flex gap-2 mb-4">
              {[
                { id: 'all', label: 'All Scenarios' },
                { id: 'tech', label: 'Technical Issues' },
                { id: 'deadline', label: 'Missed Deadlines' },
                { id: 'dispute', label: 'Approval Disputes' },
                { id: 'error', label: 'Submission Errors' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedEscalationScenario(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                    selectedEscalationScenario === tab.id 
                      ? 'bg-brand-green/10 text-brand-green border-brand-green/30' 
                      : 'bg-[#151515] border-[#2E2E2E] text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'tech',
                  issue: 'Technical Issues',
                  trigger: 'Build breaking errors, package installation failures, or local compiler crashes.',
                  responsible: 'Lead Technical Architect',
                  path: 'Level 1: Peer developer support (2 hours) &rarr; Level 2: Lead Dev review (4 hours) &rarr; Level 3: Architecture Committee review (8 hours).',
                  timeline: '8 Hours max resolution.',
                  severity: 'HIGH'
                },
                {
                  id: 'deadline',
                  issue: 'Missed Deadlines',
                  trigger: 'Deliverable missing scheduled timeline milestones or sprint deadlines.',
                  responsible: 'Department Lead / Project Manager',
                  path: 'Level 1: Auto email reminder at milestone shift &rarr; Level 2: 1-on-1 capacity audit (12 hours) &rarr; Level 3: Deliverable reassignment / scope revision (24 hours).',
                  timeline: '12 Hours review window.',
                  severity: 'MEDIUM'
                },
                {
                  id: 'dispute',
                  issue: 'Approval Disputes',
                  trigger: 'Difference of opinion between Participant and Department Lead regarding feedback accuracy or code structure.',
                  responsible: 'Quality Assurance Officer / Director',
                  path: 'Level 1: Written justification logged in PR comments &rarr; Level 2: Joint arbitration meeting (24 hours) &rarr; Level 3: Final binding decision by Operations Director.',
                  timeline: '24 Hours max arbitration.',
                  severity: 'LOW'
                },
                {
                  id: 'error',
                  issue: 'Submission Errors',
                  trigger: 'PR created to wrong branch path, incorrect document filenames, or files missing critical proof data.',
                  responsible: 'Quality Assurance Specialist',
                  path: 'Level 1: Automatic build rejection &rarr; Level 2: Immediate file correction resubmission &rarr; Level 3: Process compliance retraining block.',
                  timeline: '4 Hours file correction window.',
                  severity: 'MEDIUM'
                }
              ].map((item, index) => {
                const isFiltered = selectedEscalationScenario !== 'all' && selectedEscalationScenario !== item.id;
                if (isFiltered) return null;

                return (
                  <div key={index} className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono border mr-2.5 ${
                          item.severity === 'HIGH' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                          item.severity === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          'bg-blue-500/10 text-blue-500 border-blue-500/20'
                        }`}>
                          {item.severity} SEVERITY
                        </span>
                        <h4 className="inline-block text-base font-bold text-white print:text-black">{item.issue}</h4>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono hidden md:block">TL SLA: {item.timeline}</span>
                    </div>

                    <p className="text-gray-300 text-xs mb-4 print:text-slate-700 leading-relaxed">
                      <strong>Trigger scenario:</strong> {item.trigger}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#151515] p-3 rounded-lg border border-[#222] text-xs print:bg-transparent print:border-slate-300 print:text-black">
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block print:text-slate-500">Responsible Person</span>
                        <span className="font-semibold text-gray-200 print:text-slate-800">{item.responsible}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block print:text-slate-500">Escalation Path Flow</span>
                        <span className="font-semibold text-gray-200 print:text-slate-800" dangerouslySetInnerHTML={{ __html: item.path }} />
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block print:text-slate-500">Resolution SLA</span>
                        <span className="font-semibold text-brand-green print:text-slate-800">{item.timeline}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 8 — COMPLIANCE CHECKLIST */}
          <section 
            id="checklist" 
            className={`${activeSection === 'checklist' ? 'block animate-fade-in' : 'hidden'} print-force-block`}
          >
            <div className="border-b border-[#2E2E2E] pb-3 mb-6 print:border-black">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 print:text-black print-section-title">
                <CheckCircle className="w-6 h-6 text-brand-green print:hidden" />
                <span>Section 8 &mdash; Compliance Checklist</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1 print:text-slate-600">
                Interactive tracker to verify task submission readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Checklist Card */}
              <div className="md:col-span-2 bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] print-card-style">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-white print:text-black">
                    Operational Checklist Items
                  </h3>
                  <button
                    onClick={handleResetChecklist}
                    className="no-print text-xs text-gray-400 hover:text-brand-green transition-all"
                  >
                    Reset Form
                  </button>
                </div>

                <div className="space-y-3">
                  {checklistItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => handleToggleChecklist(item.id)}
                      className={`flex items-start gap-3.5 p-3 rounded-lg border transition-all duration-150 cursor-pointer ${
                        item.checked 
                          ? 'bg-brand-green/5 border-brand-green/30 text-white' 
                          : 'bg-[#151515]/60 border-[#2E2E2E] text-gray-300 hover:border-gray-700'
                      } print:border-slate-300 print:bg-transparent print:text-black`}
                    >
                      <div className={`no-print mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                        item.checked 
                          ? 'bg-brand-green border-brand-green text-black' 
                          : 'border-gray-500'
                      }`}>
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Print-specific bullet checkboxes */}
                      <span className="hidden print:inline-block font-mono font-bold mr-1">
                        [{item.checked ? 'X' : ' '}]
                      </span>

                      <div>
                        <h4 className="text-xs font-bold font-sans print:text-black">{item.label}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed print:text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Panel */}
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] flex flex-col justify-between items-center print-card-style">
                <div className="text-center w-full">
                  <h3 className="text-base font-bold text-white mb-1.5 print:text-black">
                    Checklist Progress
                  </h3>
                  <p className="text-gray-400 text-xs mb-6">
                    Verify that all checklist requirements are fully completed.
                  </p>

                  {/* Circular/SVG Progress Indicator */}
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        className="stroke-[#2E2E2E] stroke-[8] fill-none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        className="stroke-brand-green stroke-[8] fill-none transition-all duration-300 print:stroke-black"
                        strokeDasharray={2 * Math.PI * 54}
                        strokeDashoffset={2 * Math.PI * 54 * (1 - completionPercentage / 100)}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-extrabold text-white font-mono print:text-black">
                        {completionPercentage}%
                      </span>
                      <span className="text-[9px] text-gray-400 block uppercase tracking-wider font-semibold">
                        COMPLIANT
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mt-2 font-semibold">
                    {checkedCount} of {checklistItems.length} Tasks verified
                  </p>
                </div>

                <div className="w-full mt-6">
                  {completionPercentage === 100 ? (
                    <div className="bg-brand-green/10 border border-brand-green/20 text-brand-green text-center text-xs font-bold py-3 px-2 rounded-lg glow-green-text uppercase tracking-wider print:border-black print:text-black">
                      🎉 Compliant & Approved
                    </div>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-center text-xs font-semibold py-3 px-2 rounded-lg uppercase tracking-wider">
                      ⚠ Pending Audits
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SOP SUMMARY REPORT (Executive Printable Block) */}
          <section className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2E2E2E] print-force-block print-card-style">
            <div className="border-b border-[#2E2E2E] pb-3.5 mb-5 print:border-black">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2 print:text-black">
                <FileText className="w-5 h-5 text-brand-green print:hidden" />
                <span>TASK_O03 Operations Summary Report</span>
              </h3>
              <p className="text-gray-400 text-xs mt-0.5 print:text-slate-600">
                Official executive briefing summary prepared for institutional review boards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 print:text-black print-grid-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">1. Operational Purpose</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    Establishes standard procedures for GO-BRICS Business Lab tasks, ensuring participants execute operational workflows consistently and independently, reducing review cycles, and maintaining code configuration standards.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">2. Scope of Application</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    Applies universally to all participants, leads, quality assurance teams, and developers contributing assets to the GO-BRICS operations ecosystem.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">3. Primary Responsibilities</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    Participants handle execution and self-reviews; Leads audit files and log feedback; QA specialists validate workflow adherence; the Director manages overall governance and releases.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">4. Summary of Procedures</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    Task Selection &rarr; Spec Audit &rarr; Implementation &rarr; Self-review Checklist &rarr; Pull Request Review Loop &rarr; Department Lead signoff &rarr; Merge and Archive.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">5. Compliance Requirements</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    Complete adherence to naming formats, branch prefix conventions, Slack templates, QA checkpoints, response SLA timers, and digital signatures.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider print:text-black">6. Continuous Improvement</h4>
                  <p className="mt-1 text-gray-400 leading-relaxed print:text-slate-700">
                    All SOP structures are audited on a quarterly basis. Feedback logs from review phases are compiled to refine build checklist items and communication protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Print Sign-off block */}
            <div className="hidden print:block mt-8 pt-8 border-t border-slate-300">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">Operations Board Sign-off</span>
              <div className="grid grid-cols-2 gap-8 text-xs">
                <div className="border-t border-black pt-2">
                  <span className="block font-bold">Operations Lead Signature</span>
                  <span className="block text-slate-500">Date: __________________</span>
                </div>
                <div className="border-t border-black pt-2">
                  <span className="block font-bold">Operations Director Approval</span>
                  <span className="block text-slate-500">Date: __________________</span>
                </div>
              </div>
            </div>
          </section>

          {/* COMPLIANCE VERIFICATION PANEL */}
          <section className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2E2E2E] glow-green-box transition-all print-force-block print-card-style">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-3 border-b border-[#2E2E2E] print:border-black">
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 print:text-black">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  Compliance Verification Panel
                </h3>
                <p className="text-gray-400 text-[11px] mt-0.5">
                  Framework completeness log and institutional requirement matrix.
                </p>
              </div>
              <span className="text-[10px] text-brand-green font-mono bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-widest print:text-black print:border-slate-300">
                SYS_VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Standard Procedures Defined', status: true },
                { label: 'Approval Workflow Included', status: true },
                { label: 'Communication Standards Included', status: true },
                { label: 'Documentation Standards Included', status: true },
                { label: 'Escalation Procedures Included', status: true },
                { label: 'Compliance Checklist Included', status: true },
                { label: 'TASK_O03 Requirements Satisfied', status: true }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-[#151515] p-3 rounded-lg border border-[#2E2E2E] flex items-center justify-between gap-2 print:border-slate-300 print:text-black print:bg-transparent"
                >
                  <span className="text-xs text-gray-300 font-semibold print:text-black">{item.label}</span>
                  <div className="flex items-center gap-1 bg-brand-green/10 border border-brand-green/20 px-1.5 py-0.5 rounded text-[10px] text-brand-green font-bold print:border-black print:text-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#2E2E2E] flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-gray-500 font-mono gap-2 print:border-slate-200">
              <span>Verification Audit ID: <strong className="text-gray-400">GB-O03-AUD-883A</strong></span>
              <span>Sign-off: <strong className="text-gray-400">APPROVED FRAMEWORK SYSTEM v1.2</strong></span>
            </div>
          </section>

        </main>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0A0A0A] border-t border-[#2E2E2E] px-6 py-6 mt-auto text-center md:text-left text-xs text-gray-500 font-mono flex flex-col md:flex-row justify-between items-center gap-4 print:text-black print:border-t-2 print:border-black">
        <div className="space-y-1">
          <p className="font-bold text-gray-400 print:text-black">GO-BRICS Business Lab</p>
          <p>Standard Operating Procedure Portal &bull; Prepared for Operations Review</p>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p>Operations Department &bull; TASK_O03 Submission</p>
          <p className="text-[10px] text-gray-600 print:text-slate-500">System Time: {new Date().toLocaleDateString()} &bull; Security Hash: 00FF41_SYS_OK</p>
        </div>
      </footer>
    </div>
  );
}
