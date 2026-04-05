// mock data for the dashboard - based on a rough SaaS startup's monthly spend
// amounts are in INR, negative = expense, positive = income
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Processing';
export type TransactionCategory =
  | 'Payroll'
  | 'Software'
  | 'Marketing'
  | 'Revenue'
  | 'Infrastructure'
  | 'Travel'
  | 'Legal'
  | 'Office'
  | 'Investment'
  | 'Tax';

export interface Transaction {
  id: string;
  date: string;
  entity: string;
  amount: number; // positive = income, negative = expense
  category: TransactionCategory;
  status: TransactionStatus;
  description: string;
}

export const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    date: '2026-04-01',
    entity: 'Stripe Inc.',
    amount: 4000000,
    category: 'Revenue',
    status: 'Completed',
    description: 'Monthly subscription revenue',
  },
  {
    id: 'TXN-002',
    date: '2026-04-01',
    entity: 'Google Cloud',
    amount: -284000,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'Cloud hosting & compute',
  },
  {
    id: 'TXN-003',
    date: '2026-03-31',
    entity: 'Deel HR',
    amount: -1875000,
    category: 'Payroll',
    status: 'Completed',
    description: 'March payroll disbursement',
  },
  {
    id: 'TXN-004',
    date: '2026-03-28',
    entity: 'Meta Ads',
    amount: -482000,
    category: 'Marketing',
    status: 'Completed',
    description: 'Q1 performance campaigns',
  },
  {
    id: 'TXN-005',
    date: '2026-03-27',
    entity: 'Acme Corp',
    amount: 1250000,
    category: 'Revenue',
    status: 'Completed',
    description: 'Enterprise plan - annual',
  },
  {
    id: 'TXN-006',
    date: '2026-03-25',
    entity: 'Vercel',
    amount: -40700,
    category: 'Software',
    status: 'Completed',
    description: 'Frontend hosting plan',
  },
  {
    id: 'TXN-007',
    date: '2026-03-24',
    entity: 'Lexcorp Legal',
    amount: -665000,
    category: 'Legal',
    status: 'Completed',
    description: 'Contract drafting & compliance',
  },
  {
    id: 'TXN-008',
    date: '2026-03-22',
    entity: 'IndiGo Airlines',
    amount: -178000,
    category: 'Travel',
    status: 'Completed',
    description: 'Business travel - Mumbai summit',
  },
  {
    id: 'TXN-009',
    date: '2026-03-20',
    entity: 'Notion',
    amount: -26600,
    category: 'Software',
    status: 'Completed',
    description: 'Team workspace subscription',
  },
  {
    id: 'TXN-010',
    date: '2026-03-18',
    entity: 'Techwave Ltd.',
    amount: 2325000,
    category: 'Revenue',
    status: 'Processing',
    description: 'Integration consulting fee',
  },
  {
    id: 'TXN-011',
    date: '2026-03-15',
    entity: 'AWS',
    amount: -507000,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'EC2 & S3 usage charges',
  },
  {
    id: 'TXN-012',
    date: '2026-03-14',
    entity: 'Peak XV Partners',
    amount: 20750000,
    category: 'Investment',
    status: 'Completed',
    description: 'Seed round tranche 2',
  },
  {
    id: 'TXN-013',
    date: '2026-03-12',
    entity: 'Income Tax Dept.',
    amount: -997000,
    category: 'Tax',
    status: 'Completed',
    description: 'Q1 advance tax payment',
  },
  {
    id: 'TXN-014',
    date: '2026-03-10',
    entity: 'Figma',
    amount: -29900,
    category: 'Software',
    status: 'Completed',
    description: 'Design tool annual plan',
  },
  {
    id: 'TXN-015',
    date: '2026-03-08',
    entity: 'LinkedIn Ads',
    amount: -266000,
    category: 'Marketing',
    status: 'Completed',
    description: 'B2B lead generation campaign',
  },
  {
    id: 'TXN-016',
    date: '2026-03-05',
    entity: 'Awfis Spaces',
    amount: -374000,
    category: 'Office',
    status: 'Pending',
    description: 'March co-working space',
  },
  {
    id: 'TXN-017',
    date: '2026-03-03',
    entity: 'Buildworks SaaS',
    amount: 790000,
    category: 'Revenue',
    status: 'Completed',
    description: 'Pro tier subscription',
  },
  {
    id: 'TXN-018',
    date: '2026-03-01',
    entity: 'Deel HR',
    amount: -1875000,
    category: 'Payroll',
    status: 'Completed',
    description: 'February payroll disbursement',
  },
  {
    id: 'TXN-019',
    date: '2026-02-28',
    entity: 'OpenAI',
    amount: -149400,
    category: 'Software',
    status: 'Completed',
    description: 'API usage - AI features',
  },
  {
    id: 'TXN-020',
    date: '2026-02-25',
    entity: 'NexaVentures',
    amount: 6225000,
    category: 'Investment',
    status: 'Failed',
    description: 'Bridge funding - declined',
  },
  {
    id: 'TXN-021',
    date: '2026-02-22',
    entity: 'HubSpot',
    amount: -199000,
    category: 'Marketing',
    status: 'Completed',
    description: 'CRM platform subscription',
  },
  {
    id: 'TXN-022',
    date: '2026-02-20',
    entity: 'Datadog',
    amount: -81400,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'Monitoring & observability',
  },
];

// Balance trend data for Line Chart (last 6 months) — in INR
export const balanceTrendData = [
  { month: 'Nov', balance: 15126000 },
  { month: 'Dec', balance: 17845000 },
  { month: 'Jan', balance: 16434000 },
  { month: 'Feb', balance: 20003000 },
  { month: 'Mar', balance: 23821000 },
  { month: 'Apr', balance: 25932000 },
];

// Expense categories for Donut Chart — in INR
export const expenseCategoryData = [
  { name: 'Payroll', value: 3750000, color: '#6366f1' },
  { name: 'Infrastructure', value: 872000, color: '#8b5cf6' },
  { name: 'Marketing', value: 747000, color: '#ec4899' },
  { name: 'Software', value: 246600, color: '#14b8a6' },
  { name: 'Legal', value: 665000, color: '#f59e0b' },
  { name: 'Travel', value: 178000, color: '#06b6d4' },
  { name: 'Office', value: 374000, color: '#84cc16' },
  { name: 'Tax', value: 997000, color: '#f97316' },
];

// Computed summary stats — in INR
export const summaryStats = {
  totalBalance: 25932000,
  totalBalanceTrend: +8.84,
  monthlyIncome: 4000000 + 1250000 + 2325000,
  monthlyIncomeTrend: +12.3,
  monthlyExpenses: 284000 + 1875000 + 482000 + 40700 + 665000 + 178000 + 26600,
  monthlyExpensesTrend: -4.2,
};

export const CATEGORIES: TransactionCategory[] = [
  'Payroll',
  'Software',
  'Marketing',
  'Revenue',
  'Infrastructure',
  'Travel',
  'Legal',
  'Office',
  'Investment',
  'Tax',
];
