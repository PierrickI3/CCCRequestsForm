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
  EMEA: ['Central', 'North', 'South', '5th Region'],
  LATAM: ['Andean', 'Brazil', 'Mexico', 'Southern-Cone'],
  NA: ['East', 'Central', 'West', 'Canada', 'Government', 'Velocity', 'Channels', '5th Region'],
};

let requestsType = {
  'Critical Situation Support': [],
  'Customer Success Program': ['General Questions', 'Specific Service Element Questions'],
  'Demo & Trial Support': ['Free Trials Process Related', 'Innovation (Integrations, Tailored Demos, Vision Clips)', 'POCs, Pilots for Strategic Opps', 'Use Case Automation tool Questions'],
  Enablement: ['Internal SC/AE Enablement', 'Partner End-to-End Enablement', 'Partner Summits, Events, Webinars', 'Partner Technical Enablement'],
  'Opportunity Support': ['Technical Design / Architecture Review', 'Other Commercial Support'],
  'Privacy Support': ['Questionnaires/Assessments/Audits', 'Other'],
  Roadmap: [],
  'Subscription Extension': [],
  'Security Support': ['Questionnaires/Assessments/Audits', 'Other'],
  'Specialist Engagement': ['API (Platform/AppFoundry)', 'AppFoundry', 'Cloud Migration', 'Digital AI', 'MultiCloud', 'Must Win Opportunity Engagement', 'Predictive Engagement', 'PureBridge', 'Self-Service Automation', 'WEM', 'Outbound', 'Other'],
  'Strategic Business Consulting': ['CX Whitespace', 'Help with Financial Analysis (TCO/ROI)', 'Industry Expertise'],
  'Other Request': [],
};

let requestCategory = ['Critical Situation Support', 'Customer Success Program', 'Demo & Trial Support', 'Enablement', 'Opportunity Support', 'Privacy Support', 'Roadmap', 'Security Support', 'Specialist Engagement', 'Strategic Business Consulting', 'Subscription Extension', 'Other Request'];

let taskStatus = ['Pending', 'Waiting for info', 'In progress', 'Completed'];

let supportedBYOCCloudCarriers = {
  US: [
    {
      name: 'AT&T',
      url: 'https://www.business.att.com/products/ip-toll-free.html',
    },
    {
      name: 'Bandwidth.com',
      url: 'https://www.bandwidth.com/',
    },
    {
      name: 'CenturyLink/Level 3',
      url: 'https://www.centurylink.com/business/voice/voice-complete.html',
    },
    {
      name: 'Nexmo (Vonage)',
      url: 'https://www.nexmo.com/',
    },
    {
      name: 'R-Squared',
      url: 'http://www.rsquaredtelecom.com/',
    },
    {
      name: 'Twillio US',
      url: 'https://www.twilio.com/',
    },
  ],
  EU: [
    {
      name: 'BT Spain',
      url: 'https://www.bt.com/',
    },
    {
      name: 'CenturyLink/Level 3',
      url: 'https://www.centurylink.com/business/voice/voice-complete.html',
    },
    {
      name: 'Cheapnet',
      url: 'https://www.cheapnet.it/',
    },
    {
      name: 'Colt',
      url: 'https://www.colt.net/',
    },
    {
      name: 'Deutsche Telefon',
      url: 'https://www.deutsche-telefon.de/',
    },
    {
      name: 'Dialoga',
      url: 'https://dialogagroup.com/',
    },
    {
      name: 'Telefonica Spain',
      url: 'https://www.telefonica.com/en/',
    },
    {
      name: 'Telenor',
      url: 'https://www.telenor.com/',
    },
    {
      name: 'Tenios',
      url: 'https://www.tenios.de/en/sip-trunk',
    },
    {
      name: 'Twillio EU',
      url: 'https://www.twilio.com/',
    },
    {
      name: 'Voxbone',
      url: 'https://www.voxbone.com/',
    },
    {
      name: 'Voxogo',
      url: 'https://voxogo.com/',
    },
    {
      name: 'Voz.com',
      url: 'https://voz.com',
    },
  ],
  AP: [
    {
      name: 'Summit IT',
      url: 'https://summitinternet.com.au/voice/voip-sip-trunks/',
    },
  ],
};

let countries = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE', gcv: true },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Bouvet Island', code: 'BV' },
  { name: 'Brazil', code: 'BR' },
  { name: 'British Indian Ocean Territory', code: 'IO' },
  { name: 'Brunei Darussalam', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA', gcv: true },
  { name: 'Cape Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' },
  { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Christmas Island', code: 'CX' },
  { name: 'Cocos (Keeling) Islands', code: 'CC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Congo', code: 'CG' },
  { name: 'The Democratic Republic of the Congo', code: 'CD' },
  { name: 'Cook Islands', code: 'CK' },
  { name: 'Costa Rica', code: 'CR' },
  { name: "Cote D'Ivoire", code: 'CI' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK', gcv: true },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI', gcv: true },
  { name: 'France', code: 'FR', gcv: true },
  { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'French Southern Territories', code: 'TF' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE', gcv: true },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
  { name: 'Holy See (Vatican City State)', code: 'VA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran, Islamic Republic Of', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE', gcv: true },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: "Democratic People's Republic of Korea", code: 'KP' },
  { name: 'Republic of Korea', code: 'KR' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: "Lao People's Democratic Republic", code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Macao', code: 'MO' },
  { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Federated States of Micronesia', code: 'FM' },
  { name: 'Moldova, Republic of', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL', gcv: true },
  { name: 'Netherlands Antilles', code: 'AN' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Norway', code: 'NO', gcv: true },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Occupied Palestinian Territory', code: 'PS' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Pitcairn', code: 'PN' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Reunion', code: 'RE' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'RWANDA', code: 'RW' },
  { name: 'Saint Helena', code: 'SH' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Pierre and Miquelon', code: 'PM' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Sao Tome and Principe', code: 'ST' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia and Montenegro', code: 'CS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  { name: 'Spain', code: 'ES', gcv: true },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  { name: 'Swaziland', code: 'SZ' },
  { name: 'Sweden', code: 'SE', gcv: true },
  { name: 'Switzerland', code: 'CH', gcv: true },
  { name: 'Syrian Arab Republic', code: 'SY' },
  { name: 'Taiwan (Province of China)', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'United Republic of Tanzania', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tokelau', code: 'TK' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Turks and Caicos Islands', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB', gcv: true },
  { name: 'United States', code: 'US', gcv: true },
  { name: 'United States Minor Outlying Islands', code: 'UM' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Viet Nam', code: 'VN' },
  { name: 'British Virgin Islands', code: 'VG' },
  { name: 'U.S. Virgin Islands', code: 'VI' },
  { name: 'Wallis and Futuna', code: 'WF' },
  { name: 'Western Sahara', code: 'EH' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' },
];

let languages = {
  af_NA: 'Afrikaans (Namibia)',
  af_ZA: 'Afrikaans (South Africa)',
  af: 'Afrikaans',
  ak_GH: 'Akan (Ghana)',
  ak: 'Akan',
  sq_AL: 'Albanian (Albania)',
  sq: 'Albanian',
  am_ET: 'Amharic (Ethiopia)',
  am: 'Amharic',
  ar_DZ: 'Arabic (Algeria)',
  ar_BH: 'Arabic (Bahrain)',
  ar_EG: 'Arabic (Egypt)',
  ar_IQ: 'Arabic (Iraq)',
  ar_JO: 'Arabic (Jordan)',
  ar_KW: 'Arabic (Kuwait)',
  ar_LB: 'Arabic (Lebanon)',
  ar_LY: 'Arabic (Libya)',
  ar_MA: 'Arabic (Morocco)',
  ar_OM: 'Arabic (Oman)',
  ar_QA: 'Arabic (Qatar)',
  ar_SA: 'Arabic (Saudi Arabia)',
  ar_SD: 'Arabic (Sudan)',
  ar_SY: 'Arabic (Syria)',
  ar_TN: 'Arabic (Tunisia)',
  ar_AE: 'Arabic (United Arab Emirates)',
  ar_YE: 'Arabic (Yemen)',
  ar: 'Arabic',
  hy_AM: 'Armenian (Armenia)',
  hy: 'Armenian',
  as_IN: 'Assamese (India)',
  as: 'Assamese',
  asa_TZ: 'Asu (Tanzania)',
  asa: 'Asu',
  az_Cyrl: 'Azerbaijani (Cyrillic)',
  az_Cyrl_AZ: 'Azerbaijani (Cyrillic, Azerbaijan)',
  az_Latn: 'Azerbaijani (Latin)',
  az_Latn_AZ: 'Azerbaijani (Latin, Azerbaijan)',
  az: 'Azerbaijani',
  bm_ML: 'Bambara (Mali)',
  bm: 'Bambara',
  eu_ES: 'Basque (Spain)',
  eu: 'Basque',
  be_BY: 'Belarusian (Belarus)',
  be: 'Belarusian',
  bem_ZM: 'Bemba (Zambia)',
  bem: 'Bemba',
  bez_TZ: 'Bena (Tanzania)',
  bez: 'Bena',
  bn_BD: 'Bengali (Bangladesh)',
  bn_IN: 'Bengali (India)',
  bn: 'Bengali',
  bs_BA: 'Bosnian (Bosnia and Herzegovina)',
  bs: 'Bosnian',
  bg_BG: 'Bulgarian (Bulgaria)',
  bg: 'Bulgarian',
  my_MM: 'Burmese (Myanmar [Burma])',
  my: 'Burmese',
  yue_Hant_HK: 'Cantonese (Traditional, Hong Kong SAR China)',
  ca_ES: 'Catalan (Spain)',
  ca: 'Catalan',
  tzm_Latn: 'Central Morocco Tamazight (Latin)',
  tzm_Latn_MA: 'Central Morocco Tamazight (Latin, Morocco)',
  tzm: 'Central Morocco Tamazight',
  chr_US: 'Cherokee (United States)',
  chr: 'Cherokee',
  cgg_UG: 'Chiga (Uganda)',
  cgg: 'Chiga',
  zh_Hans: 'Chinese (Simplified Han)',
  zh_Hans_CN: 'Chinese (Simplified Han, China)',
  zh_Hans_HK: 'Chinese (Simplified Han, Hong Kong SAR China)',
  zh_Hans_MO: 'Chinese (Simplified Han, Macau SAR China)',
  zh_Hans_SG: 'Chinese (Simplified Han, Singapore)',
  zh_Hant: 'Chinese (Traditional Han)',
  zh_Hant_HK: 'Chinese (Traditional Han, Hong Kong SAR China)',
  zh_Hant_MO: 'Chinese (Traditional Han, Macau SAR China)',
  zh_Hant_TW: 'Chinese (Traditional Han, Taiwan)',
  zh: 'Chinese',
  kw_GB: 'Cornish (United Kingdom)',
  kw: 'Cornish',
  hr_HR: 'Croatian (Croatia)',
  hr: 'Croatian',
  cs_CZ: 'Czech (Czech Republic)',
  cs: 'Czech',
  da_DK: 'Danish (Denmark)',
  da: 'Danish',
  nl_BE: 'Dutch (Belgium)',
  nl_NL: 'Dutch (Netherlands)',
  nl: 'Dutch',
  ebu_KE: 'Embu (Kenya)',
  ebu: 'Embu',
  en_AS: 'English (American Samoa)',
  en_AU: 'English (Australia)',
  en_BE: 'English (Belgium)',
  en_BZ: 'English (Belize)',
  en_BW: 'English (Botswana)',
  en_CA: 'English (Canada)',
  en_GU: 'English (Guam)',
  en_HK: 'English (Hong Kong SAR China)',
  en_IN: 'English (India)',
  en_IE: 'English (Ireland)',
  en_IL: 'English (Israel)',
  en_JM: 'English (Jamaica)',
  en_MT: 'English (Malta)',
  en_MH: 'English (Marshall Islands)',
  en_MU: 'English (Mauritius)',
  en_NA: 'English (Namibia)',
  en_NZ: 'English (New Zealand)',
  en_MP: 'English (Northern Mariana Islands)',
  en_PK: 'English (Pakistan)',
  en_PH: 'English (Philippines)',
  en_SG: 'English (Singapore)',
  en_ZA: 'English (South Africa)',
  en_TT: 'English (Trinidad and Tobago)',
  en_UM: 'English (U.S. Minor Outlying Islands)',
  en_VI: 'English (U.S. Virgin Islands)',
  en_GB: 'English (United Kingdom)',
  en_US: 'English (United States)',
  en_ZW: 'English (Zimbabwe)',
  en: 'English',
  eo: 'Esperanto',
  et_EE: 'Estonian (Estonia)',
  et: 'Estonian',
  ee_GH: 'Ewe (Ghana)',
  ee_TG: 'Ewe (Togo)',
  ee: 'Ewe',
  fo_FO: 'Faroese (Faroe Islands)',
  fo: 'Faroese',
  fil_PH: 'Filipino (Philippines)',
  fil: 'Filipino',
  fi_FI: 'Finnish (Finland)',
  fi: 'Finnish',
  fr_BE: 'French (Belgium)',
  fr_BJ: 'French (Benin)',
  fr_BF: 'French (Burkina Faso)',
  fr_BI: 'French (Burundi)',
  fr_CM: 'French (Cameroon)',
  fr_CA: 'French (Canada)',
  fr_CF: 'French (Central African Republic)',
  fr_TD: 'French (Chad)',
  fr_KM: 'French (Comoros)',
  fr_CG: 'French (Congo - Brazzaville)',
  fr_CD: 'French (Congo - Kinshasa)',
  fr_CI: 'French (Côte d’Ivoire)',
  fr_DJ: 'French (Djibouti)',
  fr_GQ: 'French (Equatorial Guinea)',
  fr_FR: 'French (France)',
  fr_GA: 'French (Gabon)',
  fr_GP: 'French (Guadeloupe)',
  fr_GN: 'French (Guinea)',
  fr_LU: 'French (Luxembourg)',
  fr_MG: 'French (Madagascar)',
  fr_ML: 'French (Mali)',
  fr_MQ: 'French (Martinique)',
  fr_MC: 'French (Monaco)',
  fr_NE: 'French (Niger)',
  fr_RW: 'French (Rwanda)',
  fr_RE: 'French (Réunion)',
  fr_BL: 'French (Saint Barthélemy)',
  fr_MF: 'French (Saint Martin)',
  fr_SN: 'French (Senegal)',
  fr_CH: 'French (Switzerland)',
  fr_TG: 'French (Togo)',
  fr: 'French',
  ff_SN: 'Fulah (Senegal)',
  ff: 'Fulah',
  gl_ES: 'Galician (Spain)',
  gl: 'Galician',
  lg_UG: 'Ganda (Uganda)',
  lg: 'Ganda',
  ka_GE: 'Georgian (Georgia)',
  ka: 'Georgian',
  de_AT: 'German (Austria)',
  de_BE: 'German (Belgium)',
  de_DE: 'German (Germany)',
  de_LI: 'German (Liechtenstein)',
  de_LU: 'German (Luxembourg)',
  de_CH: 'German (Switzerland)',
  de: 'German',
  el_CY: 'Greek (Cyprus)',
  el_GR: 'Greek (Greece)',
  el: 'Greek',
  gu_IN: 'Gujarati (India)',
  gu: 'Gujarati',
  guz_KE: 'Gusii (Kenya)',
  guz: 'Gusii',
  ha_Latn: 'Hausa (Latin)',
  ha_Latn_GH: 'Hausa (Latin, Ghana)',
  ha_Latn_NE: 'Hausa (Latin, Niger)',
  ha_Latn_NG: 'Hausa (Latin, Nigeria)',
  ha: 'Hausa',
  haw_US: 'Hawaiian (United States)',
  haw: 'Hawaiian',
  he_IL: 'Hebrew (Israel)',
  he: 'Hebrew',
  hi_IN: 'Hindi (India)',
  hi: 'Hindi',
  hu_HU: 'Hungarian (Hungary)',
  hu: 'Hungarian',
  is_IS: 'Icelandic (Iceland)',
  is: 'Icelandic',
  ig_NG: 'Igbo (Nigeria)',
  ig: 'Igbo',
  id_ID: 'Indonesian (Indonesia)',
  id: 'Indonesian',
  ga_IE: 'Irish (Ireland)',
  ga: 'Irish',
  it_IT: 'Italian (Italy)',
  it_CH: 'Italian (Switzerland)',
  it: 'Italian',
  ja_JP: 'Japanese (Japan)',
  ja: 'Japanese',
  kea_CV: 'Kabuverdianu (Cape Verde)',
  kea: 'Kabuverdianu',
  kab_DZ: 'Kabyle (Algeria)',
  kab: 'Kabyle',
  kl_GL: 'Kalaallisut (Greenland)',
  kl: 'Kalaallisut',
  kln_KE: 'Kalenjin (Kenya)',
  kln: 'Kalenjin',
  kam_KE: 'Kamba (Kenya)',
  kam: 'Kamba',
  kn_IN: 'Kannada (India)',
  kn: 'Kannada',
  kk_Cyrl: 'Kazakh (Cyrillic)',
  kk_Cyrl_KZ: 'Kazakh (Cyrillic, Kazakhstan)',
  kk: 'Kazakh',
  km_KH: 'Khmer (Cambodia)',
  km: 'Khmer',
  ki_KE: 'Kikuyu (Kenya)',
  ki: 'Kikuyu',
  rw_RW: 'Kinyarwanda (Rwanda)',
  rw: 'Kinyarwanda',
  kok_IN: 'Konkani (India)',
  kok: 'Konkani',
  ko_KR: 'Korean (South Korea)',
  ko: 'Korean',
  khq_ML: 'Koyra Chiini (Mali)',
  khq: 'Koyra Chiini',
  ses_ML: 'Koyraboro Senni (Mali)',
  ses: 'Koyraboro Senni',
  lag_TZ: 'Langi (Tanzania)',
  lag: 'Langi',
  lv_LV: 'Latvian (Latvia)',
  lv: 'Latvian',
  lt_LT: 'Lithuanian (Lithuania)',
  lt: 'Lithuanian',
  luo_KE: 'Luo (Kenya)',
  luo: 'Luo',
  luy_KE: 'Luyia (Kenya)',
  luy: 'Luyia',
  mk_MK: 'Macedonian (Macedonia)',
  mk: 'Macedonian',
  jmc_TZ: 'Machame (Tanzania)',
  jmc: 'Machame',
  kde_TZ: 'Makonde (Tanzania)',
  kde: 'Makonde',
  mg_MG: 'Malagasy (Madagascar)',
  mg: 'Malagasy',
  ms_BN: 'Malay (Brunei)',
  ms_MY: 'Malay (Malaysia)',
  ms: 'Malay',
  ml_IN: 'Malayalam (India)',
  ml: 'Malayalam',
  mt_MT: 'Maltese (Malta)',
  mt: 'Maltese',
  gv_GB: 'Manx (United Kingdom)',
  gv: 'Manx',
  mr_IN: 'Marathi (India)',
  mr: 'Marathi',
  mas_KE: 'Masai (Kenya)',
  mas_TZ: 'Masai (Tanzania)',
  mas: 'Masai',
  mer_KE: 'Meru (Kenya)',
  mer: 'Meru',
  mfe_MU: 'Morisyen (Mauritius)',
  mfe: 'Morisyen',
  naq_NA: 'Nama (Namibia)',
  naq: 'Nama',
  ne_IN: 'Nepali (India)',
  ne_NP: 'Nepali (Nepal)',
  ne: 'Nepali',
  nd_ZW: 'North Ndebele (Zimbabwe)',
  nd: 'North Ndebele',
  nb_NO: 'Norwegian Bokmål (Norway)',
  nb: 'Norwegian Bokmål',
  nn_NO: 'Norwegian Nynorsk (Norway)',
  nn: 'Norwegian Nynorsk',
  nyn_UG: 'Nyankole (Uganda)',
  nyn: 'Nyankole',
  or_IN: 'Oriya (India)',
  or: 'Oriya',
  om_ET: 'Oromo (Ethiopia)',
  om_KE: 'Oromo (Kenya)',
  om: 'Oromo',
  ps_AF: 'Pashto (Afghanistan)',
  ps: 'Pashto',
  fa_AF: 'Persian (Afghanistan)',
  fa_IR: 'Persian (Iran)',
  fa: 'Persian',
  pl_PL: 'Polish (Poland)',
  pl: 'Polish',
  pt_BR: 'Portuguese (Brazil)',
  pt_GW: 'Portuguese (Guinea-Bissau)',
  pt_MZ: 'Portuguese (Mozambique)',
  pt_PT: 'Portuguese (Portugal)',
  pt: 'Portuguese',
  pa_Arab: 'Punjabi (Arabic)',
  pa_Arab_PK: 'Punjabi (Arabic, Pakistan)',
  pa_Guru: 'Punjabi (Gurmukhi)',
  pa_Guru_IN: 'Punjabi (Gurmukhi, India)',
  pa: 'Punjabi',
  ro_MD: 'Romanian (Moldova)',
  ro_RO: 'Romanian (Romania)',
  ro: 'Romanian',
  rm_CH: 'Romansh (Switzerland)',
  rm: 'Romansh',
  rof_TZ: 'Rombo (Tanzania)',
  rof: 'Rombo',
  ru_MD: 'Russian (Moldova)',
  ru_RU: 'Russian (Russia)',
  ru_UA: 'Russian (Ukraine)',
  ru: 'Russian',
  rwk_TZ: 'Rwa (Tanzania)',
  rwk: 'Rwa',
  saq_KE: 'Samburu (Kenya)',
  saq: 'Samburu',
  sg_CF: 'Sango (Central African Republic)',
  sg: 'Sango',
  seh_MZ: 'Sena (Mozambique)',
  seh: 'Sena',
  sr_Cyrl: 'Serbian (Cyrillic)',
  sr_Cyrl_BA: 'Serbian (Cyrillic, Bosnia and Herzegovina)',
  sr_Cyrl_ME: 'Serbian (Cyrillic, Montenegro)',
  sr_Cyrl_RS: 'Serbian (Cyrillic, Serbia)',
  sr_Latn: 'Serbian (Latin)',
  sr_Latn_BA: 'Serbian (Latin, Bosnia and Herzegovina)',
  sr_Latn_ME: 'Serbian (Latin, Montenegro)',
  sr_Latn_RS: 'Serbian (Latin, Serbia)',
  sr: 'Serbian',
  sn_ZW: 'Shona (Zimbabwe)',
  sn: 'Shona',
  ii_CN: 'Sichuan Yi (China)',
  ii: 'Sichuan Yi',
  si_LK: 'Sinhala (Sri Lanka)',
  si: 'Sinhala',
  sk_SK: 'Slovak (Slovakia)',
  sk: 'Slovak',
  sl_SI: 'Slovenian (Slovenia)',
  sl: 'Slovenian',
  xog_UG: 'Soga (Uganda)',
  xog: 'Soga',
  so_DJ: 'Somali (Djibouti)',
  so_ET: 'Somali (Ethiopia)',
  so_KE: 'Somali (Kenya)',
  so_SO: 'Somali (Somalia)',
  so: 'Somali',
  es_AR: 'Spanish (Argentina)',
  es_BO: 'Spanish (Bolivia)',
  es_CL: 'Spanish (Chile)',
  es_CO: 'Spanish (Colombia)',
  es_CR: 'Spanish (Costa Rica)',
  es_DO: 'Spanish (Dominican Republic)',
  es_EC: 'Spanish (Ecuador)',
  es_SV: 'Spanish (El Salvador)',
  es_GQ: 'Spanish (Equatorial Guinea)',
  es_GT: 'Spanish (Guatemala)',
  es_HN: 'Spanish (Honduras)',
  es_419: 'Spanish (Latin America)',
  es_MX: 'Spanish (Mexico)',
  es_NI: 'Spanish (Nicaragua)',
  es_PA: 'Spanish (Panama)',
  es_PY: 'Spanish (Paraguay)',
  es_PE: 'Spanish (Peru)',
  es_PR: 'Spanish (Puerto Rico)',
  es_ES: 'Spanish (Spain)',
  es_US: 'Spanish (United States)',
  es_UY: 'Spanish (Uruguay)',
  es_VE: 'Spanish (Venezuela)',
  es: 'Spanish',
  sw_KE: 'Swahili (Kenya)',
  sw_TZ: 'Swahili (Tanzania)',
  sw: 'Swahili',
  sv_FI: 'Swedish (Finland)',
  sv_SE: 'Swedish (Sweden)',
  sv: 'Swedish',
  gsw_CH: 'Swiss German (Switzerland)',
  gsw: 'Swiss German',
  shi_Latn: 'Tachelhit (Latin)',
  shi_Latn_MA: 'Tachelhit (Latin, Morocco)',
  shi_Tfng: 'Tachelhit (Tifinagh)',
  shi_Tfng_MA: 'Tachelhit (Tifinagh, Morocco)',
  shi: 'Tachelhit',
  dav_KE: 'Taita (Kenya)',
  dav: 'Taita',
  ta_IN: 'Tamil (India)',
  ta_LK: 'Tamil (Sri Lanka)',
  ta: 'Tamil',
  te_IN: 'Telugu (India)',
  te: 'Telugu',
  teo_KE: 'Teso (Kenya)',
  teo_UG: 'Teso (Uganda)',
  teo: 'Teso',
  th_TH: 'Thai (Thailand)',
  th: 'Thai',
  bo_CN: 'Tibetan (China)',
  bo_IN: 'Tibetan (India)',
  bo: 'Tibetan',
  ti_ER: 'Tigrinya (Eritrea)',
  ti_ET: 'Tigrinya (Ethiopia)',
  ti: 'Tigrinya',
  to_TO: 'Tonga (Tonga)',
  to: 'Tonga',
  tr_TR: 'Turkish (Turkey)',
  tr: 'Turkish',
  uk_UA: 'Ukrainian (Ukraine)',
  uk: 'Ukrainian',
  ur_IN: 'Urdu (India)',
  ur_PK: 'Urdu (Pakistan)',
  ur: 'Urdu',
  uz_Arab: 'Uzbek (Arabic)',
  uz_Arab_AF: 'Uzbek (Arabic, Afghanistan)',
  uz_Cyrl: 'Uzbek (Cyrillic)',
  uz_Cyrl_UZ: 'Uzbek (Cyrillic, Uzbekistan)',
  uz_Latn: 'Uzbek (Latin)',
  uz_Latn_UZ: 'Uzbek (Latin, Uzbekistan)',
  uz: 'Uzbek',
  vi_VN: 'Vietnamese (Vietnam)',
  vi: 'Vietnamese',
  vun_TZ: 'Vunjo (Tanzania)',
  vun: 'Vunjo',
  cy_GB: 'Welsh (United Kingdom)',
  cy: 'Welsh',
  yo_NG: 'Yoruba (Nigeria)',
  yo: 'Yoruba',
  zu_ZA: 'Zulu (South Africa)',
  zu: 'Zulu',
};

let telephonyModel = {
  GCV: 'Genesys Cloud Voice',
  BYOCCloud: 'BYOC Cloud (no GCV)',
  BYOCCloudAndGCV: 'BYOC Cloud & GCV mix',
  BYOCPremiseWithVirtualEdges: 'BYOC Premise w/ Virtual Edge',
  BYOCPremiseWithAppliance: 'BYOC Premise w/ Appliance',
};
