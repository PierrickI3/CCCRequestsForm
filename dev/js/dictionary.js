// Used to check if the user is an admin
let adminGroups = {
  EMEA: [
    '691fce29-dc11-450a-89f1-73b51226863f', // ECCC Internal
    'fd3d95a6-0989-4174-b389-252e9bab80cb', // EMEA Enterprise CC Internal
  ],
  NA: ['cbc3ff94-f1d1-48aa-9c70-6fe32fe99455'], // NA Competency Center Internal
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
    EMEA: ['EMEAEntCCRequests@genesys.com', 'david.curley@genesys.com', 'martin.vagner@genesys.com', 'julio.hidalgo@genesys.com', 'cedric.bourgeois@genesys.com', 'alberto.pasi@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
  'Genesys Engage Cloud': {
    EMEA: ['EMEAEntCCRequests@genesys.com', 'david.curley@genesys.com', 'martin.vagner@genesys.com', 'julio.hidalgo@genesys.com', 'cedric.bourgeois@genesys.com', 'alberto.pasi@genesys.com'],
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
  'Latitude by Genesys': {
    EMEA: ['EMEACloudProgramManagement@genesys.com'],
    NA: ['NACompetencyCenterRequests@genesys.com'],
    LATAM: ['LATAMCompetencyCenter@genesys.com'],
    APAC: ['apac-cc@genesys.com'],
  },
};

let regions = {
  APAC: ['ANZ', 'Japan', 'SEA', 'Korea', 'India', 'China'],
  EMEA: ['Central', 'North', 'South'],
  LATAM: ['Andean', 'Brazil', 'Mexico', 'Southern-Cone'],
  NA: ['East', 'Central', 'West', 'Canada', 'Government', 'Velocity', 'Channels'],
};

let requestsType = {
  'Critical Situation Support': [],
  'Customer Success Program': ['General Questions', 'Specific Service Element Questions'],
  'Demo & Trial Support': ['Innovation (Integrations, Tailored Demos, Vision Clips)', 'POCs, Pilots for Strategic Opps', 'Test Drive Application Questions', 'Test Drive (Trials) Process Related'],
  Enablement: ['Internal SC/AE Enablement', 'Partner End-to-End Enablement', 'Partner Summits, Events, Webinars', 'Partner Technical Enablement'],
  'Opportunity Support': ['Technical Design / Architecture Review', 'Other Commercial Support'],
  'Privacy Support': ['Questionnaires/Assessments/Audits', 'Other'],
  Roadmap: [],
  'Subscription Extension': [],
  'Security Support': ['Questionnaires/Assessments/Audits', 'Other'],
  'Specialist Engagement': ['API (Platform/AppFoundry)', 'Cloud Migration', 'Digital AI', 'MultiCloud', 'Must Win Opportunity Engagement', 'PureBridge', 'Self-Service Automation', 'WEM', 'Other'],
  'Strategic Business Consulting': ['Help with Financial Analysis (TCO/ROI)', 'Industry Expertise'],
  'Other Request': [],
};

let requestCategory = ['Critical Situation Support', 'Customer Success Program', 'Demo & Trial Support', 'Enablement', 'Opportunity Support', 'Privacy Support', 'Roadmap', 'Security Support', 'Specialist Engagement', 'Strategic Business Consulting', 'Subscription Extension', 'Other Request'];

let taskStatus = ['Pending', 'Waiting for info', 'In progress', 'Completed'];
