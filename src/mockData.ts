// mock data for the dashboard - based on a rough SaaS startup's monthly spend
// amounts are in USD, negative = expense, positive = income
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
    amount: 48200,
    category: 'Revenue',
    status: 'Completed',
    description: 'Monthly subscription revenue',
  },
  {
    id: 'TXN-002',
    date: '2026-04-01',
    entity: 'Google Cloud',
    amount: -3420,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'Cloud hosting & compute',
  },
  {
    id: 'TXN-003',
    date: '2026-03-31',
    entity: 'Deel HR',
    amount: -22500,
    category: 'Payroll',
    status: 'Completed',
    description: 'March payroll disbursement',
  },
  {
    id: 'TXN-004',
    date: '2026-03-28',
    entity: 'Meta Ads',
    amount: -5800,
    category: 'Marketing',
    status: 'Completed',
    description: 'Q1 performance campaigns',
  },
  {
    id: 'TXN-005',
    date: '2026-03-27',
    entity: 'Acme Corp',
    amount: 15000,
    category: 'Revenue',
    status: 'Completed',
    description: 'Enterprise plan - annual',
  },
  {
    id: 'TXN-006',
    date: '2026-03-25',
    entity: 'Vercel',
    amount: -490,
    category: 'Software',
    status: 'Completed',
    description: 'Frontend hosting plan',
  },
  {
    id: 'TXN-007',
    date: '2026-03-24',
    entity: 'Lexcorp Legal',
    amount: -8000,
    category: 'Legal',
    status: 'Completed',
    description: 'Contract drafting & compliance',
  },
  {
    id: 'TXN-008',
    date: '2026-03-22',
    entity: 'Delta Airlines',
    amount: -2140,
    category: 'Travel',
    status: 'Completed',
    description: 'Business travel - NYC summit',
  },
  {
    id: 'TXN-009',
    date: '2026-03-20',
    entity: 'Notion',
    amount: -320,
    category: 'Software',
    status: 'Completed',
    description: 'Team workspace subscription',
  },
  {
    id: 'TXN-010',
    date: '2026-03-18',
    entity: 'Techwave Ltd.',
    amount: 28000,
    category: 'Revenue',
    status: 'Processing',
    description: 'Integration consulting fee',
  },
  {
    id: 'TXN-011',
    date: '2026-03-15',
    entity: 'AWS',
    amount: -6110,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'EC2 & S3 usage charges',
  },
  {
    id: 'TXN-012',
    date: '2026-03-14',
    entity: 'Sequoia Capital',
    amount: 250000,
    category: 'Investment',
    status: 'Completed',
    description: 'Seed round tranche 2',
  },
  {
    id: 'TXN-013',
    date: '2026-03-12',
    entity: 'State Tax Authority',
    amount: -12000,
    category: 'Tax',
    status: 'Completed',
    description: 'Q1 quarterly tax payment',
  },
  {
    id: 'TXN-014',
    date: '2026-03-10',
    entity: 'Figma',
    amount: -360,
    category: 'Software',
    status: 'Completed',
    description: 'Design tool annual plan',
  },
  {
    id: 'TXN-015',
    date: '2026-03-08',
    entity: 'LinkedIn Ads',
    amount: -3200,
    category: 'Marketing',
    status: 'Completed',
    description: 'B2B lead generation campaign',
  },
  {
    id: 'TXN-016',
    date: '2026-03-05',
    entity: 'WeWork',
    amount: -4500,
    category: 'Office',
    status: 'Pending',
    description: 'March office space rental',
  },
  {
    id: 'TXN-017',
    date: '2026-03-03',
    entity: 'Buildworks SaaS',
    amount: 9500,
    category: 'Revenue',
    status: 'Completed',
    description: 'Pro tier subscription',
  },
  {
    id: 'TXN-018',
    date: '2026-03-01',
    entity: 'Deel HR',
    amount: -22500,
    category: 'Payroll',
    status: 'Completed',
    description: 'February payroll disbursement',
  },
  {
    id: 'TXN-019',
    date: '2026-02-28',
    entity: 'OpenAI',
    amount: -1800,
    category: 'Software',
    status: 'Completed',
    description: 'API usage - AI features',
  },
  {
    id: 'TXN-020',
    date: '2026-02-25',
    entity: 'NexaVentures',
    amount: 75000,
    category: 'Investment',
    status: 'Failed',
    description: 'Bridge funding - declined',
  },
  {
    id: 'TXN-021',
    date: '2026-02-22',
    entity: 'HubSpot',
    amount: -2400,
    category: 'Marketing',
    status: 'Completed',
    description: 'CRM platform subscription',
  },
  {
    id: 'TXN-022',
    date: '2026-02-20',
    entity: 'Datadog',
    amount: -980,
    category: 'Infrastructure',
    status: 'Completed',
    description: 'Monitoring & observability',
  },
];

// Balance trend data for Line Chart (last 6 months)
export const balanceTrendData = [
  { month: 'Nov', balance: 182000 },
  { month: 'Dec', balance: 215000 },
  { month: 'Jan', balance: 198000 },
  { month: 'Feb', balance: 241000 },
  { month: 'Mar', balance: 287000 },
  { month: 'Apr', balance: 312400 },
];

// Expense categories for Donut Chart
export const expenseCategoryData = [
  { name: 'Payroll', value: 45000, color: '#6366f1' },
  { name: 'Infrastructure', value: 10510, color: '#8b5cf6' },
  { name: 'Marketing', value: 9000, color: '#ec4899' },
  { name: 'Software', value: 2970, color: '#14b8a6' },
  { name: 'Legal', value: 8000, color: '#f59e0b' },
  { name: 'Travel', value: 2140, color: '#06b6d4' },
  { name: 'Office', value: 4500, color: '#84cc16' },
  { name: 'Tax', value: 12000, color: '#f97316' },
];

// Computed summary stats
export const summaryStats = {
  totalBalance: 312400,
  totalBalanceTrend: +8.84,
  monthlyIncome: 48200 + 15000 + 28000, // April completions
  monthlyIncomeTrend: +12.3,
  monthlyExpenses: 3420 + 22500 + 5800 + 490 + 8000 + 2140 + 320,
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
