// ============================================
// TYPES
// ============================================

export interface Conversation {
  id: string
  title: string
  date: string
  time: string
  duration: string
  location?: string
  speakers: Speaker[]
  messages: Message[]
  summary?: string
  actionItems?: string[]
  isLive?: boolean
}

export interface Speaker {
  id: string
  name: string
  colorIndex: number
  isUser?: boolean
}

export interface Message {
  id: string
  speakerId: string
  text: string
  timestamp: string
  isLive?: boolean
}

export interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  source: 'auto' | 'manual'
  dueDate?: string
  conversationId?: string
  createdAt: string
}

export interface Memory {
  id: string
  category: 'person' | 'project' | 'preference' | 'location' | 'fact' | 'organization'
  label: string
  detail: string
  confidence: number
  sourceIds: string[]
  lastUpdated: string
}

export interface GraphNode {
  id: string
  label: string
  type: 'person' | 'project' | 'organization' | 'location' | 'preference'
  x: number
  y: number
  connections: string[]
}

export interface App {
  id: string
  name: string
  description: string
  category: string
  icon: string
  installed: boolean
  enabled: boolean
  capabilities: string[]
  risk: 'low' | 'medium' | 'high'
}

export interface DeviceInfo {
  name: string
  model: string
  battery: number
  charging: boolean
  firmware: string
  storage: { used: number; total: number }
  micGain: number
  ledColor: string
  doubleTapAction: string
  connected: boolean
}

// ============================================
// MOCK DATA
// ============================================

export const speakers: Speaker[] = [
  { id: 's1', name: 'You', colorIndex: 1, isUser: true },
  { id: 's2', name: 'Sarah Chen', colorIndex: 2 },
  { id: 's3', name: 'Marcus Johnson', colorIndex: 3 },
  { id: 's4', name: 'Unknown Speaker', colorIndex: 4 },
]

export const conversations: Conversation[] = [
  {
    id: 'c1',
    title: 'Product Roadmap Planning',
    date: 'Today',
    time: '2:30 PM',
    duration: '47 min',
    location: 'Conference Room A',
    speakers: [speakers[0], speakers[1], speakers[2]],
    summary: 'Discussed Q4 product priorities. Agreed to focus on mobile experience improvements and API v2 migration. Sarah will lead the design sprint.',
    actionItems: ['Finalize API v2 spec by Friday', 'Schedule design sprint with Sarah', 'Review competitor analysis report'],
    messages: [
      { id: 'm1', speakerId: 's1', text: 'Let\'s start with the Q4 priorities. What are the top three things we need to ship?', timestamp: '2:30 PM' },
      { id: 'm2', speakerId: 's2', text: 'From the design side, the mobile experience is our biggest gap. User research shows 60% of churn happens on mobile.', timestamp: '2:31 PM' },
      { id: 'm3', speakerId: 's3', text: 'Agreed. On the engineering side, the API v2 migration is blocking three partner integrations. We need to prioritize that.', timestamp: '2:32 PM' },
      { id: 'm4', speakerId: 's1', text: 'OK so mobile experience and API v2 are locked in. What\'s the third?', timestamp: '2:33 PM' },
      { id: 'm5', speakerId: 's2', text: 'I\'d suggest the analytics dashboard. Product team has been asking for it since Q2.', timestamp: '2:34 PM' },
      { id: 'm6', speakerId: 's3', text: 'That works. I can have the API v2 spec ready by Friday if we align on the schema today.', timestamp: '2:35 PM' },
      { id: 'm7', speakerId: 's1', text: 'Perfect. Sarah, can you lead the design sprint for mobile? Let\'s schedule it next week.', timestamp: '2:36 PM' },
      { id: 'm8', speakerId: 's2', text: 'Absolutely. I\'ll send out the calendar invite this afternoon.', timestamp: '2:36 PM' },
    ]
  },
  {
    id: 'c2',
    title: 'Client Call — Acme Corp',
    date: 'Today',
    time: '10:00 AM',
    duration: '32 min',
    location: 'Remote (Zoom)',
    speakers: [speakers[0], speakers[1]],
    summary: 'Reviewed Acme\'s onboarding progress. They need custom SSO integration by end of month. Budget approved for additional engineering support.',
    actionItems: ['Send SSO integration spec to Acme', 'Allocate 2 engineers to Acme account', 'Schedule follow-up for next Thursday'],
    messages: [
      { id: 'm9', speakerId: 's2', text: 'Thanks for jumping on. Our team has been testing the platform and we love the core experience.', timestamp: '10:01 AM' },
      { id: 'm10', speakerId: 's1', text: 'Great to hear. What\'s blocking full deployment on your end?', timestamp: '10:02 AM' },
      { id: 'm11', speakerId: 's2', text: 'SSO integration. Our security team requires SAML before we can go live with all 500 users.', timestamp: '10:03 AM' },
    ]
  },
  {
    id: 'c3',
    title: 'Morning Standup',
    date: 'Yesterday',
    time: '9:15 AM',
    duration: '12 min',
    location: 'Slack Huddle',
    speakers: [speakers[0], speakers[2], speakers[3]],
    summary: 'Quick sync on sprint progress. Backend team is on track. Frontend needs one more day on the dashboard component.',
    actionItems: ['Review PR #428', 'Update sprint board'],
    messages: [
      { id: 'm12', speakerId: 's1', text: 'Morning everyone. Quick updates — what\'s everyone working on?', timestamp: '9:15 AM' },
      { id: 'm13', speakerId: 's3', text: 'Backend is good. Auth service refactor is 80% done, should be merged today.', timestamp: '9:16 AM' },
    ]
  },
  {
    id: 'c4',
    title: 'Lunch with David — Career Advice',
    date: 'Yesterday',
    time: '12:30 PM',
    duration: '55 min',
    location: 'Blue Bottle Coffee',
    speakers: [speakers[0], speakers[3]],
    summary: 'David shared insights on transitioning to engineering management. Recommended "The Manager\'s Path" book and suggested finding a mentor outside the company.',
    actionItems: ['Read "The Manager\'s Path" by Camille Fournier', 'Reach out to Priya for mentorship chat'],
    messages: [
      { id: 'm14', speakerId: 's3', text: 'So you\'re thinking about moving into management? That\'s a big decision.', timestamp: '12:31 PM' },
      { id: 'm15', speakerId: 's1', text: 'Yeah, I\'ve been tech lead for a year now and I\'m enjoying the people side more than the code.', timestamp: '12:32 PM' },
    ]
  },
  {
    id: 'c5',
    title: 'Gym Podcast — Huberman Lab',
    date: '2 days ago',
    time: '7:00 AM',
    duration: '1h 22min',
    location: 'Fitness First',
    speakers: [speakers[3]],
    summary: 'Episode on sleep optimization. Key takeaways: maintain consistent sleep/wake time, avoid blue light 2hrs before bed, supplement with magnesium threonate.',
    actionItems: ['Try magnesium threonate supplement', 'Set phone to night mode at 8 PM'],
    messages: [
      { id: 'm16', speakerId: 's3', text: 'Today we\'re talking about the science of sleep and how to optimize your circadian rhythm for peak performance...', timestamp: '7:01 AM' },
    ]
  },
]

export const liveTranscript: Message[] = [
  { id: 'l1', speakerId: 's1', text: 'So the key insight from the user research is that', timestamp: '3:42 PM', isLive: true },
  { id: 'l2', speakerId: 's2', text: 'Right, and if we look at the engagement metrics from last quarter', timestamp: '3:42 PM', isLive: true },
  { id: 'l3', speakerId: 's1', text: 'we see a clear pattern in how users interact with the onboarding flow', timestamp: '3:43 PM', isLive: true },
  { id: 'l4', speakerId: 's3', text: 'That aligns with what we saw in the A/B test results', timestamp: '3:43 PM', isLive: true },
  { id: 'l5', speakerId: 's2', text: 'Exactly. The drop-off happens specifically at step three where we ask for', timestamp: '3:44 PM', isLive: true },
]

export const tasks: Task[] = [
  { id: 't1', title: 'Finalize API v2 spec by Friday', completed: false, priority: 'high', source: 'auto', dueDate: 'Fri, Dec 20', conversationId: 'c1', createdAt: 'Today' },
  { id: 't2', title: 'Schedule design sprint with Sarah', completed: false, priority: 'high', source: 'auto', dueDate: 'This week', conversationId: 'c1', createdAt: 'Today' },
  { id: 't3', title: 'Review competitor analysis report', completed: false, priority: 'medium', source: 'auto', conversationId: 'c1', createdAt: 'Today' },
  { id: 't4', title: 'Send SSO integration spec to Acme', completed: false, priority: 'high', source: 'auto', dueDate: 'Tomorrow', conversationId: 'c2', createdAt: 'Today' },
  { id: 't5', title: 'Allocate 2 engineers to Acme account', completed: false, priority: 'medium', source: 'auto', conversationId: 'c2', createdAt: 'Today' },
  { id: 't6', title: 'Review PR #428', completed: true, priority: 'medium', source: 'auto', conversationId: 'c3', createdAt: 'Yesterday' },
  { id: 't7', title: 'Read "The Manager\'s Path"', completed: false, priority: 'low', source: 'auto', conversationId: 'c4', createdAt: 'Yesterday' },
  { id: 't8', title: 'Try magnesium threonate supplement', completed: false, priority: 'low', source: 'auto', conversationId: 'c5', createdAt: '2 days ago' },
  { id: 't9', title: 'Prepare presentation for board meeting', completed: false, priority: 'high', source: 'manual', dueDate: 'Mon, Dec 23', createdAt: 'Today' },
  { id: 't10', title: 'Book flights for SF conference', completed: false, priority: 'medium', source: 'manual', dueDate: 'Jan 5', createdAt: 'Yesterday' },
  { id: 't11', title: 'Update sprint board', completed: true, priority: 'low', source: 'auto', conversationId: 'c3', createdAt: 'Yesterday' },
]

export const memories: Memory[] = [
  { id: 'mem1', category: 'person', label: 'Sarah Chen', detail: 'VP of Design. Prefers async communication. Based in SF.', confidence: 0.95, sourceIds: ['c1', 'c2'], lastUpdated: 'Today' },
  { id: 'mem2', category: 'person', label: 'Marcus Johnson', detail: 'Senior Backend Engineer. Working on API v2 migration.', confidence: 0.92, sourceIds: ['c1', 'c3'], lastUpdated: 'Today' },
  { id: 'mem3', category: 'person', label: 'David Park', detail: 'Former colleague. Interested in engineering management transition.', confidence: 0.88, sourceIds: ['c4'], lastUpdated: 'Yesterday' },
  { id: 'mem4', category: 'project', label: 'API v2 Migration', detail: 'Blocking 3 partner integrations. Spec due Friday.', confidence: 0.97, sourceIds: ['c1', 'c3'], lastUpdated: 'Today' },
  { id: 'mem5', category: 'project', label: 'Mobile Experience Redesign', detail: '60% of churn on mobile. Design sprint next week.', confidence: 0.94, sourceIds: ['c1'], lastUpdated: 'Today' },
  { id: 'mem6', category: 'project', label: 'Acme Corp Onboarding', detail: '500 users. Needs SSO/SAML by end of month.', confidence: 0.96, sourceIds: ['c2'], lastUpdated: 'Today' },
  { id: 'mem7', category: 'preference', label: 'Communication Style', detail: 'Prefers async over meetings. Concise updates.', confidence: 0.85, sourceIds: ['c1'], lastUpdated: 'Today' },
  { id: 'mem8', category: 'location', label: 'Blue Bottle Coffee', detail: 'Regular spot for 1:1 meetings.', confidence: 0.78, sourceIds: ['c4'], lastUpdated: 'Yesterday' },
  { id: 'mem9', category: 'location', label: 'Fitness First', detail: 'Morning gym. Goes around 7 AM.', confidence: 0.82, sourceIds: ['c5'], lastUpdated: '2 days ago' },
  { id: 'mem10', category: 'fact', label: 'Sleep Optimization', detail: 'Interested in circadian rhythm science. Considering magnesium threonate.', confidence: 0.80, sourceIds: ['c5'], lastUpdated: '2 days ago' },
  { id: 'mem11', category: 'fact', label: 'Career Interest', detail: 'Exploring transition from tech lead to engineering management.', confidence: 0.87, sourceIds: ['c4'], lastUpdated: 'Yesterday' },
  { id: 'mem12', category: 'organization', label: 'Acme Corp', detail: 'Enterprise client. 500 users. Security-focused.', confidence: 0.98, sourceIds: ['c2'], lastUpdated: 'Today' },
]

export const graphNodes: GraphNode[] = [
  { id: 'you', label: 'You', type: 'person', x: 50, y: 50, connections: ['sarah', 'marcus', 'david', 'api-v2', 'mobile', 'acme'] },
  { id: 'sarah', label: 'Sarah Chen', type: 'person', x: 25, y: 20, connections: ['you', 'mobile', 'acme'] },
  { id: 'marcus', label: 'Marcus J.', type: 'person', x: 75, y: 25, connections: ['you', 'api-v2'] },
  { id: 'david', label: 'David Park', type: 'person', x: 15, y: 65, connections: ['you'] },
  { id: 'api-v2', label: 'API v2', type: 'project', x: 70, y: 55, connections: ['you', 'marcus', 'acme'] },
  { id: 'mobile', label: 'Mobile UX', type: 'project', x: 35, y: 75, connections: ['you', 'sarah'] },
  { id: 'acme', label: 'Acme Corp', type: 'organization', x: 80, y: 75, connections: ['you', 'sarah', 'api-v2'] },
  { id: 'gym', label: 'Fitness First', type: 'location', x: 20, y: 40, connections: ['you'] },
  { id: 'coffee', label: 'Blue Bottle', type: 'location', x: 10, y: 80, connections: ['you', 'david'] },
]

export const apps: App[] = [
  { id: 'a1', name: 'Notion Sync', description: 'Auto-transform conversations into organized CRM notes and documentation.', category: 'Integrations', icon: '📝', installed: true, enabled: true, capabilities: ['Imports', 'Chat Tools', 'Webhooks'], risk: 'medium' },
  { id: 'a2', name: 'Calendar Auto', description: 'Converts verbal arrangements into real calendar invites automatically.', category: 'Productivity', icon: '📅', installed: true, enabled: true, capabilities: ['Chat Tools', 'Triggers'], risk: 'low' },
  { id: 'a3', name: 'Slack Bridge', description: 'Push real-time summaries to corporate Slack channels and threads.', category: 'Integrations', icon: '💬', installed: true, enabled: true, capabilities: ['Chat Tools', 'Notifications', 'Imports'], risk: 'medium' },
  { id: 'a4', name: 'Speech Coach', description: 'Analyzes vocal tone, pacing, filler words, and delivery metrics.', category: 'Coaching', icon: '🎤', installed: true, enabled: false, capabilities: ['Memory', 'Chat Tools'], risk: 'low' },
  { id: 'a5', name: 'Lie Detector Pro', description: 'Analyzes text logic patterns for inconsistencies in conversations.', category: 'Insights', icon: '🔍', installed: false, enabled: false, capabilities: ['Memory', 'Chat Tools'], risk: 'high' },
  { id: 'a6', name: 'Networking Guru', description: 'Extracts names, visual context, and memory tricks for new contacts.', category: 'Insights', icon: '🤝', installed: true, enabled: true, capabilities: ['Memory', 'Imports'], risk: 'low' },
  { id: 'a7', name: 'Zapier Connect', description: 'Create automated workflows triggered by conversation events.', category: 'Integrations', icon: '⚡', installed: false, enabled: false, capabilities: ['Triggers', 'Webhooks', 'External'], risk: 'medium' },
  { id: 'a8', name: 'Scam Guard', description: 'Listens for fraudulent phrasing patterns and phone scam strategies.', category: 'Safety', icon: '🛡️', installed: true, enabled: true, capabilities: ['Memory', 'Notifications'], risk: 'low' },
  { id: 'a9', name: 'ELI5 Summarizer', description: 'Breaks down complex lectures into simple, structured study notes.', category: 'Learning', icon: '📚', installed: false, enabled: false, capabilities: ['Memory', 'Chat Tools'], risk: 'low' },
  { id: 'a10', name: 'Splitwise Voice', description: 'Parse voice commands to split bills and manage shared expenses.', category: 'Finance', icon: '💰', installed: false, enabled: false, capabilities: ['Chat Tools', 'External'], risk: 'medium' },
  { id: 'a11', name: 'Therapy Notes', description: 'Format clinical conversations into standard medical SOAP notes.', category: 'Health', icon: '🏥', installed: false, enabled: false, capabilities: ['Memory', 'Imports'], risk: 'high' },
  { id: 'a12', name: 'Google Drive', description: 'Continuous automated backup of audio clips and transcripts.', category: 'Storage', icon: '☁️', installed: true, enabled: true, capabilities: ['Imports', 'Triggers'], risk: 'low' },
]

export const device: DeviceInfo = {
  name: 'Omi Pendant',
  model: 'v3 — Aluminum Edition',
  battery: 73,
  charging: false,
  firmware: '2.4.1',
  storage: { used: 4.2, total: 8.0 },
  micGain: 75,
  ledColor: '#6366f1',
  doubleTapAction: 'Quick Memo',
  connected: true,
}

export const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Japanese', 'Korean', 'Chinese (Mandarin)', 'Chinese (Cantonese)',
  'Arabic', 'Hindi', 'Bengali', 'Russian', 'Turkish', 'Dutch',
  'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Thai',
  'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Hebrew', 'Greek'
]
