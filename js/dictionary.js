
let adminGroups = {
    EMEA: [
        "89bc6b45-62d9-4d20-be78-cdf5a2e39ae8"
    ],
    NA: [
        "1234"
    ],
    LATAM: [
        "4bfb"
    ],
    APAC: [
        "1234"
    ]
};

let mailDistribution = {
    EMEA: "daniel.szlaski@genesys.com", //EMEACloudCC@genesys.com
    NA: "1234",
    LATAM: "4bfb",
    APAC:"1234"
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
        "East Enterptise", "East Commercial", "East MM", "Central Enterprise", "Central Commercial", "Central MM", "West Enterprise", "West Commercial", "West MM", "Canada", "Government", "Velocity", "Channels"
    ]
}
/*
let requestsType = {

    EMEA: {
        "Genesys Cloud": ["Additional Privacy Support", "Additional Security Support", "Associate SC & AE Enablement", "Cloud Migrations", "Critical Situation Management", "End to End Partner Enablement", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "Partner Enablement (Summits/ Events/ Webinars)", "POC & Pilots for Strategic Opportunities", "Technical Design/ Architecture Review", "Test Drive", "Other"],
        "Genesys Engage": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POC & Pilots for Strategic Opportunities", "Technical Design/ Architecture Review", "Other"],
        "Genesys Engage Cloud": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POC & Pilots for Strategic Opportunities", "Technical Design/ Architecture Review", "Other"],
        "PureConnect": ["Additional Privacy Support", "Additional Security Support", "Cloud Migrations", "Technical Design/ Architecture Review", "Other"]

    },
    APAC: {
        "Genesys Cloud": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "Genesys Engage": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "Genesys Engage Cloud": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "PureConnect": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"]

    },
    LATAM: {
        "Genesys Cloud": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "Genesys Engage": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "Genesys Engage Cloud": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"],
        "PureConnect": ["Cloud Migrations", "Innovation (Custom Demos, Integrations, Beta Testing)", "Must Win/Strategic Opportunity Support", "POCs & Pilots for Strategic Opportunities", "Technical Design/Architecture Review", "Other"]

    },
    NA: {
        "Genesys Cloud": ["API Support", "AppFoundry Support", "Business Consulting", "Cloud Migrations", "Data Privacy & Security", "Demo Advanced", "EWM (Work Item Routing)", "POC/Pilot", "Predictive Engagement (Altocloud)", "PureBridge (Don't forget your DSR)", "RFP Advanced", "Service Automation (Self-Service, IVR BOT's)", "Outbound", "WEM/WFM", "Tech Design/Arch Review", "Vision Clip", "Other"],
        "Genesys Engage": ["API Support", "AppFoundry Support", "Business Consulting", "Cloud Migrations", "Data Privacy & Security", "Demo Advanced", "EWM (Work Item Routing)", "Latitude/Collections", "POC/Pilot", "Predictive Engagement (Altocloud)", "PureBridge (Don't forget your DSR)", "RFP Advanced", "Service Automation (Self-Service, IVR BOT's)", "Outbound", "WEM/WFM", "Tech Design/Arch Review", "Vision Clip", "Other"],
        "Genesys Engage Cloud": ["API Support", "AppFoundry Support", "Business Consulting", "Cloud Migrations", "Data Privacy & Security", "Demo Advanced", "EWM (Work Item Routing)", "Latitude/Collections", "POC/Pilot", "Predictive Engagement (Altocloud)", "PureBridge (Don't forget your DSR)", "RFP Advanced", "Service Automation (Self-Service, IVR BOT's)", "Outbound", "WEM/WFM", "Tech Design/Arch Review", "Vision Clip", "Other"],
        "PureConnect": ["API Support", "AppFoundry Support", "Business Consulting", "Cloud Migrations", "Data Privacy & Security", "Demo Advanced", "EWM (Work Item Routing)", "POC/Pilot", "PureBridge (Don't forget your DSR)", "RFP Advanced", "Service Automation (Self-Service, IVR BOT's)", "Outbound", "WEM/WFM", "Tech Design/Arch Review", "Other"]

    }
}
*/

let requestsType = {
    "Demo & Trial Support": ["Test Drive (Trial)", "POCs, Pilots for Strategic Opps", "Innovation (Integration, Tailored Demos, Vision Clips)"],
    "Opportunity Support": ["Technical Design / Architecture Review", "MultiCloud", "RFP", "Other Commercial Support"],
    "Security Support": [],
    "Privacy Support": [],
    "Strategic Business Consulting": [],
    "Specialist Engagement": ["PureBridge", "Cloud Migration", "Self-Service Automation", "Digital AI", "WEM", "API (Platform/AppFoundry)", "Must Win Opportunity Engagement", "Other"],
    "Enablement": ["Partner Summits, Events, Webinars", "Partner End-to-End Enablement", "Partner Technical Enablement", "Internal SC/AE Enablement"],
    "Critical Situation Support": [],
    "Other Request": []
}
