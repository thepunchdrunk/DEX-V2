// DEX — MOCK DATA & CONSTANTS
// "DEX" Employee Experience Platform


import {
  UserProfile,
  GreenLightCheck,
  MicroScenario,
  UnwrittenRule,
  CriticalPartner,
  DailyCard,
  ContextAnchorCard,
  DomainEdgeCard,
  MicroSkillCard,
  SimulatorChallenge,
  SkillBranch,
  MarketGapCard,
} from '@/types';

// ----------------------------------------------------------------------------
// USER PROFILE
// ----------------------------------------------------------------------------
export const MOCK_USER: UserProfile = {
  id: 'user-001',
  name: 'Alex Thompson',
  email: 'alex.thompson@company.com',
  jobId: 'JOB-QA-SR-001',
  jobTitle: 'Senior QA Engineer',
  department: 'Engineering',
  location: 'Building A, Floor 3',
  startDate: '2024-01-22',
  manager: 'Sarah Chen',
  avatar: undefined,
  onboardingDay: 5,
  onboardingComplete: true,
  dayProgress: {
    0: { day: 0, completed: true, tasks: [] },
    1: { day: 1, completed: true, tasks: [] },
    2: { day: 2, completed: true, tasks: [] },
    3: { day: 3, completed: true, tasks: [] },
    4: { day: 4, completed: true, tasks: [] },
    5: { day: 5, completed: true, tasks: [] },
  },
  roleCategory: 'DESK',
  role: 'EMPLOYEE',
};

// ----------------------------------------------------------------------------
// DAY 1: READINESS CHECK
// ----------------------------------------------------------------------------
export const GREEN_LIGHT_CHECKS: GreenLightCheck[] = [
  {
    id: 'hw-laptop',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Verify Laptop',
=======
    label: 'Laptop',
>>>>>>> new:constants.ts
    category: 'HARDWARE',
    status: 'PASS',
    details: 'MacBook Pro 14" - Ready',
    icon: '💻',
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'hw-monitor',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Setup Monitor',
=======
    label: 'Monitor',
>>>>>>> new:constants.ts
    category: 'HARDWARE',
    status: 'PASS',
    details: 'Dell 27" 4K - Shipped',
    icon: '🖥️',
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'sw-email',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Activate Email',
=======
    label: 'Email',
>>>>>>> new:constants.ts
    category: 'SOFTWARE',
    status: 'PASS',
    details: 'Active',
    icon: '📧',
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
  {
    id: 'sw-slack',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Join Slack',
=======
    label: 'Slack',
>>>>>>> new:constants.ts
    category: 'SOFTWARE',
    status: 'PASS',
    details: 'Channels added',
    icon: '💬',
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'sw-jira',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Access Jira',
=======
    label: 'Jira',
>>>>>>> new:constants.ts
    category: 'SOFTWARE',
    status: 'CHECKING',
    details: 'Setting up...',
    icon: '📋',
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'fac-badge',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Collect Badge',
=======
    label: 'ID Badge',
>>>>>>> new:constants.ts
    category: 'FACILITY',
    status: 'PASS',
    details: 'Ready at Security',
    icon: '🪪',
  },
  {
    id: 'hw-safety-kit',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Check Safety Kit',
=======
    label: 'Safety Kit',
>>>>>>> new:constants.ts
    category: 'HARDWARE',
    status: 'PASS',
    details: 'In Locker 42',
    icon: '🦺',
    roleCategories: ['FRONTLINE'],
  },
  {
    id: 'hw-tablet-pro',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Pickup Tablet',
=======
    label: 'Tablet',
>>>>>>> new:constants.ts
    category: 'HARDWARE',
    status: 'PASS',
    details: 'iPad Pro - Ready',
    icon: '📱',
    roleCategories: ['FRONTLINE'],
  },
  {
    id: 'hw-badge-rfid',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Test RFID Access',
=======
    label: 'RFID Badge',
>>>>>>> new:constants.ts
    category: 'FACILITY',
    status: 'PASS',
    details: 'Active',
    icon: '🆔',
    roleCategories: ['FRONTLINE', 'HYBRID'],
  },
  {
    id: 'hw-stipend',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Claim Stipend',
=======
    label: 'Wich Stipend',
>>>>>>> new:constants.ts
    category: 'HARDWARE',
    status: 'PASS',
    details: '$500 credit',
    icon: '💰',
    roleCategories: ['REMOTE'],
  },


  {
    id: 'fac-parking',
<<<<<<< HEAD:src/config/constants.ts
    label: 'Confirm Parking',
=======
    label: 'Parking',
>>>>>>> new:constants.ts
    category: 'FACILITY',
    status: 'PASS',
    details: 'Spot #B-102',
    icon: '🅿️',
  },
];

// ----------------------------------------------------------------------------
// DAY 2: CULTURE SCENARIOS
// ----------------------------------------------------------------------------
export const MICRO_SCENARIOS: MicroScenario[] = [
  {
    id: 'scenario-1',
    title: 'Speed vs. Quality',
    description:
      "A feature is 90% done but has a small bug. The deadline is today.",
    culturalDimension: 'SPEED_VS_PERFECTION',
    choices: [
      {
        id: 'choice-1a',
        text: 'Ship it, fix it later.',
        isRecommended: true,
        feedback:
          "Right call. We value shipping fast. Just log the bug.",
      },
      {
        id: 'choice-1b',
        text: 'Wait until it\'s perfect.',
        isRecommended: false,
        feedback:
          "We prefer speed over perfection. Ship it with a note.",
      },
    ],
  },
  {
    id: 'scenario-2',
    title: 'Reaching Out',
    description:
      "You need to ask a Director a question, but they seem busy.",
    culturalDimension: 'HIERARCHY_VS_FLAT',
    choices: [
      {
        id: 'choice-2a',
        text: 'Just message them.',
        isRecommended: true,
        feedback:
          "Exactly. We're a flat organization. anyone can talk to anyone.",
      },
      {
        id: 'choice-2b',
        text: 'Ask your manager first.',
        isRecommended: false,
        feedback:
          "No need for that. Just reach out directly!",
      },
    ],
  },
  {
    id: 'scenario-3',
    title: 'First Day Outfit',
    description:
      "Not sure what to wear to the office?",
    culturalDimension: 'FORMAL_VS_CASUAL',
    choices: [
      {
        id: 'choice-3a',
        text: 'Suit and tie.',
        isRecommended: false,
        feedback:
          "You'll feel overdressed. We're pretty casual.",
      },
      {
        id: 'choice-3b',
        text: 'Jeans and a nice top.',
        isRecommended: true,
        feedback:
          "Perfect. Comfortable but presentable.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// DAY 2: UNWRITTEN RULES
// ----------------------------------------------------------------------------
export const UNWRITTEN_RULES: UnwrittenRule[] = [
  {
    id: 'ur-1',
    category: 'COMMUNICATION',
    question: 'Slack vs. Email?',
    answer: 'Slack for quick chat. Email for official stuff.',
    confidence: 'HIGH',
    keywords: ['slack', 'email', 'communication', 'message', 'chat'],
  },
  {
    id: 'ur-2',
    category: 'MEETINGS',
    question: 'Do I have to go to meetings?',
    answer: 'Try to, unless they are optional.',
    confidence: 'MEDIUM',
    keywords: ['meeting', 'attendance', 'mandatory', 'optional', 'calendar'],
  },
  {
    id: 'ur-3',
    category: 'WORK_LIFE',
    question: 'Working hours?',
    answer: 'Usually 10am-3pm are core hours. Flexible otherwise.',
    confidence: 'HIGH',
    keywords: ['hours', 'working hours', 'schedule', 'time', 'start', 'end'],
  },
  {
    id: 'ur-4',
    category: 'DRESS_CODE',
    question: 'What to wear?',
    answer: 'Casual is fine. Dress up for clients.',
    confidence: 'HIGH',
    keywords: ['dress', 'clothes', 'wear', 'attire', 'clothing'],
  },
  {
    id: 'ur-5',
    category: 'REMOTE',
    question: 'Can I WFH?',
    answer: 'Yes, we are hybrid. Usually 3 days in office.',
    confidence: 'HIGH',
    keywords: ['remote', 'home', 'wfh', 'hybrid', 'office'],
  },
];

// ----------------------------------------------------------------------------
// DAY 4: CRITICAL 5 PARTNERS
// ----------------------------------------------------------------------------
export const CRITICAL_PARTNERS: CriticalPartner[] = [
  {
    id: 'partner-1',
    name: 'Marcus Williams',
    title: 'Lead Developer',
    department: 'Engineering',
    relationshipType: 'CROSS_FUNCTIONAL',
    reason:
      "Marcus leads the API team. Good to know for testing.",
    icebreakerDraft:
      "Hi Marcus! I'm Alex, new in QA. Would love to chat about the API. Coffee?",
    platform: 'SLACK',
    connected: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
  {
    id: 'partner-2',
    name: 'Priya Sharma',
    title: 'Product Manager',
    department: 'Product',
    relationshipType: 'STAKEHOLDER',
    reason:
      'Priya owns the roadmap. Helps with priorities.',
    icebreakerDraft:
      "Hi Priya! Alex here (QA). Want to sync on the roadmap? Free for a quick intro?",
    platform: 'TEAMS',
    connected: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
  {
    id: 'partner-3',
    name: 'Jordan Lee',
    title: 'DevOps Engineer',
    department: 'Platform',
    relationshipType: 'CROSS_FUNCTIONAL',
    reason:
      'Jordan handles the pipelines. Key contact for automation.',
    icebreakerDraft:
      "Hey Jordan! New QA here. Setting up automation, would love to sync. Chat soon?",
    platform: 'SLACK',
    connected: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
  {
    id: 'partner-4',
    name: 'Emily Chen',
    title: 'Staff QA Engineer',
    department: 'Engineering',
    relationshipType: 'MENTOR',
    reason:
      "Emily is a pro here. Great mentor figure.",
    icebreakerDraft:
      "Hi Emily! I'm Alex. Would love to learn from you. Mentoring chat?",
    platform: 'SLACK',
    connected: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
  {
    id: 'partner-5',
    name: 'David Park',
    title: 'Security Lead',
    department: 'Security',
    relationshipType: 'CROSS_FUNCTIONAL',
    reason:
      "Security is huge. David knows the drills.",
    icebreakerDraft:
      "Hi David! New QA. Want to learn about security checks. Free this week?",
    platform: 'TEAMS',
    connected: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
];

// ----------------------------------------------------------------------------
// DAILY DASHBOARD: DAILY 3 CARDS
// ----------------------------------------------------------------------------
export const MOCK_CONTEXT_ANCHOR: ContextAnchorCard = {
  id: 'card-anchor-1',
  slot: 'CONTEXT_ANCHOR',
  title: 'Q4 Sprint Velocity Report',
  description:
    'Engineering velocity dropped 12% last sprint. Root cause: unplanned security patches.',
  source: 'Engineering Weekly',
  sourceType: 'INTERNAL',
  timestamp: new Date().toISOString(),
  priority: 'HIGH',
  actionLabel: 'View Full Report',
  actionUrl: '#',
  read: false,
  flagged: false,
  kpiType: 'DEPARTMENT',
  kpiValue: '42 story points',
  kpiChange: -12,
  roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
};

export const MOCK_DOMAIN_EDGE: DomainEdgeCard = {
  id: 'card-edge-1',
  slot: 'DOMAIN_EDGE',
  title: 'Playwright 2.0 Released',
  description:
    'Major update to Playwright testing framework. New features: Component testing, API mocking improvements.',
  source: 'Tech Radar',
  sourceType: 'EXTERNAL',
  timestamp: new Date().toISOString(),
  priority: 'MEDIUM',
  actionLabel: 'Read More',
  actionUrl: 'https://playwright.dev',
  read: false,
  flagged: false,
  industry: 'Software Testing',
  relevanceScore: 92,
  trendType: 'TECHNOLOGY',
  roleCategories: ['DESK', 'REMOTE'],
};

export const MOCK_MICRO_SKILL: MicroSkillCard = {
  id: 'card-skill-1',
  slot: 'MICRO_SKILL',
  title: 'Jira Keyboard Shortcuts',
  description:
    'Try these shortcuts: "C" to create issue, "J/K" to navigate, "E" to edit.',
  source: 'DEX',
  sourceType: 'SYSTEM',
  timestamp: new Date().toISOString(),
  priority: 'LOW',
  actionLabel: 'Practice Now',
  read: false,
  flagged: false,
  frictionSource: 'Jira',
  frictionMetric: '2.5 hours spent',
  tipType: 'SHORTCUT',
  roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
};



export const MOCK_FRONTLINE_SAFETY: DailyCard = {
  id: 'card-front-1',
  slot: 'DOMAIN_EDGE',
  title: 'New Safety Protocol: Zone 4',
  description: 'Updated guidelines for high-pressure valve maintenance are now in effect.',
  source: 'Facility Ops',
  sourceType: 'INTERNAL',
  timestamp: new Date().toISOString(),
  priority: 'HIGH',
  actionLabel: 'Review Protocol',
  read: false,
  flagged: false,
  roleCategories: ['FRONTLINE'],
};

export const MOCK_REMOTE_SUCCESS: DailyCard = {
  id: 'card-remote-1',
  slot: 'DOMAIN_EDGE',
  title: 'Async Mastery: Slack Threads',
  description: 'Protip: Using Slack threads for all technical discussions increases team visibility by 40% for remote members.',
  source: 'Remote Excellence',
  sourceType: 'EXTERNAL',
  timestamp: new Date().toISOString(),
  priority: 'MEDIUM',
  actionLabel: 'Read Best Practices',
  read: false,
  flagged: false,
  roleCategories: ['REMOTE'],
};



export const MOCK_DAILY_CARDS: DailyCard[] = [
  MOCK_CONTEXT_ANCHOR,
  MOCK_DOMAIN_EDGE,
  MOCK_MICRO_SKILL,
  MOCK_FRONTLINE_SAFETY,
  MOCK_REMOTE_SUCCESS,
];

// ----------------------------------------------------------------------------
// WEDNESDAY SIMULATOR
// ----------------------------------------------------------------------------
export const MOCK_SIMULATOR: SimulatorChallenge = {
  id: 'sim-1',
  type: 'FIND_THE_BUG',
  title: 'Find the Bug: Off-by-One Error',
  description:
    'This function should return the last N elements of an array. Can you spot the bug?',
  durationMinutes: 3,
  content: {
    language: 'javascript',
    code: `function getLastN(arr, n) {
  if (n <= 0) return [];
  if (n >= arr.length) return arr;
  return arr.slice(arr.length - n - 1);
}

// Expected: [4, 5]
// Actual: [3, 4, 5]
console.log(getLastN([1,2,3,4,5], 2));`,
    bugLine: 4,
    bugDescription:
      'Off-by-one error in slice. Should be `arr.slice(arr.length - n)` not `arr.slice(arr.length - n - 1)`',
    hints: [
      'Check the slice parameters carefully',
      'What does arr.length - n - 1 actually return?',
    ],
  },
  completed: false,
};

// ----------------------------------------------------------------------------
// SKILL TREE
// ----------------------------------------------------------------------------
export const MOCK_SKILL_TREE: SkillBranch[] = [
  {
    id: 'skill-testing',
    name: 'Software Testing',
    category: 'DOMAIN',
    mastery: 3,
    health: 'THRIVING',
    lastVerified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    daysSinceVerified: 7,
    decayThreshold: 90,
    children: [
      {
        id: 'skill-automation',
        name: 'Test Automation',
        category: 'TECHNICAL',
        mastery: 3,
        health: 'THRIVING',
        lastVerified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        daysSinceVerified: 3,
        decayThreshold: 90,
        parentId: 'skill-testing',
        children: [
          {
            id: 'skill-playwright',
            name: 'Playwright',
            category: 'TOOL',
            mastery: 2,
            health: 'HEALTHY',
            lastVerified: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            daysSinceVerified: 14,
            decayThreshold: 90,
            parentId: 'skill-automation',
            children: [],
          },
          {
            id: 'skill-selenium',
            name: 'Selenium',
            category: 'TOOL',
            mastery: 3,
            health: 'FADING',
            lastVerified: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
            daysSinceVerified: 75,
            decayThreshold: 90,
            parentId: 'skill-automation',
            children: [],
          },
        ],
      },
      {
        id: 'skill-manual',
        name: 'Manual Testing',
        category: 'DOMAIN',
        mastery: 3,
        health: 'THRIVING',
        lastVerified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        daysSinceVerified: 2,
        decayThreshold: 90,
        parentId: 'skill-testing',
        children: [],
      },
    ],
  },
  {
    id: 'skill-programming',
    name: 'Programming',
    category: 'TECHNICAL',
    mastery: 2,
    health: 'HEALTHY',
    lastVerified: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    daysSinceVerified: 21,
    decayThreshold: 90,
    children: [
      {
        id: 'skill-python',
        name: 'Python',
        category: 'TECHNICAL',
        mastery: 2,
        health: 'HEALTHY',
        lastVerified: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        daysSinceVerified: 21,
        decayThreshold: 90,
        parentId: 'skill-programming',
        children: [],
      },
      {
        id: 'skill-javascript',
        name: 'JavaScript',
        category: 'TECHNICAL',
        mastery: 1,
        health: 'FADING',
        lastVerified: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
        daysSinceVerified: 80,
        decayThreshold: 90,
        parentId: 'skill-programming',
        children: [],
      },
    ],
  },
  {
    id: 'skill-soft',
    name: 'Soft Skills',
    category: 'SOFT',
    mastery: 2,
    health: 'HEALTHY',
    lastVerified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    daysSinceVerified: 30,
    decayThreshold: 90,
    children: [
      {
        id: 'skill-communication',
        name: 'Communication',
        category: 'SOFT',
        mastery: 2,
        health: 'HEALTHY',
        lastVerified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        daysSinceVerified: 10,
        decayThreshold: 90,
        parentId: 'skill-soft',
        children: [],
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// MARKET GAP (ROLE DRIFT)
// ----------------------------------------------------------------------------
export const MOCK_MARKET_GAP: MarketGapCard = {
  id: 'gap-1',
  skillName: 'AI-Assisted Testing',
  demandScore: 87,
  jobPostingsCount: 1247,
  topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
  suggestedResources: [
    'AI in Software Testing - LinkedIn Learning',
    'GitHub Copilot for Test Generation',
    'Testim.io AI Features',
  ],
  detectedAt: new Date().toISOString(),
};



// ----------------------------------------------------------------------------
// THEME COLORS
// ----------------------------------------------------------------------------
export const THEME_COLORS = {
  onboarding: {
    primary: '#3B82F6', // Blue
    secondary: '#60A5FA',
    accent: '#93C5FD',
    background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)',
  },
  performance: {
    primary: '#F59E0B', // Gold
    secondary: '#FBBF24',
    accent: '#FCD34D',
    background: 'linear-gradient(135deg, #451A03 0%, #0F172A 100%)',
  },
};

// ============================================================================
// DAY 0: PREBOARDING ORCHESTRATION
// ============================================================================
import {
  PreboardingItem,
  Day1ReadinessScore,
  WorkEssential,
  DailyLifeLogistic,
  PayrollBenefitsItem,
  DigitalReadinessItem,
  SafetyWellbeingItem,
  RoleBasedScenario,
  CommunicationNorm,
  MeetingCultureRule,
  DecisionBoundary,
  CoffeeChatSuggestion,
  WorkTool,
  FirstTaskSimulation,
  FirstContribution,
  ProductivityTip,
  Critical5Contact,
  StakeholderNode,
  TeamRitual,
  CollaborationNorm,
  PeerCohort,
  ManagerSignoff,
  EthicsModule,
  Day1Module,
  EscalationPath,
  TimeHorizon,
} from '@/types';

export const PREBOARDING_ITEMS: PreboardingItem[] = [
  {
    id: 'pb-identity',
    category: 'IDENTITY',
    label: 'Corporate Identity Created',
    description: 'SSO account and email provisioned',
    status: 'READY',
    responsibleTeam: 'IT Identity',
    icon: '🔐',
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
  {
    id: 'pb-device',
    category: 'DEVICE',
    label: 'Laptop Provisioned',
    description: 'MacBook Pro 14" configured and ready',
    status: 'READY',
    responsibleTeam: 'IT Hardware',
    icon: '💻',
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'pb-mdm',
    category: 'DEVICE',
    label: 'MDM Enrollment',
    description: 'Mobile device management configured',
    status: 'IN_PROGRESS',
    responsibleTeam: 'IT Security',
    estimatedCompletion: '2024-01-21',
    icon: '📱',
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
  {
    id: 'pb-safety',
    category: 'IDENTITY',
    label: 'Safety Certification',
    description: 'Verify OSHA/Safety training status for Zone 4',
    status: 'PENDING',
    responsibleTeam: 'Safety Ops',
    icon: '🛡️',
    roleCategories: ['FRONTLINE'],
  },
  {
    id: 'pb-ppe',
    category: 'DEVICE',
    label: 'PPE Kit Sizing',
    description: 'Confirm sizes for steel-toe boots & hi-vis gear',
    status: 'IN_PROGRESS',
    responsibleTeam: 'Facility Ops',
    icon: '🦺',
    roleCategories: ['FRONTLINE'],
  },
  {
    id: 'pb-shift',
    category: 'TEAM',
    label: 'Shift Assignment',
    description: 'Review initial schedule and Zone 4 locker',
    status: 'READY',
    responsibleTeam: 'Shift Manager',
    icon: '📅',
    roleCategories: ['FRONTLINE'],
  },
  {
    id: 'pb-badge',
    category: 'FACILITY',
    label: 'Building Access Badge',
    description: 'Badge printed and activated',
    status: 'READY',
    responsibleTeam: 'Facilities',
    icon: '🪪',
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
  {
    id: 'pb-parking',
    category: 'FACILITY',
    label: 'Parking Access',
    description: 'Parking permit registered',
    status: 'PENDING',
    responsibleTeam: 'Facilities',
    icon: '🅿️',
    roleCategories: ['DESK'],
  },

  {
    id: 'pb-payroll',
    category: 'FINANCE',
    label: 'Payroll Profile',
    description: 'Bank details and tax information',
    status: 'PENDING',
    responsibleTeam: 'HR Finance',
    icon: '💰',
  },
  {
    id: 'pb-expense',
    category: 'FINANCE',
    label: 'Expense Account',
    description: 'Corporate expense system access',
    status: 'READY',
    responsibleTeam: 'Finance',
    icon: '💳',
  },
  {
    id: 'pb-buddy',
    category: 'TEAM',
    label: 'Buddy Assigned',
    description: 'Emily Chen assigned as your buddy',
    status: 'READY',
    responsibleTeam: 'HR',
    icon: '🤝',
  },
  {
    id: 'pb-manager-meeting',
    category: 'TEAM',
    label: 'First Manager Meeting',
    description: 'Scheduled for Day 1, 10:00 AM',
    status: 'READY',
    responsibleTeam: 'Manager',
    icon: '📅',
  },
];

export const MOCK_READINESS_SCORE: Day1ReadinessScore = {
  overallScore: 85,
  criticalItemsReady: 8,
  criticalItemsTotal: 10,
  blockedItems: [],
  lastUpdated: '2024-01-20T10:00:00Z',
};

// ============================================================================
// DAY 1: EXPANDED LIFE & WORK SETUP
// ============================================================================
export const WORK_ESSENTIALS: WorkEssential[] = [
  {
    id: 'we-leave',
    category: 'LEAVE',
    title: 'Leave Application',
    description: 'Learn how to apply for vacation, sick leave, and PTO',
    interactiveDemo: true,
    completed: false,
    demoSteps: [
      'Navigate to HR Portal → Time Off',
      'Select leave type from dropdown',
      'Choose dates and add optional notes',
      'Submit for manager approval',
      'Track status in "My Requests"',
    ],
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'we-expenses',
    category: 'EXPENSES',
    title: 'Expense Submission',
    description: 'Submit business expenses for reimbursement',
    interactiveDemo: true,
    completed: false,
    demoSteps: [
      'Open Expense app or portal',
      'Click "New Expense Report"',
      'Upload receipt photo',
      'Select expense category',
      'Submit - reimbursement in 5-7 business days',
    ],
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'we-holiday',
    category: 'HOLIDAY_CALENDAR',
    title: 'Holiday Calendar',
    description: 'View company holidays synced to your region',
    interactiveDemo: false,
    completed: false,
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
];

export const DAILY_LIFE_LOGISTICS: DailyLifeLogistic[] = [
  {
    id: 'dll-commute',
    category: 'COMMUTE',
    title: 'Commute Options',
    description: 'Shuttle, public transit subsidies, and bike storage',
    status: 'NOT_STARTED',
    actionLabel: 'View Commute Benefits',
  },
  {
    id: 'dll-parking',
    category: 'PARKING',
    title: 'Parking Registration',
    description: 'Register your vehicle for parking access',
    status: 'NOT_STARTED',
    actionLabel: 'Register Vehicle',
  },
  {
    id: 'dll-canteen',
    category: 'CANTEEN',
    title: 'Canteen & Meals',
    description: 'Meal card setup and first-day meal support',
    status: 'NOT_STARTED',
    actionLabel: 'View Cafeteria Info',
  },
  {
    id: 'dll-facilities',
    category: 'FACILITIES',
    title: 'Workspace Setup',
    description: 'Locker, meeting rooms, and workspace etiquette',
    status: 'NOT_STARTED',
    actionLabel: 'View Facility Guide',
  },
  {
    id: 'dll-wifi',
    category: 'WIFI_PRINTER',
    title: 'Wi-Fi & Printers',
    description: 'Connect to corporate Wi-Fi and printers',
    status: 'NOT_STARTED',
    actionLabel: 'Setup Guide',
  },
];

export const PAYROLL_BENEFITS_ITEMS: PayrollBenefitsItem[] = [
  {
    id: 'pb-paycycle',
    category: 'PAYROLL',
    title: 'Pay Cycle Overview',
    description: 'Monthly payment on the last working day',
    completed: false,
    requiresSignature: false,
  },
  {
    id: 'pb-payslip',
    category: 'PAYROLL',
    title: 'Payslip Access',
    description: 'Access your payslips via HR Portal',
    completed: false,
    requiresSignature: false,
  },
  {
    id: 'pb-tax',
    category: 'TAX',
    title: 'Tax Form (W-4)',
    description: 'Complete your tax withholding form',
    completed: false,
    requiresSignature: true,
  },
  {
    id: 'pb-insurance',
    category: 'INSURANCE',
    title: 'Health Insurance Overview',
    description: 'Medical, dental, and vision coverage',
    completed: false,
    requiresSignature: false,
  },
  {
    id: 'pb-dependents',
    category: 'DEPENDENT',
    title: 'Dependent Enrollment',
    description: 'Add family members to benefits',
    completed: false,
    requiresSignature: false,
  },
  {
    id: 'pb-claims',
    category: 'CLAIMS',
    title: 'Claims Process',
    description: 'How to submit and track insurance claims',
    completed: false,
    requiresSignature: false,
  },
];

export const DIGITAL_READINESS_ITEMS: DigitalReadinessItem[] = [
  {
    id: 'dr-sso',
    category: 'SSO',
    title: 'SSO Login Confirmation',
    description: 'Verify single sign-on is working',
    status: 'NOT_STARTED',
  },
  {
    id: 'dr-mfa',
    category: 'MFA',
    title: 'Multi-Factor Authentication',
    description: 'Set up authenticator app or security key',
    status: 'NOT_STARTED',
  },
  {
    id: 'dr-email',
    category: 'EMAIL',
    title: 'Email Access',
    description: 'Access Outlook and configure mobile',
    status: 'NOT_STARTED',
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'dr-collab',
    category: 'COLLABORATION',
    title: 'Collaboration Tools',
    description: 'Access Slack/Teams and join channels',
    status: 'NOT_STARTED',
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'dr-vpn',
    category: 'VPN',
    title: 'VPN Configuration',
    description: 'Set up VPN for remote access',
    status: 'NOT_STARTED',
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'dr-security',
    category: 'SECURITY_TRAINING',
    title: 'Security Awareness',
    description: 'Complete phishing awareness and incident reporting',
    status: 'NOT_STARTED',
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
];

export const SAFETY_WELLBEING_ITEMS: SafetyWellbeingItem[] = [
  {
    id: 'sw-emergency',
    category: 'EMERGENCY',
    title: 'Emergency Contacts',
    description: 'Building security, medical emergencies, IT support',
    acknowledged: false,
    roleCategories: ['DESK', 'REMOTE', 'FRONTLINE'],
  },
  {
    id: 'sw-evacuation',
    category: 'EVACUATION',
    title: 'Evacuation Procedures',
    description: 'Fire exits, assembly points, and safety protocols',
    acknowledged: false,
    roleCategories: ['DESK', 'REMOTE'],
  },

  {
    id: 'sw-health',
    category: 'HEALTH',
    title: 'Workplace Health Resources',
    description: 'EAP, wellness programs, and mental health support',
    acknowledged: false,
  },
  {
    id: 'sw-accessibility',
    category: 'ACCESSIBILITY',
    title: 'Accessibility Accommodations',
    description: 'Request workplace accommodations if needed',
    acknowledged: false,
  },
];

export const DAY1_MODULES: Day1Module[] = [
  {
    id: 'GREEN_LIGHT',
    title: 'System Readiness',
    description: 'Verify all your systems are ready',
    icon: '🚦',
    completed: false,
    items: [],
  },
  {
    id: 'WORK_ESSENTIALS',
    title: 'Work Essentials',
    description: 'Leave, expenses, and holidays',
    icon: '📋',
    completed: false,
    items: [],
  },
  {
    id: 'DAILY_LOGISTICS',
    title: 'Daily Life',
    description: 'Commute, parking, and facilities',
    icon: '🏢',
    completed: false,
    items: [],
  },
  {
    id: 'PAYROLL_BENEFITS',
    title: 'Payroll & Benefits',
    description: 'Pay, insurance, and claims',
    icon: '💰',
    completed: false,
    items: [],
  },
  {
    id: 'DIGITAL_READINESS',
    title: 'Digital Setup',
    description: 'SSO, MFA, and security',
    icon: '🔐',
    completed: false,
    items: [],
  },
  {
    id: 'SAFETY_WELLBEING',
    title: 'Safety & Wellbeing',
    description: 'Emergency procedures and health',
    icon: '🛡️',
    completed: false,
    items: [],
  },
  {
    id: 'PRIVACY_SETTINGS',
    title: 'Privacy Settings',
    description: 'Configure your data preferences',
    icon: '🔒',
    completed: false,
    items: [],
  },
];

// ============================================================================
// DAY 2: ENHANCED COMPANY CULTURE
// ============================================================================
export const ROLE_BASED_SCENARIOS: RoleBasedScenario[] = [
  ...MICRO_SCENARIOS.map(s => ({
    ...s,
    roleCategory: 'DESK' as const,
    difficulty: 'EASY' as const,
  })),

  {
    id: 'scenario-remote-1',
    title: 'Async Communication',
    description: 'Your teammate in a different timezone sends you a message at their 5 PM. You see it at your 9 AM.',
    culturalDimension: 'FORMAL_VS_CASUAL' as const,
    roleCategory: 'REMOTE',
    difficulty: 'EASY',
    choices: [
      {
        id: 'rm-choice-1a',
        text: 'Wait until they are online to respond synchronously',
        isRecommended: false,
        feedback: 'Waiting reduces productivity in distributed teams. Async communication is expected and efficient.',
      },
      {
        id: 'rm-choice-1b',
        text: 'Respond immediately with all needed context so they can act on it',
        isRecommended: true,
        feedback: 'Great! In remote work, front-loading context in async messages keeps everyone productive.',
      },
    ],
  },
  {
    id: 'scenario-frontline-1',
    title: 'Eyes on Safety',
    description: 'You notice a minor oil spill in Zone 3. It\'s not your assigned area for the shift.',
    culturalDimension: 'SPEED_VS_PERFECTION' as const,
    roleCategory: 'FRONTLINE',
    difficulty: 'MEDIUM',
    choices: [
      {
        id: 'fl-choice-1a',
        text: 'Report it immediately via Master Control',
        isRecommended: true,
        feedback: 'Correct! Safety is everyone\'s responsibility regardless of zone assignment.',
      },
      {
        id: 'fl-choice-1b',
        text: 'Continue to your area and assume the Zone 3 lead will see it',
        isRecommended: false,
        feedback: 'In our culture, "See something, say something" is the gold standard for safety.',
      },
    ],
  },
];

export const COMMUNICATION_NORMS: CommunicationNorm[] = [
  {
    id: 'cn-chat',
    channel: 'CHAT',
    useCase: 'Quick questions, informal updates, time-sensitive coordination',
    expectedResponseTime: '< 2 hours during work hours',
    urgencySignal: 'Use @mention for urgent, 🔴 emoji for critical',
    examples: {
      good: 'Hey @sarah, quick question: do we need the API key before the demo tomorrow?',
      bad: 'Hi. I need to ask you something. When you get a chance, can you call me?',
    },
  },
  {
    id: 'cn-email',
    channel: 'EMAIL',
    useCase: 'Formal communication, external parties, audit trail needed',
    expectedResponseTime: '24-48 hours',
    urgencySignal: '[URGENT] in subject line',
    examples: {
      good: 'Subject: [Action Required] Q4 Budget Approval by Friday\n\nHi Team, attached is the Q4 budget proposal...',
      bad: 'Subject: Hi\n\nI need something from you.',
    },
  },
  {
    id: 'cn-ticket',
    channel: 'TICKET',
    useCase: 'Feature requests, bug reports, IT support, trackable work',
    expectedResponseTime: 'Per SLA (usually 1-5 business days)',
    urgencySignal: 'Set priority level in ticket system',
    examples: {
      good: 'Title: [BUG] Login fails on Safari 17\nSteps to reproduce: 1. Open Safari 2. Navigate to...',
      bad: 'Title: It\'s broken\nDescription: Fix the thing',
    },
  },
  {
    id: 'cn-meeting',
    channel: 'MEETING',
    useCase: 'Complex discussions, brainstorming, relationship building',
    expectedResponseTime: 'RSVP within 24 hours',
    urgencySignal: 'Mark as high importance in calendar invite',
    examples: {
      good: 'Invite includes: agenda, pre-read, expected outcomes, 30 min duration',
      bad: '1 hour meeting with no agenda or context',
    },
  },
];

export const MEETING_CULTURE_RULES: MeetingCultureRule[] = [
  {
    id: 'mc-agenda',
    type: 'AGENDA',
    title: 'Every meeting needs an agenda',
    description: 'Share the agenda at least 1 hour before the meeting. No agenda, no attenda!',
  },
  {
    id: 'mc-decisions',
    type: 'DECISION_RECORDING',
    title: 'Document decisions immediately',
    description: 'The meeting organizer shares decisions and action items within 24 hours via email or Slack.',
  },
  {
    id: 'mc-prep',
    type: 'PREPARATION',
    title: 'Come prepared',
    description: 'Read pre-reads before the meeting. Meetings are for discussion, not information sharing.',
  },
  {
    id: 'mc-followup',
    type: 'FOLLOWUP',
    title: 'Action items have owners and deadlines',
    description: 'Every action item must have a single owner and a due date. Use the RAPID framework for decisions.',
  },
  {
    id: 'mc-punctuality',
    type: 'PUNCTUALITY',
    title: 'Start and end on time',
    description: 'Meetings start at :00 or :30. End 5 minutes early for bio breaks between meetings.',
  },
];

export const DECISION_BOUNDARIES: DecisionBoundary[] = [
  {
    id: 'db-independent',
    scope: 'INDEPENDENT',
    title: 'You can decide independently',
    examples: [
      'Day-to-day task prioritization',
      'Technical implementation approach for assigned work',
      'Scheduling your own meetings',
      'Small refactoring within your codebase area',
    ],
  },
  {
    id: 'db-manager',
    scope: 'MANAGER_APPROVAL',
    title: 'Check with your manager first',
    examples: [
      'Taking more than 3 days off',
      'Expenses over $100',
      'Changing project timelines',
      'External communications representing the company',
    ],
  },
  {
    id: 'db-cross-team',
    scope: 'CROSS_TEAM',
    title: 'Requires cross-team alignment',
    examples: [
      'Changing shared API contracts',
      'Modifying production infrastructure',
      'Updating shared design systems',
      'Changes affecting other teams\' roadmaps',
    ],
    escalationPath: 'Discuss in relevant Slack channel or schedule alignment meeting',
  },
  {
    id: 'db-executive',
    scope: 'EXECUTIVE',
    title: 'Requires leadership approval',
    examples: [
      'New vendor contracts over $10,000',
      'Hiring decisions',
      'Public announcements',
      'Significant architectural changes',
    ],
    escalationPath: 'Go through your manager → Director → VP as needed',
  },
];

export const ETHICS_MODULES: EthicsModule[] = [
  {
    id: 'em-respect',
    title: 'Respectful Workplace',
    description: 'Creating an inclusive and respectful environment',
    completed: false,
    scenarios: [
      {
        id: 'es-1',
        situation: 'A colleague makes an inappropriate joke about someone\'s accent during a meeting.',
        correctAction: 'Speak up in the moment if comfortable, or report to HR/manager afterward.',
        reportingPath: 'HR Portal → Report Concern, or speak with your manager confidentially',
      },
      {
        id: 'es-2',
        situation: 'You notice a teammate is consistently excluded from important meetings.',
        correctAction: 'Mention it to the meeting organizer or your manager as a potential oversight.',
        reportingPath: 'Direct conversation first, escalate to HR if pattern continues',
      },
    ],
  },
  {
    id: 'em-conflict',
    title: 'Conflict of Interest',
    description: 'Recognizing and disclosing conflicts',
    completed: false,
    scenarios: [
      {
        id: 'es-3',
        situation: 'Your friend\'s company is bidding on a contract you\'re evaluating.',
        correctAction: 'Immediately disclose the relationship to your manager and recuse yourself from the decision.',
        reportingPath: 'Ethics Portal → Conflict Disclosure Form',
      },
    ],
  },
];

export const COFFEE_CHAT_SUGGESTIONS: CoffeeChatSuggestion[] = [
  {
    id: 'ccs-1',
    personId: 'partner-4',
    personName: 'Emily Chen',
    personTitle: 'Staff QA Engineer',
    reason: 'Your assigned buddy - great for informal questions about team dynamics',
    suggestedTopics: ['Team traditions', 'Best lunch spots', 'Hidden features in our tools'],
    scheduled: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
  {
    id: 'ccs-2',
    personId: 'random-1',
    personName: 'Tom Martinez',
    personTitle: 'Product Designer',
    reason: 'Cross-functional perspective on how design and QA collaborate',
    suggestedTopics: ['Design handoff process', 'Accessibility testing', 'User feedback loops'],
    scheduled: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
  },
];

// ============================================================================
// DAY 3: TOOLS & WORKFLOW
// ============================================================================
export const WORK_TOOLS: WorkTool[] = [
  {
    id: 'tool-jira',
    name: 'Jira',
    icon: '📋',
    category: 'CORE',
    purpose: 'Manage tasks & bugs',
    upstreamTools: [],
    downstreamTools: ['tool-github', 'tool-slack'],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'jira-1', label: 'Create Issue', description: 'Log a new bug or task', shortcut: 'C' },
      { id: 'jira-2', label: 'Quick Search', description: 'Find any issue', shortcut: '/' },
      { id: 'jira-3', label: 'My Board', description: 'View your sprint board', shortcut: 'G then B' },
    ],
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    icon: '💻',
    category: 'CORE',
    purpose: 'Code & PRs',
    upstreamTools: ['tool-jira'],
    downstreamTools: ['tool-slack'],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'gh-1', label: 'Create PR', description: 'Open a pull request' },
      { id: 'gh-2', label: 'Review PR', description: 'Review teammate\'s code' },
      { id: 'gh-3', label: 'Check Actions', description: 'View CI/CD status' },
    ],
    roleCategories: ['DESK', 'REMOTE'],
  },
  {
    id: 'tool-slack',
    name: 'Slack',
    icon: '💬',
    category: 'CORE',
    purpose: 'Team chat & updates',
    upstreamTools: ['tool-jira', 'tool-github'],
    downstreamTools: [],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'slack-1', label: 'Quick Switch', description: 'Jump to any channel', shortcut: 'Cmd+K' },
      { id: 'slack-2', label: 'Thread Reply', description: 'Keep conversations organized', shortcut: 'T' },
      { id: 'slack-3', label: 'Remind Me', description: 'Set a reminder for later', shortcut: '/remind' },
    ],
  },
  {
    id: 'tool-confluence',
    name: 'Confluence',
    icon: '📖',
    category: 'SUPPORTING',
    purpose: 'Team docs',
    upstreamTools: [],
    downstreamTools: ['tool-jira'],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'conf-1', label: 'Search Docs', description: 'Find any documentation' },
      { id: 'conf-2', label: 'Create Page', description: 'Add new documentation' },
    ],
  },



  {
    id: 'tool-figma',
    name: 'Figma',
    icon: '🎨',
    category: 'SUPPORTING',
    purpose: 'Design files',
    upstreamTools: [],
    downstreamTools: ['tool-jira'],
    walkthroughCompleted: false,
    roleCategories: ['DESK', 'REMOTE', 'HYBRID'],
    quickActions: [
      { id: 'fig-1', label: 'View Designs', description: 'Browse latest mockups' },
      { id: 'fig-2', label: 'Leave Comment', description: 'Provide design feedback' },
    ],
  },
  {
    id: 'tool-salesforce',
    name: 'Salesforce',
    icon: '☁️',
    category: 'CORE',
    purpose: 'CRM and pipeline management',
    upstreamTools: [],
    downstreamTools: ['tool-slack'],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'sf-1', label: 'Search Lead', description: 'Find potential customers' },
      { id: 'sf-2', label: 'Add Opportunity', description: 'Track a new deal' },
    ],
    roleCategories: ['REMOTE', 'DESK'],
  },
  {
    id: 'tool-mrp',
    name: 'Master Control',
    icon: '🏭',
    category: 'CORE',
    purpose: 'Manufacturing resource planning and shift logs',
    upstreamTools: [],
    downstreamTools: [],
    walkthroughCompleted: false,
    quickActions: [
      { id: 'mrp-1', label: 'View Shift Schedule', description: 'See upcoming shift assignments' },
      { id: 'mrp-2', label: 'Log Incident', description: 'Report floor safety/prod issues' },
    ],
    roleCategories: ['FRONTLINE'],
  },
];

export const FIRST_TASK_SIMULATION_QA: FirstTaskSimulation = {
  id: 'fts-qa-1',
  roleCategory: 'DESK',
  title: 'Log Your First Bug',
  description: 'Practice logging a bug report in our staging Jira environment',
  mode: 'GUIDED',
  steps: [
    {
      id: 'step-1',
      instruction: 'Navigate to the QA Board in Jira Sandbox',
      hint: 'Click on "Projects" → "QA Sandbox"',
      completed: false,
    },
    {
      id: 'step-2',
      instruction: 'Click "Create Issue" and select Bug as the issue type',
      hint: 'The create button is in the top navigation bar',
      completed: false,
    },
    {
      id: 'step-3',
      instruction: 'Fill in the Summary: "Test Bug - Login button unresponsive on mobile"',
      completed: false,
    },
    {
      id: 'step-4',
      instruction: 'Add Steps to Reproduce: 1. Open mobile app 2. Tap login 3. Button does not respond',
      errorRecoveryGuidance: 'If you get stuck, use the pre-filled template from the dropdown',
      completed: false,
    },
    {
      id: 'step-5',
      instruction: 'Set Priority to "Medium" and submit the bug',
      completed: false,
    },
  ],
  artifactType: 'TICKET',
  managerReviewed: false,
};



export const FIRST_TASK_SIMULATION_FRONTLINE: FirstTaskSimulation = {
  id: 'fts-frontline-1',
  roleCategory: 'FRONTLINE',
  title: 'Complete Shift Safety Inspection',
  description: 'Practice logging a safety check in the Master Control system',
  mode: 'GUIDED',
  steps: [
    {
      id: 'step-1',
      instruction: 'Open the Master Control app on your tablet',
      hint: 'Tape the 🏭 icon on your home screen',
      completed: false,
    },
    {
      id: 'step-2',
      instruction: 'Select "Shift Start Checklist"',
      completed: false,
    },
    {
      id: 'step-3',
      instruction: 'Verify Safety Station status and Floor Hazards',
      completed: false,
    },
    {
      id: 'step-4',
      instruction: 'Submit the log and sync with central ops',
      completed: false,
    },
  ],
  artifactType: 'SAFETY_LOG',
  managerReviewed: false,
};

export const FIRST_TASK_SIMULATION_SALES: FirstTaskSimulation = {
  id: 'fts-sales-1',
  roleCategory: 'REMOTE',
  title: 'Log First Client Discovery',
  description: 'Practice updating a lead status in Salesforce',
  mode: 'GUIDED',
  steps: [
    {
      id: 'step-1',
      instruction: 'Search for "Acme Global" in the Salesforce Leads tab',
      completed: false,
    },
    {
      id: 'step-2',
      instruction: 'Change status to "Discovery Phase"',
      completed: false,
    },
    {
      id: 'step-3',
      instruction: 'Add a meeting note: "Initial discovery call complete. Interests include cloud scaling."',
      completed: false,
    },
    {
      id: 'step-4',
      instruction: 'Schedule a follow-up task for next Tuesday',
      completed: false,
    },
  ],
  artifactType: 'CRM_RECORD',
  managerReviewed: false,
};

export const FIRST_CONTRIBUTIONS: FirstContribution[] = [
  {
    id: 'fc-1',
    title: 'Join Team Standup',
    description: 'Attend the daily standup and introduce yourself briefly',
    type: 'STANDUP',
    status: 'AVAILABLE',
    managerConfirmed: false,
  },
  {
    id: 'fc-2',
    title: 'Update Team Wiki',
    description: 'Add yourself to the team roster page in Confluence',
    type: 'DOCUMENT_UPDATE',
    status: 'AVAILABLE',
    managerConfirmed: false,
  },
  {
    id: 'fc-3',
    title: 'Shadow a Code Review',
    description: 'Join a teammate during a PR review to learn the process',
    type: 'SHADOW',
    status: 'AVAILABLE',
    managerConfirmed: false,
  },
  {
    id: 'fc-4',
    title: 'Fix a "Good First Issue"',
    description: 'Pick a beginner-friendly issue tagged in GitHub',
    type: 'TASK',
    status: 'AVAILABLE',
    managerConfirmed: false,
  },
];

export const PRODUCTIVITY_TIPS: ProductivityTip[] = [
  {
    id: 'pt-1',
    toolId: 'tool-jira',
    toolName: 'Jira',
    title: 'JQL Quick Search',
    description: 'Use JQL filters like "assignee = currentUser() AND status != Done" for a fast personal dashboard',
    category: 'SHORTCUT',
    source: 'Shared by senior engineers',
  },
  {
    id: 'pt-2',
    toolId: 'tool-github',
    toolName: 'GitHub',
    title: 'Review your own PR first',
    description: 'Before requesting review, go through your own PR on GitHub. You\'ll catch 50% of issues yourself.',
    category: 'BEST_PRACTICE',
    source: 'Shared by senior engineers',
  },
  {
    id: 'pt-3',
    toolId: 'tool-slack',
    toolName: 'Slack',
    title: 'Scheduled Messages',
    description: 'Type /send at 9am tomorrow to respect teammates in different timezones',
    category: 'AUTOMATION',
    shortcutKey: '/schedule',
    source: 'Shared by remote team leads',
  },
];

// ============================================================================
// DAY 4: NETWORK & COLLABORATION
// ============================================================================

export const CRITICAL_5_CONTACTS: Critical5Contact[] = [
  {
    id: 'c5-1',
    name: 'Sarah Chen',
    title: 'Eng Manager',
    relationship: 'MANAGER',
    whyTheyMatter: 'Your direct manager. Sets your goals, unblocks you, and guides your career.',
    suggestedTopics: ['Expectations for first 30 days', 'Team priorities', 'Communication style'],
    introTemplate: 'Hi Sarah, I wanted to schedule our first 1:1 to discuss my 30-day goals and get your thoughts on priority focus areas.',
    communicationPreference: {
      preferredChannel: 'Slack for quick Qs, Weekly 1:1 for deep dives',
      bestTimeToReach: 'Mornings 9-11am',
    },
    introSent: false,
  },
  {
    id: 'c5-2',
    name: 'Marcus Williams',
    title: 'Lead Developer',
    relationship: 'MENTOR',
    whyTheyMatter: 'Technical mentor. Go-to person for architecture questions and code reviews.',
    suggestedTopics: ['Codebase overview', 'Development setup', 'Best practices'],
    introTemplate: 'Hi Marcus, thanks for being my onboarding buddy. When would be a good time to walk through the system architecture?',
    communicationPreference: {
      preferredChannel: 'Slack or PR comments',
      bestTimeToReach: 'Afternoons',
      quirks: 'Prefer async questions unless blocked.',
    },
    introSent: false,
  },
  {
    id: 'c5-3',
    name: 'Priya Sharma',
    title: 'Product Manager',
    relationship: 'STAKEHOLDER',
    whyTheyMatter: 'Defines what we build. Key for understanding "Why" we are building features.',
    suggestedTopics: ['Product roadmap', 'User personas', 'Upcoming features'],
    introTemplate: 'Hi Priya, looking forward to working with you. I\'d love to understand the current product priorities when you have a moment.',
    communicationPreference: {
      preferredChannel: 'Slack for updates, Jira for requirements',
      bestTimeToReach: '10am-2pm',
    },
    introSent: false,
  },
  {
    id: 'c5-4',
    name: 'Jordan Lee',
    title: 'Senior QA',
    relationship: 'PEER',
    whyTheyMatter: 'Your closest peer. Great resource for day-to-day workflow questions.',
    suggestedTopics: ['Testing flow', 'Environment setup', 'Common pitfalls'],
    introTemplate: 'Hey Jordan! Excited to join the team. Sarah mentioned you are the expert on our testing frameworks.',
    communicationPreference: {
      preferredChannel: 'Slack anytime',
      bestTimeToReach: 'Anytime',
    },
    introSent: false,
  },
  {
    id: 'c5-5',
    name: 'David Park',
    title: 'Security Lead',
    relationship: 'STAKEHOLDER',
    whyTheyMatter: 'Approves security reviews. Critical for shipping to production.',
    suggestedTopics: ['Security policies', 'Compliance requirements', 'Review process'],
    introTemplate: 'Hi David, checking in to say hi. I want to make sure I understand the security review process for my first feature.',
    communicationPreference: {
      preferredChannel: 'Email for official reviews',
      bestTimeToReach: 'Mornings',
    },
    introSent: false,
  },
];

export const STAKEHOLDER_NODES: StakeholderNode[] = [
  {
    id: 'sn-1',
    name: 'Sarah (Mgr)',
    title: 'Engineering Manager',
    circle: 'INNER',
    interactionType: 'Daily',
  },
  {
    id: 'sn-2',
    name: 'Marcus (Lead)',
    title: 'Lead Developer',
    circle: 'INNER',
    interactionType: 'Daily',
  },
  {
    id: 'sn-3',
    name: 'Priya (PM)',
    title: 'Product Manager',
    circle: 'MIDDLE',
    interactionType: 'Weekly',
  },
  {
    id: 'sn-4',
    name: 'Jordan (QA)',
    title: 'Senior QA',
    circle: 'INNER',
    interactionType: 'Daily',
  },
  {
    id: 'sn-5',
    name: 'David (Sec)',
    title: 'Security Lead',
    circle: 'OUTER',
    interactionType: 'Monthly',
  },
  {
    id: 'sn-6',
    name: 'Design Team',
    title: 'UX/UI Designers',
    circle: 'MIDDLE',
    interactionType: 'Weekly',
  },
  {
    id: 'sn-7',
    name: 'Ops Team',
    title: 'DevOps',
    circle: 'MIDDLE',
    interactionType: 'Weekly',
  },
];

export const TEAM_RITUALS: TeamRitual[] = [
  {
    id: 'tr-1',
    name: 'Morning Standup',
    type: 'STANDUP',
    description: '15-min sync to unblock the team.',
    frequency: 'Daily',
    duration: '15 mins',
    participants: ['Entire Team'],
    newHireExpectations: 'Listen for first week, then give update on learning progress.',
    acknowledged: false,
  },
  {
    id: 'tr-2',
    name: 'Sprint Retro',
    type: 'RETROSPECTIVE',
    description: 'Review what went well and what to improve.',
    frequency: 'Bi-weekly',
    duration: '60 mins',
    participants: ['Entire Team'],
    newHireExpectations: 'Share fresh perspective on our processes.',
    acknowledged: false,
  },
  {
    id: 'tr-3',
    name: 'Tech Demo',
    type: 'REVIEW',
    description: 'Showcase work to stakeholders.',
    frequency: 'Weekly',
    duration: '45 mins',
    participants: ['Eng', 'Product', 'Design'],
    newHireExpectations: 'Attend and ask questions.',
    acknowledged: false,
  },
  {
    id: 'tr-4',
    name: 'Team Lunch',
    type: 'SOCIAL',
    description: 'Casual bonding time.',
    frequency: 'Monthly',
    duration: '60 mins',
    participants: ['Entire Team'],
    newHireExpectations: 'Come hungry!',
    acknowledged: false,
  },
];

export const COLLABORATION_NORMS: CollaborationNorm[] = [
  {
    id: 'norm-1',
    category: 'COMMUNICATION',
    title: 'Async First',
    description: 'Write it down before calling a meeting.',
    examples: ['Use Slack threads for discussions', 'Update Jira tickets with latest status'],
  },
  {
    id: 'norm-2',
    category: 'MEETINGS',
    title: 'No Agenda, No Attenda',
    description: 'Meetings must have a clear purpose and agenda.',
    examples: ['Decline invites without agendas', 'Send pre-reads 24h in advance'],
  },
  {
    id: 'norm-3',
    category: 'FEEDBACK',
    title: 'Radical Candor',
    description: 'Care personally, challenge directly.',
    examples: ['Give feedback privately immediately after events', 'Praise publicly'],
  },
  {
    id: 'norm-4',
    category: 'WORK_HOURS',
    title: 'Respect Focus Time',
    description: 'Try not to interrupt deep work blocks (1-4pm).',
    examples: ['Schedule meetings in morning', 'Use "Do Not Disturb" on Slack'],
  },
];

export const PEER_COHORT: PeerCohort = {
  id: 'cohort-2024-q1',
  cohortName: 'Q1 2024 Starters',
  startDate: '2024-01-22',
  peers: [
    {
      id: 'p-1',
      name: 'Jamie Rivera',
      title: 'Waitstaff',
      department: 'Operations',
      sharedInterests: ['Hiking', 'Coffee'],
      connected: false,
    },
    {
      id: 'p-2',
      name: 'Sam Patel',
      title: 'Store Associate',
      department: 'Retail',
      sharedInterests: ['Gaming', 'Tech'],
      connected: false,
    },
  ],
  sharedEvents: [
    {
      id: 'ev-1',
      title: 'New Hire Mixer',
      date: '2024-01-26T17:00:00Z',
      location: 'Main Cafeteria',
    },
    {
      id: 'ev-2',
      title: 'CEO Q&A Session',
      date: '2024-02-02T10:00:00Z',
      location: 'Virtual',
    },
  ],
};

// ============================================================================
// DAY 5: GRADUATION
// ============================================================================


// ============================================================================
// ADVANCED DASHBOARD FEATURES — MOCK DATA
// ============================================================================

import {
  DecisionScenario,
  MeetingPattern,
  FocusMetrics,
  CareerHorizonSignal,
  PeerPracticeInsight,
} from '@/types';

// Decision Assist Scenarios
export const MOCK_DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'decision-1',
    type: 'EXEC_PRESENTATION',
    title: 'Executive Presentation Prep',
    description: 'You have a stakeholder presentation next week to the VP of Engineering.',
    checklist: [
      { id: 'prep-1', text: 'Define the key message in one sentence', category: 'PREPARATION', completed: false },
      { id: 'prep-2', text: 'Identify 3 potential tough questions', category: 'PREPARATION', completed: false },
      { id: 'prep-3', text: 'Prepare data visualizations for key metrics', category: 'PREPARATION', completed: false },
      { id: 'exec-1', text: 'Start with the conclusion, not the journey', category: 'EXECUTION', completed: false },
      { id: 'exec-2', text: 'Leave 5 minutes for questions', category: 'EXECUTION', completed: false },
      { id: 'follow-1', text: 'Send summary email within 24 hours', category: 'FOLLOW_UP', completed: false },
    ],
    framingTools: [
      'The Pyramid Principle: Start with recommendation, then supporting evidence',
      'MECE Framework: Mutually Exclusive, Collectively Exhaustive',
      'So What? Test: Every slide must answer "why does this matter?"',
    ],
    preparationPrompts: [
      'What decision do you want the audience to make after this presentation?',
      'What is the one thing they must remember?',
      'What resistance might you face?',
    ],
    urgency: 'MEDIUM',
    triggeredBy: 'Calendar event: "VP Engineering Review" detected',
  },
  {
    id: 'decision-2',
    type: 'PERFORMANCE_REVIEW',
    title: 'Annual Performance Review Prep',
    description: 'Your annual review meeting is in 3 days.',
    checklist: [
      { id: 'prep-1', text: 'Document 5 key accomplishments with metrics', category: 'PREPARATION', completed: false },
      { id: 'prep-2', text: 'Prepare specific examples for each competency', category: 'PREPARATION', completed: false },
      { id: 'prep-3', text: 'List 3 areas for growth (be honest)', category: 'PREPARATION', completed: false },
      { id: 'exec-1', text: 'Lead with results, not effort', category: 'EXECUTION', completed: false },
      { id: 'exec-2', text: 'Ask for specific feedback on growth areas', category: 'EXECUTION', completed: false },
      { id: 'follow-1', text: 'Document agreed action items', category: 'FOLLOW_UP', completed: false },
    ],
    framingTools: [
      'STAR Method: Situation, Task, Action, Result',
      'Impact Quantification: Numbers speak louder than words',
    ],
    preparationPrompts: [
      'What are you most proud of this year?',
      'Where did you fall short of your own expectations?',
      'What support do you need to reach the next level?',
    ],
    urgency: 'HIGH',
    triggeredBy: 'HR Calendar: Annual review period',
  },
];

// Meeting Intelligence Patterns
export const MOCK_MEETING_PATTERNS: MeetingPattern = {
  weeklyMeetingHours: 18.5,
  totalHours: 18.5,
  meetingsCount: 12,
  oneOnOneCount: 3,
  teamMeetingCount: 5,
  backToBackDays: 2,
  averageMeetingLength: 45,
  averageDuration: 45,
  actionOwnershipRate: 68,
  alerts: [
    {
      id: 'alert-1',
      type: 'OVERLOAD',
      message: 'You spend 46% of your week in meetings (18.5 hours)',
      metric: '46% meeting time',
      severity: 'HIGH',
      suggestion: 'Consider declining optional meetings or batching similar topics',
    },
    {
      id: 'alert-2',
      type: 'BACK_TO_BACK',
      message: '2 days this week had back-to-back meetings for 4+ hours',
      metric: '2 back-to-back days',
      severity: 'MEDIUM',
      suggestion: 'Block 15-min buffer between meetings for transition time',
    },
  ],
};

// Focus Guard Metrics
export const MOCK_FOCUS_METRICS: FocusMetrics = {
  contextSwitchesPerHour: 12.3,
  longestFocusBlock: 47,
  fragmentedDays: 3,
  deepWorkPercentage: 22,
  alerts: [
    {
      id: 'focus-1',
      type: 'HIGH_SWITCHING',
      message: 'High context switching detected: 12+ app switches per hour',
      suggestion: 'Try the Pomodoro technique: 25 min focus blocks with 5 min breaks',
      severity: 'WARNING',
    },
    {
      id: 'focus-2',
      type: 'NO_FOCUS_BLOCKS',
      message: 'Only 22% of your time is protected deep work',
      suggestion: 'Block 2-hour "Focus Time" on your calendar each morning',
      severity: 'CRITICAL',
    },
  ],
};

// Career Horizon Signals (Quarterly)
export const MOCK_CAREER_HORIZON: CareerHorizonSignal = {
  id: 'career-q1-2026',
  quarter: 'Q1 2026',
  userSkills: ['Test Automation', 'Python', 'Playwright', 'API Testing'],
  marketTrends: [
    {
      skillName: 'AI-Assisted Testing',
      demandChange: 156,
      direction: 'RISING',
      topIndustries: ['Finance', 'Healthcare', 'E-commerce'],
    },
    {
      skillName: 'Performance Engineering',
      demandChange: 42,
      direction: 'RISING',
      topIndustries: ['Gaming', 'Media', 'SaaS'],
    },
    {
      skillName: 'Manual Testing',
      demandChange: -18,
      direction: 'DECLINING',
      topIndustries: [],
    },
  ],
  emergingCapabilities: [
    {
      name: 'AI Test Generation',
      relevanceToRole: 92,
      description: 'Using AI models to auto-generate test cases from requirements',
      learningResources: ['Testim AI Course', 'GitHub Copilot for Testing'],
    },
    {
      name: 'Observability-Driven Testing',
      relevanceToRole: 78,
      description: 'Integrating traces, logs, and metrics into test strategies',
      learningResources: ['OpenTelemetry Testing Guide', 'Datadog QA Academy'],
    },
  ],
  roleEvolutionInsights: [
    'QA Engineers increasingly expected to own test infrastructure',
    'Shift-left practices making early-stage testing skills more valuable',
    'AI fluency becoming baseline expectation for senior roles',
  ],
};

// Peer Practice Insights (Anonymized)
export const MOCK_PEER_INSIGHTS: PeerPracticeInsight[] = [
  {
    id: 'peer-1',
    category: 'PRODUCTIVITY',
    title: 'Inbox Zero Mornings',
    description: '73% of high performers in similar roles process email only twice daily',
    adoption: 73,
    adoptionRate: 73,
    effectiveness: 82,
    impact: 'HIGH',
    howToAdopt: 'Check email at 9am and 2pm only. Use Slack for urgent communication.',
    implementationSteps: ['Set fixed email times', 'Turn off notifications', 'Use urgent channel for emergencies'],
    roleCategory: 'DESK',
  },
  {
    id: 'peer-2',
    category: 'COLLABORATION',
    title: 'No-Meeting Wednesdays',
    description: 'Teams with meeting-free days report 35% more deep work hours',
    adoption: 45,
    adoptionRate: 45,
    effectiveness: 78,
    impact: 'MEDIUM',
    howToAdopt: 'Propose a team experiment: one meeting-free day per week for 4 weeks',
    implementationSteps: ['Get team buy-in', 'Block calendars', 'Review after 4 weeks'],
    roleCategory: 'DESK',
  },
  {
    id: 'peer-3',
    category: 'TOOLING',
    title: 'Keyboard Shortcut Mastery',
    description: 'Power users save 15+ minutes daily with shortcuts in common tools',
    adoption: 38,
    adoptionRate: 38,
    effectiveness: 65,
    impact: 'MEDIUM',
    howToAdopt: 'Learn 3 new shortcuts this week: search, navigation, and window management',
    implementationSteps: ['Pick 3 shortcuts', 'Practice for 1 week', 'Add 3 more next week'],
    roleCategory: 'DESK',
  },
  {
    id: 'peer-4',
    category: 'WELLBEING',
    title: 'Walking 1:1s',
    description: 'Walking meetings improve creativity and reduce screen fatigue',
    adoption: 28,
    adoptionRate: 28,
    effectiveness: 71,
    impact: 'MEDIUM',
    howToAdopt: 'Suggest walking for your next 1:1 that doesn\'t require screen sharing',
    implementationSteps: ['Identify suitable 1:1s', 'Propose to manager', 'Start with one per week'],
    roleCategory: 'DESK',
  },
  {
    id: 'peer-5',
    category: 'LEARNING',
    title: 'Daily Micro-Learning',
    description: 'Top performers spend 15 minutes daily on skill development',
    adoption: 52,
    adoptionRate: 52,
    effectiveness: 85,
    impact: 'HIGH',
    howToAdopt: 'Block 15 minutes after lunch for learning. Use podcasts, articles, or courses.',
    implementationSteps: ['Block calendar slot', 'Curate learning queue', 'Track streak'],
    roleCategory: 'DESK',
  },
];

// Enhanced Daily Cards for Weekly Rhythm
export const MONDAY_CONTEXT_ANCHOR: ContextAnchorCard = {
  id: 'card-monday-anchor',
  slot: 'CONTEXT_ANCHOR',
  title: 'Week Ahead: Sprint Planning Outcomes',
  description: 'Sprint 47 starts today. 3 high-priority items assigned to QA. API regression suite needs update before Thursday demo.',
  source: 'Jira Sprint Board',
  sourceType: 'INTERNAL',
  timestamp: new Date().toISOString(),
  priority: 'HIGH',
  actionLabel: 'View Sprint Board',
  actionUrl: '#',
  read: false,
  flagged: false,
  explainer: 'This is your Monday planning card. It highlights the week\'s critical items that need your attention.',
  kpiType: 'PROJECT',
  kpiValue: '3 high-priority items',
  kpiChange: 0,
};

export const FRIDAY_MICRO_SKILL: MicroSkillCard = {
  id: 'card-friday-skill',
  slot: 'MICRO_SKILL',
  title: 'Weekly Reflection: Test Coverage Gaps',
  description: 'This week you wrote 12 test cases. 3 covered edge cases you found in code review — that pattern is worth continuing.',
  source: 'Workplace Analytics',
  sourceType: 'SYSTEM',
  timestamp: new Date().toISOString(),
  priority: 'MEDIUM',
  actionLabel: 'Set Next Week\'s Goal',
  read: false,
  flagged: false,
  explainer: 'Friday reflection cards reinforce positive patterns from your week.',
  frictionSource: 'Weekly Review',
  frictionMetric: '12 test cases written',
  tipType: 'BEST_PRACTICE',
};

// ----------------------------------------------------------------------------
// ESCALATION & KNOWLEDGE SYSTEM
// ----------------------------------------------------------------------------

export const ESCALATION_LADDER: EscalationPath[] = [
  {
    level: 1,
    type: 'PEER',
    label: 'Team Buddy / Peer',
    description: 'Quick questions about workflow or local environment.',
    triggerConditions: ['Environment setup issues', 'Documentation typos', 'Quick "where is X" questions'],
    contactMethod: 'CHAT',
    estimatedResponseTime: '30 mins',
  },
  {
    level: 2,
    type: 'MENTOR',
    label: 'Technical Mentor',
    description: 'Architecture guidance, code review patterns, and best practices.',
    triggerConditions: ['Architecture decisions', 'Complex bug debugging', 'Unwritten coding standards'],
    contactMethod: 'CHAT',
    estimatedResponseTime: '2 hours',
  },
  {
    level: 3,
    type: 'MANAGER',
    label: 'Engineering Manager',
    description: 'Priority alignment, team conflicts, and career growth.',
    triggerConditions: ['Priority conflicts', 'Systemic blockers', 'Inter-team dependencies'],
    contactMethod: 'MEETING',
    estimatedResponseTime: '24 hours',
  },
  {
    level: 4,
    type: 'HR_SME',
    label: 'HR / Subject Matter Expert',
    description: 'Policy questions, benefits, and workplace conduct.',
    triggerConditions: ['Policy clarification', 'Benefit questions', 'Conduct issues'],
    contactMethod: 'EMAIL',
    estimatedResponseTime: '48 hours',
  },
  {
    level: 5,
    type: 'LEGAL',
    label: 'Legal / Compliance',
    description: 'Data privacy, security incidents, and regulatory compliance.',
    triggerConditions: ['Security breaches', 'Data privacy concerns', 'Contractual obligations'],
    contactMethod: 'TICKET',
    estimatedResponseTime: '3 days',
  },
];

export const HORIZON_CONFIG: Record<TimeHorizon, { label: string; description: string; color: string }> = {
  IMMEDIATE: {
    label: 'Immediate',
    description: 'Critical items for your current focus',
    color: '#3B82F6',
  },
  GROWTH: {
    label: 'Growth',
    description: 'Skills and knowledge for your next stage',
    color: '#10B981',
  },
  TRAJECTORY: {
    label: 'Trajectory',
    description: 'Long-term career goals and market trends',
    color: '#8B5CF6',
  },
};

// ============================================================================
// ELITE LEARNING FEATURES — MOCK DATA
// ============================================================================

import {
  StreakData,
  Badge,
  LeaderboardEntry,
  SkillEndorsement,
  MentorMatch,
  OfficeHoursSlot,
  WhisperNudge,
  BountyGig,
  LessonLearned,
} from './types';

// --- STREAK DATA ---
export const MOCK_STREAK_DATA: StreakData = {
  currentStreak: 12,
  bestStreak: 28,
  lastActivityDate: new Date().toISOString(),
  isAtRisk: false,
  milestones: [7, 30, 100],
  totalActiveDays: 47,
};

// --- BADGES ---
export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge-onboard',
    name: 'Onboarding Hero',
    description: 'Completed the entire 5-day onboarding quest',
    icon: '🎓',
    category: 'ONBOARDING',
    tier: 'GOLD',
    criteria: 'Complete all 5 onboarding days',
    unlockedAt: '2026-01-27T10:00:00Z',
    isUnlocked: true,
  },
  {
    id: 'badge-streak-7',
    name: 'Week Warrior',
    description: '7-day learning streak',
    icon: '🔥',
    category: 'STREAK',
    tier: 'BRONZE',
    criteria: 'Maintain a 7-day streak',
    unlockedAt: '2026-01-29T10:00:00Z',
    isUnlocked: true,
  },
  {
    id: 'badge-sim-champ',
    name: 'Simulator Champion',
    description: 'Scored 90%+ on 3 different simulators',
    icon: '🎮',
    category: 'SIMULATOR',
    tier: 'SILVER',
    criteria: 'Score 90%+ on 3 simulators',
    unlockedAt: '2026-02-03T10:00:00Z',
    isUnlocked: true,
  },
  {
    id: 'badge-culture-nav',
    name: 'Culture Navigator',
    description: 'Answered all culture scenarios correctly',
    icon: '🧭',
    category: 'ONBOARDING',
    tier: 'SILVER',
    criteria: 'Perfect score on Day 2 culture scenarios',
    unlockedAt: '2026-01-24T10:00:00Z',
    isUnlocked: true,
  },
  {
    id: 'badge-connector',
    name: 'Super Connector',
    description: 'Sent intros to all 5 Critical Partners',
    icon: '🤝',
    category: 'COMMUNITY',
    tier: 'BRONZE',
    criteria: 'Connect with all Critical 5 partners',
    unlockedAt: '2026-01-25T10:00:00Z',
    isUnlocked: true,
  },
  {
    id: 'badge-streak-30',
    name: 'Monthly Master',
    description: '30-day learning streak',
    icon: '💎',
    category: 'STREAK',
    tier: 'GOLD',
    criteria: 'Maintain a 30-day streak',
    isUnlocked: false,
    progress: 12,
    maxProgress: 30,
  },
  {
    id: 'badge-mentor',
    name: 'Knowledge Sharer',
    description: 'Taught 3+ peer sessions',
    icon: '🎤',
    category: 'COMMUNITY',
    tier: 'SILVER',
    criteria: 'Deliver 3 peer teaching sessions',
    isUnlocked: false,
    progress: 1,
    maxProgress: 3,
  },
  {
    id: 'badge-mastery',
    name: 'Skill Master',
    description: 'Reached Mastered level on 5 skills',
    icon: '🌳',
    category: 'MASTERY',
    tier: 'PLATINUM',
    criteria: 'Master 5 skills in Skill Tree',
    isUnlocked: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: 'badge-bounty',
    name: 'Bounty Hunter',
    description: 'Completed first internal gig',
    icon: '🎯',
    category: 'COMMUNITY',
    tier: 'BRONZE',
    criteria: 'Complete 1 bounty gig',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'badge-leader',
    name: 'Rising Star',
    description: 'Reached Top 10 on leaderboard',
    icon: '⭐',
    category: 'LEADERSHIP',
    tier: 'GOLD',
    criteria: 'Rank in Top 10 on the leaderboard',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  // --- EASTER EGG / HIDDEN ACHIEVEMENTS ---
  {
    id: 'badge-night-owl',
    name: '???',
    description: 'This achievement is hidden. Keep exploring to discover it!',
    icon: '🥚',
    category: 'EASTER_EGG',
    tier: 'GOLD',
    criteria: 'Used DEX after 10 PM',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'badge-speed-demon',
    name: '???',
    description: 'This achievement is hidden. Keep exploring to discover it!',
    icon: '🥚',
    category: 'EASTER_EGG',
    tier: 'SILVER',
    criteria: 'Completed 3 daily cards in under 2 minutes',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'badge-social-butterfly',
    name: '???',
    description: 'This achievement is hidden. Keep exploring to discover it!',
    icon: '🥚',
    category: 'EASTER_EGG',
    tier: 'GOLD',
    criteria: 'Endorsed 5 different peers',
    isUnlocked: false,
    progress: 2,
    maxProgress: 5,
  },
  {
    id: 'badge-completionist',
    name: '???',
    description: 'This achievement is hidden. Keep exploring to discover it!',
    icon: '🥚',
    category: 'EASTER_EGG',
    tier: 'PLATINUM',
    criteria: 'Visited every tab in one session',
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
];

// --- LEADERBOARD ---
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb-1', name: 'Sophia Martinez', department: 'Engineering', learningScore: 95, performanceScore: 92, combinedScore: 94, rank: 1, badges: [], streak: 34, change: 'SAME', changeAmount: 0 },
  { id: 'lb-2', name: 'James Wilson', department: 'Product', learningScore: 88, performanceScore: 94, combinedScore: 91, rank: 2, badges: [], streak: 21, change: 'UP', changeAmount: 2 },
  { id: 'lb-3', name: 'Aisha Patel', department: 'Engineering', learningScore: 91, performanceScore: 87, combinedScore: 89, rank: 3, badges: [], streak: 18, change: 'DOWN', changeAmount: 1 },
  { id: 'lb-4', name: 'Alex Thompson', department: 'Engineering', learningScore: 85, performanceScore: 88, combinedScore: 86, rank: 4, badges: [], streak: 12, change: 'UP', changeAmount: 3 },
  { id: 'lb-5', name: 'Marcus Williams', department: 'Engineering', learningScore: 82, performanceScore: 89, combinedScore: 85, rank: 5, badges: [], streak: 15, change: 'DOWN', changeAmount: 2 },
  { id: 'lb-6', name: 'Emily Chen', department: 'Engineering', learningScore: 87, performanceScore: 80, combinedScore: 84, rank: 6, badges: [], streak: 9, change: 'UP', changeAmount: 1 },
  { id: 'lb-7', name: 'Raj Krishnan', department: 'Data Science', learningScore: 79, performanceScore: 86, combinedScore: 82, rank: 7, badges: [], streak: 7, change: 'SAME', changeAmount: 0 },
  { id: 'lb-8', name: 'Lisa Park', department: 'Design', learningScore: 83, performanceScore: 78, combinedScore: 81, rank: 8, badges: [], streak: 5, change: 'DOWN', changeAmount: 3 },
];

// --- ENDORSEMENTS ---
export const MOCK_ENDORSEMENTS: SkillEndorsement[] = [
  { id: 'end-1', skillId: 'skill-automation', skillName: 'Test Automation', endorserId: 'u-2', endorserName: 'Emily Chen', endorserTitle: 'Staff QA Engineer', message: 'Alex wrote excellent automation for the checkout flow.', endorsedAt: '2026-02-08T14:00:00Z' },
  { id: 'end-2', skillId: 'skill-playwright', skillName: 'Playwright', endorserId: 'u-3', endorserName: 'Marcus Williams', endorserTitle: 'Lead Developer', message: 'Great Playwright test suite for the API layer.', endorsedAt: '2026-02-06T10:00:00Z' },
  { id: 'end-3', skillId: 'skill-communication', skillName: 'Communication', endorserId: 'u-4', endorserName: 'Priya Sharma', endorserTitle: 'Product Manager', message: 'Clear, concise bug reports that PMs actually understand!', endorsedAt: '2026-02-04T09:00:00Z' },
  { id: 'end-4', skillId: 'skill-testing', skillName: 'Software Testing', endorserId: 'u-5', endorserName: 'Jordan Lee', endorserTitle: 'DevOps Engineer', message: 'Thorough testing approach caught critical edge cases.', endorsedAt: '2026-02-01T11:00:00Z' },
  { id: 'end-5', skillId: 'skill-python', skillName: 'Python', endorserId: 'u-6', endorserName: 'David Park', endorserTitle: 'Security Lead', message: 'Built a solid security scanning script in Python.', endorsedAt: '2026-01-30T16:00:00Z' },
];

// --- MENTOR MATCHES ---
export const MOCK_MENTOR_MATCHES: MentorMatch[] = [
  {
    id: 'mentor-1',
    name: 'Dr. Rachel Torres',
    title: 'Principal Engineer',
    department: 'Platform',
    matchScore: 94,
    sharedSkills: ['Test Automation', 'Python', 'CI/CD'],
    mentorStrengths: ['System Design', 'Career Growth', 'Technical Leadership'],
    availability: 'HIGH',
    mentorType: 'TRADITIONAL',
    bio: '15 years in platform engineering. Passionate about helping engineers grow from IC to tech lead.',
    yearsExperience: 15,
    menteeCount: 3,
  },
  {
    id: 'mentor-2',
    name: 'Kevin Zhang',
    title: 'Staff QA Architect',
    department: 'Quality',
    matchScore: 89,
    sharedSkills: ['Software Testing', 'Playwright', 'Selenium'],
    mentorStrengths: ['Test Strategy', 'Quality Culture', 'Automation Architecture'],
    availability: 'MEDIUM',
    mentorType: 'TRADITIONAL',
    bio: 'Built the QA framework for 3 Fortune 500 companies. Advocate for shift-left testing.',
    yearsExperience: 12,
    menteeCount: 2,
  },
  {
    id: 'mentor-3',
    name: 'Zara Okonkwo',
    title: 'Junior ML Engineer',
    department: 'AI/ML',
    matchScore: 76,
    sharedSkills: ['Python'],
    mentorStrengths: ['GenAI Tools', 'LLM Integration', 'AI-Assisted Testing'],
    availability: 'HIGH',
    mentorType: 'REVERSE',
    bio: 'Gen Z digital native. Can show you how to use Copilot, Cursor, and LLMs to 10x your testing.',
    yearsExperience: 2,
    menteeCount: 0,
  },
];

// --- OFFICE HOURS ---
export const MOCK_OFFICE_HOURS: OfficeHoursSlot[] = [
  {
    id: 'oh-1',
    expertName: 'Dr. Rachel Torres',
    expertTitle: 'Principal Engineer',
    expertDepartment: 'Platform',
    topic: 'System Design Reviews',
    topicTags: ['Architecture', 'Scalability', 'Design Patterns'],
    dateTime: '2026-02-13T14:00:00Z',
    duration: 60,
    capacity: 8,
    registeredCount: 5,
    isRegistered: false,
    description: 'Drop in with your architecture questions. Whiteboarding welcome.',
  },
  {
    id: 'oh-2',
    expertName: 'David Park',
    expertTitle: 'Security Lead',
    expertDepartment: 'Security',
    topic: 'Security Testing 101',
    topicTags: ['OWASP', 'Pen Testing', 'Secure Code'],
    dateTime: '2026-02-14T10:00:00Z',
    duration: 45,
    capacity: 12,
    registeredCount: 3,
    isRegistered: false,
    description: 'Learn the basics of security testing and how to integrate it into your workflow.',
  },
  {
    id: 'oh-3',
    expertName: 'Zara Okonkwo',
    expertTitle: 'Junior ML Engineer',
    expertDepartment: 'AI/ML',
    topic: 'AI Tools for Developers',
    topicTags: ['Copilot', 'LLMs', 'Prompt Engineering'],
    dateTime: '2026-02-14T15:00:00Z',
    duration: 30,
    capacity: 20,
    registeredCount: 14,
    isRegistered: true,
    description: 'Hands-on demo of AI coding assistants. Bring your laptop!',
  },
  {
    id: 'oh-4',
    expertName: 'Priya Sharma',
    expertTitle: 'Product Manager',
    expertDepartment: 'Product',
    topic: 'Writing Better User Stories',
    topicTags: ['Agile', 'Product', 'Communication'],
    dateTime: '2026-02-15T11:00:00Z',
    duration: 45,
    capacity: 10,
    registeredCount: 7,
    isRegistered: false,
    description: 'Tips for writing acceptance criteria that make QA engineers happy.',
  },
];

// --- WHISPER NUDGES ---
export const MOCK_WHISPER_NUDGES: WhisperNudge[] = [
  {
    id: 'wn-1', weekNumber: 1, dayInWeek: 1,
    title: 'Your First Coffee Chat',
    message: 'Research shows that employees who make 3+ connections in their first month are 2x more likely to stay.',
    microAction: 'Invite one person from a different team to a 15-minute coffee chat today.',
    category: 'NETWORKING', completed: true, completedAt: '2026-01-28T10:00:00Z',
    scheduledFor: '2026-01-27T09:00:00Z',
  },
  {
    id: 'wn-2', weekNumber: 1, dayInWeek: 3,
    title: 'Share One Thing',
    message: 'The best teams share knowledge openly. You probably already learned something others would benefit from.',
    microAction: 'Post one useful tip or resource in your team\'s Slack channel.',
    category: 'CULTURE', completed: true, completedAt: '2026-01-29T14:00:00Z',
    scheduledFor: '2026-01-29T09:00:00Z',
  },
  {
    id: 'wn-3', weekNumber: 2, dayInWeek: 1,
    title: 'Ask "Why?" Three Times',
    message: 'Curiosity is the engine of innovation. Today, dig deeper into something you accepted at face value.',
    microAction: 'In your next meeting, ask one follow-up "why" question about a decision or process.',
    category: 'GROWTH', completed: true, completedAt: '2026-02-03T11:00:00Z',
    scheduledFor: '2026-02-03T09:00:00Z',
  },
  {
    id: 'wn-4', weekNumber: 2, dayInWeek: 4,
    title: 'Deep Work Block',
    message: 'Your FocusGuard shows you average 6 context switches per hour. Let\'s fix that.',
    microAction: 'Block 90 minutes on your calendar tomorrow as "Focus Time" with notifications off.',
    category: 'PRODUCTIVITY', completed: false,
    scheduledFor: '2026-02-06T09:00:00Z',
  },
  {
    id: 'wn-5', weekNumber: 3, dayInWeek: 2,
    title: 'Gratitude Boost',
    message: 'Teams that practice recognition have 14% higher productivity. Small thanks go a long way.',
    microAction: 'Send a quick thank-you message to someone who helped you this week.',
    category: 'WELLBEING', completed: false,
    scheduledFor: '2026-02-11T09:00:00Z',
  },
];

// --- BOUNTY GIGS ---
export const MOCK_BOUNTY_GIGS: BountyGig[] = [
  {
    id: 'bounty-1',
    title: 'API Load Testing Suite',
    description: 'Create a comprehensive k6 load testing suite for the payments API. Must cover peak traffic scenarios.',
    requiredSkills: ['Performance Testing', 'JavaScript', 'API Testing'],
    points: 500,
    difficulty: 'INTERMEDIATE',
    status: 'OPEN',
    postedBy: 'Jordan Lee',
    postedByDepartment: 'Platform',
    deadline: '2026-02-28T23:59:00Z',
    estimatedHours: 12,
    skillsGained: ['k6', 'Performance Testing', 'Load Analysis'],
  },
  {
    id: 'bounty-2',
    title: 'Accessibility Audit: Mobile App',
    description: 'Run a full WCAG 2.1 AA audit on the mobile app. Document findings and create tickets for remediation.',
    requiredSkills: ['Accessibility', 'Mobile Testing', 'WCAG'],
    points: 350,
    difficulty: 'STARTER',
    status: 'OPEN',
    postedBy: 'Lisa Park',
    postedByDepartment: 'Design',
    deadline: '2026-03-15T23:59:00Z',
    estimatedHours: 8,
    skillsGained: ['Accessibility Testing', 'WCAG 2.1', 'Screen Reader Testing'],
  },
  {
    id: 'bounty-3',
    title: 'ML Model Validation Pipeline',
    description: 'Build an automated validation pipeline for the recommendation engine. Must include bias detection.',
    requiredSkills: ['Python', 'Machine Learning', 'Data Analysis'],
    points: 750,
    difficulty: 'ADVANCED',
    status: 'OPEN',
    postedBy: 'Zara Okonkwo',
    postedByDepartment: 'AI/ML',
    deadline: '2026-03-01T23:59:00Z',
    estimatedHours: 20,
    skillsGained: ['ML Testing', 'Bias Detection', 'Data Pipelines'],
  },
  {
    id: 'bounty-4',
    title: 'Internal Tech Talk: Playwright Tips',
    description: 'Prepare and deliver a 30-minute tech talk on Playwright best practices for the engineering guild.',
    requiredSkills: ['Playwright', 'Public Speaking', 'Test Automation'],
    points: 200,
    difficulty: 'STARTER',
    status: 'OPEN',
    postedBy: 'Emily Chen',
    postedByDepartment: 'Engineering',
    deadline: '2026-02-20T23:59:00Z',
    estimatedHours: 4,
    skillsGained: ['Public Speaking', 'Teaching', 'Knowledge Sharing'],
  },
];

// --- LESSONS LEARNED ---
export const MOCK_LESSONS_LEARNED: LessonLearned[] = [
  {
    id: 'lesson-1',
    authorName: 'Sarah Chen',
    authorTitle: 'Engineering Manager',
    authorDepartment: 'Engineering',
    title: 'The Deploy That Took Down Checkout',
    story: 'We deployed a "minor CSS fix" on a Friday afternoon without running the full regression suite. The CSS change inadvertently broke the checkout button\'s z-index, making it unclickable on mobile. We lost approximately $47K in revenue over 3 hours before a customer tweet alerted us.',
    takeaway: 'Never deploy without automated tests, especially on Fridays. We now have a "No-Deploy Friday" policy and added visual regression testing to our CI pipeline.',
    tags: ['deployment', 'testing', 'CSS', 'mobile'],
    upvotes: 42,
    isUpvoted: false,
    postedAt: '2026-02-01T10:00:00Z',
    category: 'TECHNICAL',
  },
  {
    id: 'lesson-2',
    authorName: 'Raj Krishnan',
    authorTitle: 'Senior Data Scientist',
    authorDepartment: 'Data Science',
    title: 'When the ML Model Was Accidentally Racist',
    story: 'Our recommendation model was trained on historical hiring data that contained systemic bias. We didn\'t run a bias audit before launch. The model was recommending significantly fewer opportunities to certain demographic groups. It took an intern\'s side project to spot the pattern.',
    takeaway: 'Always run bias detection on ML models before deployment. We now require a "Fairness Audit" sign-off for any model touching people decisions. And listen to your interns — fresh eyes catch what experienced eyes normalize.',
    tags: ['ML', 'bias', 'ethics', 'hiring'],
    upvotes: 67,
    isUpvoted: true,
    postedAt: '2026-01-28T14:00:00Z',
    category: 'LEADERSHIP',
  },
  {
    id: 'lesson-3',
    authorName: 'Marcus Williams',
    authorTitle: 'Lead Developer',
    authorDepartment: 'Engineering',
    title: 'The Microservice That Couldn\'t',
    story: 'I championed splitting our monolith into microservices before we had the observability infrastructure to support it. Within 2 months, we had 12 services and zero ability to trace a request across them. Debugging took 3x longer. The team was frustrated and I had to own the decision publicly.',
    takeaway: 'Invest in observability BEFORE you decompose. Distributed tracing, structured logging, and health dashboards should be Day 0, not "we\'ll add it later." Also: owning your mistakes publicly builds more trust than any success.',
    tags: ['microservices', 'architecture', 'observability', 'leadership'],
    upvotes: 38,
    isUpvoted: false,
    postedAt: '2026-01-25T09:00:00Z',
    category: 'PROCESS',
  },
];
