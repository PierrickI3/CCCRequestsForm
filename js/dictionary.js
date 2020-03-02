
let adminGroups = {
    EMEA: [
        "691fce29-dc11-450a-89f1-73b51226863f"
    ],
    NA: [
        "cbc3ff94-f1d1-48aa-9c70-6fe32fe99455"
    ],
    LATAM: [
        "8f7d2225-23a3-4400-b512-e548cfe73b94"
    ],
    APAC: [
        "0ad890f8-5604-40e1-97a6-8fe463656381"
    ]
};

let mailDistribution = {
    EMEA: "EMEACloudProgramManagement@genesys.com",
    NA: "NACompetencyCenterRequests@genesys.com",
    LATAM: "LATAMCompetencyCenter@genesys.com",
    APAC: "apac-cc@genesys.com"
};

let regions = {
    APAC: [
        "Asia", "Australia", "New Zeland"
    ],
    EMEA: [
        "Central", "North", "South"
    ],
    LATAM: [
        "Andean", "Brazil", "Mexico", "Southern-Cone"
    ],
    NA: [
        "East", "Central", "West", "Canada", "Government", "Velocity", "Channels"
    ]
}

let requestsType = {
    "Demo & Trial Support": ["Trials (owned by the SC)", "POCs, Pilots for Strategic Opps", "Innovation (Integration, Tailored Demos, Vision Clips)"],
    "Enablement": ["Partner Summits, Events, Webinars", "Partner End-to-End Enablement", "Partner Technical Enablement", "Internal SC/AE Enablement"],
    "Opportunity Support": ["Technical Design / Architecture Review", "Other Commercial Support"],
    "Security Support": ["Assessments/Audits", "Questions", "Webex/Workship/Meeting", "Other"],
    "Privacy Support": ["Assessments/Audits", "Questions", "Webex/Workship/Meeting", "Other"],
    "Strategic Business Consulting": [],
    "Specialist Engagement": ["PureBridge", "Cloud Migration", "MultiCloud", "Self-Service Automation", "Digital AI", "WEM", "API (Platform/AppFoundry)", "Must Win Opportunity Engagement", "Other"],
    "Critical Situation Support": [],
    "Other Request": []
}

let requestCategory = [
    "Demo & Trial Support",
    "Enablement",
    "Security Support",
    "Opportunity Support",
    "Privacy Support",
    "Strategic Business Consulting",
    "Specialist Engagement",
    "Critical Situation Support",
    "Other Request"
]