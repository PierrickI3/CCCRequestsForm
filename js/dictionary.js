// Used to check if the user is an admin
let adminGroups = {
  EMEA: [
    '691fce29-dc11-450a-89f1-73b51226863f', // ECCC Internal
    'fd3d95a6-0989-4174-b389-252e9bab80cb', // EMEA Enterprise CC Internal
  ],
  NA: ['cbc3ff94-f1d1-48aa-9c70-6fe32fe99455'],
  LATAM: ['8f7d2225-23a3-4400-b512-e548cfe73b94'],
  APAC: ['0ad890f8-5604-40e1-97a6-8fe463656381'],
  super: [
    '1eb0ded8-d845-4d8b-9057-e6144871f68b', // CC Request Form Admin
  ],
};

// Different email addresses per product and per region
let mailDistribution = {
  'Genesys Cloud': {
    EMEA: ['EMEACloudProgramManagement@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
  'Genesys Engage': {
    EMEA: ['EMEAEntCCRequests@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
  'Genesys Engage Cloud': {
    EMEA: ['EMEAEntCCRequests@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
  PureConnect: {
    EMEA: ['EMEACloudProgramManagement@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
};

let regions = {
  APAC: ['Asia', 'Australia', 'New Zeland'],
  EMEA: ['Central', 'North', 'South'],
  LATAM: ['Andean', 'Brazil', 'Mexico', 'Southern-Cone'],
  NA: ['East', 'Central', 'West', 'Canada', 'Government', 'Velocity', 'Channels'],
};

let requestsType = {
  'Demo & Trial Support': ['Trials (owned by the SC)', 'POCs, Pilots for Strategic Opps', 'Innovation (Integrations, Tailored Demos, Vision Clips)'],
  'Opportunity Support': ['Technical Design / Architecture Review', 'Other Commercial Support'],
  'Security Support': ['Questionnaires/Assessments/Audits', 'Other'],
  'Privacy Support': ['Questionnaires/Assessments/Audits', 'Other'],
  'Strategic Business Consulting': [],
  'Specialist Engagement': ['PureBridge', 'Cloud Migration', 'MultiCloud', 'Self-Service Automation', 'Digital AI', 'WEM', 'API (Platform/AppFoundry)', 'Must Win Opportunity Engagement', 'Other'],
  Enablement: ['Partner Summits, Events, Webinars', 'Partner End-to-End Enablement', 'Partner Technical Enablement', 'Internal SC/AE Enablement'],
  'Critical Situation Support': [],
  'Top 100 Account Planning': [],
  'Rapid Response Offer': [],
  'Google Rapid Response Virtual Agent': [],
  'Other Request': [],
};

let requestCategory = ['Demo & Trial Support', 'Opportunity Support', 'Security Support', 'Privacy Support', 'Strategic Business Consulting', 'Specialist Engagement', 'Enablement', 'Critical Situation Support', 'Top 100 Account Planning', 'Rapid Response Offer', 'Google Rapid Response Virtual Agent', 'Other Request'];
