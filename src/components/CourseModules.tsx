import React from 'react';
import { Leaf, BarChart2, Truck, DollarSign, ShieldAlert, Globe, Users, Trophy } from 'lucide-react';

interface ModuleCardProps {
  number: number;
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  deliverable: string;
  accent: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  number,
  id,
  icon,
  title,
  subtitle,
  description,
  objectives,
  deliverable,
  accent,
}) => (
  <section id={id} className="py-16 lg:py-20 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Module Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-2xl text-white shadow-md shrink-0"
              style={{ background: accent }}
            >
              {icon}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Module {number}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 font-display leading-tight">
            {title}
          </h2>
          <p className="text-sm font-medium text-zinc-500">{subtitle}</p>
          <p className="text-sm text-zinc-600 leading-relaxed">{description}</p>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm"
            style={{ background: accent }}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Deliverable: {deliverable}</span>
          </div>
        </div>

        {/* Right: Learning Objectives */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5">
              Learning Objectives
            </h3>
            <div className="space-y-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                    style={{ background: accent }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const CourseModules: React.FC = () => {
  const modules: Omit<ModuleCardProps, 'number'>[] = [
    {
      id: 'sustainability-audit',
      icon: <Leaf className="w-5 h-5" />,
      title: 'Sustainability Audit of a Startup',
      subtitle: 'Evaluate environmental and social footprint',
      description:
        'Conduct a structured sustainability audit of an early-stage startup. Identify gaps in environmental stewardship, social responsibility, and governance practices using established ESG frameworks.',
      objectives: [
        'Understand the components of a sustainability audit and why they matter for modern startups',
        'Apply industry-standard assessment tools (GRI, B Corp framework) to evaluate a real or hypothetical company',
        'Identify key sustainability risks and low-hanging fruit opportunities for early intervention',
        'Present findings in a structured audit report with a prioritized action matrix',
      ],
      deliverable: 'Sustainability Audit Report',
      accent: '#16a34a',
    },
    {
      id: 'business-model',
      icon: <BarChart2 className="w-5 h-5" />,
      title: 'Scalable Business Model Redesign',
      subtitle: 'Design for exponential, sustainable growth',
      description:
        'Examine existing business model canvases and redesign them to unlock scalability without sacrificing sustainability. Explore how leading companies have pivoted their models to scale responsibly.',
      objectives: [
        'Master the Business Model Canvas and Lean Canvas frameworks with a sustainability lens',
        'Identify bottlenecks and inflexibilities in a given business model that prevent scale',
        'Propose a redesigned model incorporating circular economy principles and resource efficiency',
        'Validate the redesigned model with data-driven market sizing and unit economics',
      ],
      deliverable: 'Redesigned Business Model Canvas',
      accent: '#7c3aed',
    },
    {
      id: 'supply-chain',
      icon: <Truck className="w-5 h-5" />,
      title: 'Supply Chain & Operations Scaling Plan',
      subtitle: 'Build resilient, scalable supply networks',
      description:
        'Map the end-to-end supply chain of a scaling company and design a robust operations plan that supports 10x growth. Incorporate supplier diversity, ethical sourcing, and climate-resilient logistics.',
      objectives: [
        'Map and analyze the current supply chain for inefficiencies, vulnerabilities, and sustainability gaps',
        'Design a supplier diversification and ethical sourcing strategy aligned with ESG standards',
        'Build an operations scaling roadmap covering procurement, logistics, warehousing, and last-mile delivery',
        'Calculate carbon footprint of operations and propose a net-zero logistics pathway',
      ],
      deliverable: 'Supply Chain Scaling Roadmap',
      accent: '#0284c7',
    },
    {
      id: 'financial',
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Financial Projections for Scaling',
      subtitle: 'Model the economics of exponential growth',
      description:
        'Build comprehensive, data-backed financial models that capture the cost structure, revenue potential, and capital needs of a startup scaling from seed to Series B and beyond.',
      objectives: [
        'Build a three-statement financial model (P&L, Balance Sheet, Cash Flow) for a scaling startup',
        'Model revenue scenarios (pessimistic, base, optimistic) using cohort analysis and unit economics',
        'Identify key funding milestones and construct a capital allocation plan for sustainable growth',
        'Perform sensitivity analysis and present investor-ready financial projections with ₹ denomination',
      ],
      deliverable: 'Investor-Ready Financial Model',
      accent: '#b45309',
    },
    {
      id: 'risk-assessment',
      icon: <ShieldAlert className="w-5 h-5" />,
      title: 'Risk Assessment & Mitigation Roadmap',
      subtitle: 'Anticipate, quantify, and neutralize threats',
      description:
        'Develop a comprehensive risk register for a scaling startup, covering market, operational, regulatory, and ESG risks. Build a dynamic mitigation roadmap that evolves with business growth.',
      objectives: [
        'Identify and categorize risks across market, operational, regulatory, reputational, and ESG dimensions',
        'Apply probability-impact matrices and Monte Carlo simulations to quantify risk exposure',
        'Design mitigation strategies and contingency playbooks for the top 10 identified risks',
        'Build a living risk governance framework that integrates into quarterly board reporting',
      ],
      deliverable: 'Risk Register & Mitigation Roadmap',
      accent: '#dc2626',
    },
    {
      id: 'esg',
      icon: <Globe className="w-5 h-5" />,
      title: 'ESG Integration & Impact Measurement',
      subtitle: 'Embed ESG into strategy and measure real impact',
      description:
        'Learn to integrate ESG (Environmental, Social, Governance) principles into core business strategy. Build measurement frameworks that go beyond compliance to demonstrate authentic stakeholder value.',
      objectives: [
        'Understand global ESG disclosure frameworks: GRI, SASB, TCFD, and UN SDGs',
        'Design an ESG materiality assessment to identify the most relevant ESG topics for the business',
        'Build a KPI dashboard for tracking ESG performance across all three pillars in real-time',
        'Develop an impact narrative and reporting template aligned with investor and consumer expectations',
      ],
      deliverable: 'ESG Strategy & Impact Dashboard',
      accent: '#059669',
    },
    {
      id: 'team-culture',
      icon: <Users className="w-5 h-5" />,
      title: 'Team & Culture Scaling Exercise',
      subtitle: 'Preserve culture while scaling people and structure',
      description:
        `Explore the human side of scaling. Design organizational structures, hiring frameworks, and cultural rituals that preserve a startup's DNA while enabling 10x headcount growth.`,
      objectives: [
        'Analyze how organizational culture shifts during hyper-growth and what founders can do to preserve it',
        'Design a hiring-for-values framework that scales talent acquisition without diluting culture',
        'Build a leadership pipeline and succession plan for key roles critical to scaling',
        'Create an employee value proposition (EVP) that attracts mission-aligned talent in a competitive market',
      ],
      deliverable: 'Culture & Organizational Scaling Blueprint',
      accent: '#d97706',
    },
    {
      id: 'final-project',
      icon: <Trophy className="w-5 h-5" />,
      title: 'Final Project',
      subtitle: 'Synthesize all modules into a complete scaling strategy',
      description:
        'Bring together everything learned across the 8 modules to build a comprehensive, investor-ready Sustainable Scaling Strategy for a real or hypothetical startup. Present your strategy to a panel of mentors and peers.',
      objectives: [
        'Integrate sustainability audit, business model, supply chain, financial, and ESG work into a single strategy document',
        'Conduct stakeholder interviews and incorporate feedback to refine your recommendations',
        'Prepare and deliver a 20-minute pitch presentation backed by data and visual storytelling',
        'Receive structured peer and mentor feedback and submit a final revised strategy document',
      ],
      deliverable: 'Comprehensive Sustainable Scaling Strategy',
      accent: '#1d4ed8',
    },
  ];

  return (
    <>
      {modules.map((mod, idx) => (
        <ModuleCard key={mod.id} number={idx + 1} {...mod} />
      ))}
    </>
  );
};
