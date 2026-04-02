import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiArrowLeft, FiX, FiRefreshCcw } from "react-icons/fi";
import { Crown } from "lucide-react";
import { createNomination, fetchNominationById, updateUserNomination } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getAwardName } from "../utils/brand.js";

const fieldMap = {
  "Healthcare": {
    "Hospitals & Healthcare Institutions": {
      "Overall Excellence": [
        "Hospital of the Year",
        "Multi-Specialty Hospital of the Year",
        "Super Specialty Hospital of the Year",
        "Emerging Hospital of the Year",
        "Most Trusted Hospital Brand",
        "Excellence in Patient Care Award",
        "Healthcare Excellence Institution Award"
      ],
      "Government & Public Healthcare": [
        "Best Government Hospital",
        "Best District Hospital",
        "Excellence in Public Healthcare Services",
        "Rural Healthcare Excellence Award",
        "Best Medical College Hospital"
      ],
      "Private Healthcare": [
        "Best Private Hospital",
        "Best Corporate Hospital Chain",
        "Excellence in Affordable Healthcare",
        "Best NABH Accredited Hospital",
        "Excellence in International Patient Care"
      ],
      "Specialty-Based Excellence": [
        "Best Cardiology Hospital",
        "Best Oncology Hospital",
        "Best Orthopedic Hospital",
        "Best Neurology & Neurosurgery Hospital",
        "Best Pediatric Hospital",
        "Best Women & Maternity Hospital",
        "Best IVF & Fertility Center",
        "Best Gastroenterology Hospital",
        "Best Urology & Nephrology Center",
        "Best Dermatology & Cosmetic Center"
      ],
      "Digital & Smart Healthcare": [
        "Excellence in Digital Healthcare",
        "Best Telemedicine Initiative",
        "Best AI in Healthcare Implementation",
        "Smart Hospital of the Year",
        "Innovation in Health IT Award",
        "Best Hospital Management System Implementation"
      ],
      "Global & Medical Tourism": [
        "Best Medical Tourism Hospital",
        "Excellence in International Patient Services",
        "Global Healthcare Brand Award",
        "Best Cross-Border Healthcare Initiative"
      ],
      "Sustainability & Social Impact": [
        "Green & Sustainable Hospital Award",
        "Community Healthcare Initiative Award",
        "Excellence in Rural Health Outreach",
        "Women & Child Healthcare Impact Award",
        "Healthcare for Underserved Communities Award"
      ]
    },
    "Clinics & Specialized Centers": {
      "Specialty Clinics": [
        "Best Dental Clinic",
        "Best Eye Care Clinic",
        "Best Physiotherapy Center",
        "Best Skin & Cosmetic Clinic",
        "Best Fertility Clinic",
        "Best Dialysis Center",
        "Best Diagnostic & Imaging Center"
      ],
      "Diagnostic & Pathology": [
        "Best Pathology Lab",
        "Best Radiology & Imaging Center",
        "Best Molecular Diagnostic Lab",
        "Excellence in Preventive Healthcare"
      ]
    },
    "Healthcare Education & Training Institutes": {
      "Medical Education": [
        "Best Medical College",
        "Best Nursing College",
        "Best Paramedical Institute",
        "Excellence in Medical Research Institute",
        "Best Healthcare Skill Development Institute"
      ],
      "Research & Innovation": [
        "Excellence in Clinical Research",
        "Best Medical Innovation Award",
        "Breakthrough Healthcare Research Award",
        "Excellence in Public Health Research"
      ]
    },
    "Pharma & Medical Devices": {
      "Pharmaceutical Excellence": [
        "Best Pharma Company of the Year",
        "Most Innovative Pharmaceutical Brand",
        "Excellence in Generic Medicines",
        "Excellence in Vaccine Development",
        "Excellence in Biotechnology Innovation"
      ],
      "Medical Devices & Equipment": [
        "Best Medical Device Manufacturer",
        "Excellence in Surgical Equipment Innovation",
        "Best Diagnostic Equipment Company",
        "Innovation in Health Technology Award"
      ]
    },
    "Individual Healthcare Awards": {
      "Doctors & Surgeons": [
        "Doctor of the Year",
        "Surgeon of the Year",
        "Young Doctor of the Year",
        "Lifetime Achievement in Healthcare",
        "Excellence in Patient Care Award"
      ],
      "Nursing & Allied Health": [
        "Nurse of the Year",
        "Paramedic of the Year",
        "Healthcare Hero Award",
        "Community Health Worker of the Year"
      ],
      "Research & Innovation Leaders": [
        "Healthcare Innovator of the Year",
        "Medical Researcher of the Year",
        "Public Health Leader Award"
      ]
    },
    "Digital Health & HealthTech": {
      "HealthTech Companies": [
        "Best HealthTech Startup",
        "Most Innovative HealthTech Platform",
        "Best AI-Based Diagnostic Platform",
        "Best Health App of the Year",
        "Excellence in Remote Patient Monitoring"
      ],
      "Data & Analytics": [
        "Excellence in Healthcare Data Analytics",
        "Best Predictive Healthcare Platform",
        "Innovation in Electronic Health Records"
      ]
    },
    "Special Recognition Awards": {
      "General": [
        "Healthcare Icon of the Year",
        "Global Healthcare Excellence Award",
        "Women Leader in Healthcare Award",
        "Emerging Healthcare Leader Award",
        "Excellence in Humanitarian Healthcare",
        "Pandemic Response Excellence Award"
      ]
    }
  },
  "Education": {
    "University Categories": {
      "Overall Excellence": [
        "University of the Year",
        "Emerging University of the Year",
        "Best Private University",
        "Best Government / Public University",
        "Best Deemed-to-be University",
        "Best International University (India / Asia / Global)",
        "Excellence in Higher Education Award",
        "University of the Year (India)",
        "Excellence in Higher Education – India",
        "Most Trusted University Brand (India)",
        "Outstanding Vice-Chancellor Leadership Award"
      ],
      "Internationalization": [
        "Excellence in Global Education",
        "Best International Collaboration",
        "Best Student Exchange Program",
        "Excellence in Study Abroad Programs",
        "Best Foreign University Collaboration",
        "Global Collaboration Excellence (India)",
        "Best International Student Support University",
        "Study in India Excellence Award",
        "International Research Partnerships Award"
      ],
      "Research & Innovation": [
        "Excellence in Research & Development",
        "Best Research University",
        "Innovation & Technology Excellence Award",
        "Best Patent & Intellectual Property Initiative",
        "Best Incubation & Startup Support University",
        "Excellence in Industry-Academia Collaboration",
        "Research & Innovation Excellence Award",
        "Best Doctoral & Research University",
        "Faculty Excellence Award",
        "Interdisciplinary Education Excellence"
      ],
      "Digital & Online Education": [
        "Excellence in Digital Learning",
        "Best Online University / Program",
        "Excellence in EdTech Integration",
        "Best Learning Management System (LMS)",
        "Digital University of the Year",
        "Best Online & Blended Learning University",
        "Innovation in EdTech Integration",
        "Innovation in Blended Learning",
        "AI & Technology-Enabled Campus",
        "Smart & Digital Campus Excellence"
      ]
    },
    "College Categories": {
      "By Type of Institution": [
        "Best Government College",
        "Best Private College",
        "Best Autonomous College",
        "Best Deemed-to-be University College",
        "Best International College",
        "Best Emerging College"
      ],
      "Science & Technology": [
        "Best Science College",
        "Best Engineering College",
        "Best Polytechnic College",
        "Best Research-Oriented College",
        "Best Innovation & R&D College"
      ],
      "Management & Commerce": [
        "Best Management / MBA College",
        "Best Commerce College",
        "Best Business School",
        "Best Entrepreneurship-Focused College"
      ],
      "Law & Public Policy": [
        "Best Law College",
        "Best Legal Education Institution",
        "Best Moot Court & Legal Training College"
      ],
      "Medical & Healthcare": [
        "Best Medical College",
        "Best Dental College",
        "Best Nursing College",
        "Best Pharmacy College",
        "Best Allied Health Sciences College",
        "Best Paramedical College"
      ]
    },
    "Vocational Institute": {
      "Healthcare & Paramedical": [
        "Paramedical Training Institutes",
        "Nursing Assistant & GNM Training Centers",
        "Medical Lab Technician (MLT) Institutes",
        "Radiology & Imaging Technician Institutes",
        "Emergency & Trauma Care Training Institutes",
        "Physiotherapy Assistant Training Centers",
        "Hospital Administration Vocational Institutes",
        "Pharmacy Technician Training Institutes",
        "Healthcare Skill Development Institutes"
      ],
      "Construction & Trades": [
        "Civil Construction Skill Training Institutes",
        "Plumbing & Sanitation Training Institutes",
        "Masonry & Tiling Training Centers",
        "Interior Design & Drafting Institutes",
        "Surveying & Land Measurement Institutes",
        "Heavy Equipment & Crane Operator Institutes",
        "Road & Infrastructure Skill Training Centers"
      ]
    },
    "School Categories": {
      "Early Years": [
        "Best Preschool / Kindergarten",
        "Excellence in Early Childhood Education",
        "Best Montessori School",
        "Best Play-Based Learning School"
      ],
      "Primary Education": [
        "Best Primary School",
        "Excellence in Foundational Literacy & Numeracy",
        "Best Value-Based Primary School",
        "Innovation in Primary Education"
      ],
      "Secondary & Senior Secondary": [
        "Best Secondary School",
        "Best Senior Secondary School",
        "Academic Excellence Award",
        "Best CBSE / ICSE / IB / IGCSE / State Board School",
        "Excellence in Board Results"
      ]
    },
    "EdTech Categories": {
      "Overall Excellence": [
        "Best EdTech Company of the Year – Global",
        "Most Innovative EdTech Brand",
        "Fastest Growing EdTech Company",
        "Excellence in Digital Learning Solutions",
        "Outstanding Contribution to Global Education"
      ],
      "Technology & Innovation": [
        "Best AI-Powered Learning Platform",
        "Best Adaptive / Personalized Learning Solution",
        "Best LMS (Learning Management System)",
        "Best AR/VR Learning Technology",
        "Best Gamified Learning Platform"
      ]
    },
    "Individual Categories": {
      "Academic Leadership": [
        "Global Education Leader of the Year",
        "Visionary Academic Director of the Year",
        "International School Principal of the Year",
        "University Chancellor / Vice Chancellor of the Year",
        "Education Administrator of the Year"
      ],
      "Teaching Excellence": [
        "Global Teacher of the Year",
        "Innovative Educator of the Year",
        "Outstanding Professor / Lecturer of the Year",
        "Early Childhood Educator of the Year",
        "STEM Educator of the Year"
      ]
    }
  },
  "Real Estate & Infrastructure": {
    "Overall Excellence": {
      "General": [
        "Real Estate Company of the Year",
        "Infrastructure Company of the Year",
        "Emerging Real Estate Brand",
        "Most Trusted Real Estate Developer",
        "Excellence in Urban Development",
        "Outstanding Contribution to Infrastructure Growth"
      ]
    },
    "Residential Projects": {
      "General": [
        "Best Luxury Residential Project",
        "Best Affordable Housing Project",
        "Best Gated Community Project",
        "Best Smart Residential Project",
        "Excellence in Sustainable Housing"
      ]
    },
    "Commercial & Mixed Use": {
      "General": [
        "Best Commercial Project of the Year",
        "Best IT Park / Business Park",
        "Best Retail & Shopping Mall Project",
        "Best Mixed-Use Development",
        "Excellence in Corporate Infrastructure"
      ]
    },
    "Sustainable & Green Development": {
      "General": [
        "Green Building Project of the Year",
        "Sustainable Infrastructure Excellence Award",
        "Net-Zero Energy Building Award",
        "Eco-Friendly Real Estate Project",
        "Excellence in Environmental Sustainability"
      ]
    },
    "Innovation & Technology": {
      "General": [
        "Smart City Project of the Year",
        "Innovation in Construction Technology",
        "Best Use of AI & Automation in Real Estate",
        "PropTech Innovation Award",
        "Digital Transformation in Infrastructure Award"
      ]
    },
    "Construction & Engineering": {
      "General": [
        "Construction Company of the Year",
        "Best Civil Engineering Project",
        "Excellence in Structural Engineering",
        "Outstanding EPC Project Award",
        "Infrastructure Excellence in Transportation"
      ]
    },
    "Luxury & Premium Segment": {
      "General": [
        "Luxury Developer of the Year",
        "Ultra Luxury Project Award",
        "Premium Villa Project of the Year",
        "High-Rise Excellence Award"
      ]
    },
    "Leadership & Individual Awards": {
      "General": [
        "Real Estate Leader of the Year",
        "Young Developer of the Year",
        "Lifetime Achievement in Real Estate",
        "Women Leader in Infrastructure Award"
      ]
    },
    "Special Recognition": {
      "General": [
        "Iconic Real Estate Brand of the Decade",
        "Fastest Growing Real Estate Company",
        "Excellence in Customer Satisfaction",
        "Innovation in Affordable Housing Award"
      ]
    }
  },
  "Hospitality & Tourism": {
    "Overall Excellence": {
      "General": [
        "Hospitality Brand of the Year",
        "Tourism Company of the Year",
        "Best Hospitality Group",
        "Emerging Hospitality Brand",
        "Most Trusted Travel & Tourism Company",
        "Outstanding Contribution to Tourism Development"
      ]
    },
    "Hotels & Resorts": {
      "General": [
        "Best Luxury Hotel",
        "Best Boutique Hotel",
        "Best Business Hotel",
        "Best Resort Destination",
        "Best Eco Resort",
        "Best Heritage Hotel",
        "Best Budget Hotel Chain"
      ]
    },
    "Travel & Tour Operators": {
      "General": [
        "Best Travel Agency of the Year",
        "Best International Tour Operator",
        "Best Domestic Tour Operator",
        "Best Customized Travel Experience",
        "Excellence in Adventure Tourism",
        "Best Pilgrimage Tourism Company"
      ]
    },
    "Aviation & Cruise": {
      "General": [
        "Best Airline Service Provider",
        "Best Aviation Hospitality Service",
        "Best Cruise Line Experience",
        "Excellence in Airport Hospitality"
      ]
    },
    "Food & Beverage Excellence": {
      "General": [
        "Best Fine Dining Restaurant",
        "Best Multi-Cuisine Restaurant",
        "Best Hospitality F&B Brand",
        "Excellence in Culinary Innovation",
        "Chef of the Year"
      ]
    },
    "Sustainable & Responsible Tourism": {
      "General": [
        "Green Hospitality Award",
        "Sustainable Tourism Initiative of the Year",
        "Eco-Friendly Travel Brand",
        "Community-Based Tourism Excellence",
        "Responsible Tourism Leadership Award"
      ]
    },
    "Innovation & Digital Excellence": {
      "General": [
        "Digital Innovation in Hospitality Award",
        "Best Online Booking Platform",
        "AI-Powered Travel Experience Award",
        "Best Use of Technology in Tourism",
        "Smart Hospitality Initiative Award"
      ]
    },
    "Destination & Tourism Promotion": {
      "General": [
        "Best Tourism Board Initiative",
        "Best Destination Marketing Campaign",
        "Emerging Travel Destination Award",
        "Cultural Tourism Excellence Award",
        "Heritage Tourism Promotion Award"
      ]
    },
    "Leadership & Individual Awards": {
      "General": [
        "Hospitality Leader of the Year",
        "Young Hotelier of the Year",
        "Tourism Entrepreneur of the Year",
        "Lifetime Achievement in Hospitality",
        "Women Leader in Tourism Award"
      ]
    },
    "Special Recognition": {
      "General": [
        "Iconic Hospitality Brand of the Decade",
        "Fastest Growing Travel Company",
        "Excellence in Customer Experience",
        "Global Tourism Excellence Award"
      ]
    }
  },
  "Manufacturing & Industrial": {
    "Large Manufacturing Enterprises": {
      "Overall Excellence": [
        "Manufacturing Company of the Year",
        "Industrial Excellence Award",
        "Global Manufacturing Leader Award",
        "Excellence in Production Efficiency",
        "Outstanding Contribution to Industrial Growth"
      ],
      "Innovation & Technology": [
        "Smart Manufacturing Award",
        "Industry 4.0 Excellence Award",
        "Automation & Robotics Innovation Award",
        "AI in Manufacturing Excellence",
        "Digital Transformation in Industry Award"
      ],
      "Operational Excellence": [
        "Best Lean Manufacturing Initiative",
        "Six Sigma Excellence Award",
        "Supply Chain Excellence Award",
        "Quality Control Excellence Award",
        "Best Production Optimization Strategy"
      ]
    },
    "MSME & Emerging Manufacturers": {
      "Emerging Excellence": [
        "Emerging Manufacturing Company of the Year",
        "Fastest Growing Industrial Startup",
        "Innovation in MSME Manufacturing",
        "Best Make in India Initiative"
      ],
      "Sustainability & Impact": [
        "Green Manufacturing Award",
        "Energy Efficient Manufacturing Unit",
        "Waste Reduction & Circular Economy Award",
        "Sustainable Industrial Practices Award"
      ]
    },
    "Sector-Specific Manufacturing": {
      "Automobile & EV": [
        "Automobile Manufacturer of the Year",
        "EV Manufacturing Excellence Award",
        "Auto Component Manufacturer Award"
      ],
      "Pharmaceutical & Healthcare": [
        "Pharma Manufacturing Company of the Year",
        "Excellence in Medical Device Manufacturing",
        "Best API Manufacturing Unit"
      ],
      "Textile & Apparel": [
        "Textile Manufacturer of the Year",
        "Sustainable Fashion Production Award",
        "Garment Export Excellence Award"
      ],
      "Electronics & Semiconductor": [
        "Electronics Manufacturing Excellence Award",
        "Best Semiconductor Production Unit",
        "Innovation in Consumer Electronics Manufacturing"
      ],
      "Food & FMCG": [
        "Food Processing Excellence Award",
        "FMCG Manufacturing Brand of the Year",
        "Excellence in Quality & Safety Standards"
      ]
    },
    "Infrastructure & Heavy Industry": {
      "Construction & Engineering": [
        "Industrial Infrastructure Company of the Year",
        "Heavy Engineering Excellence Award",
        "Outstanding EPC Project Award",
        "Excellence in Civil & Structural Engineering"
      ],
      "Energy & Utilities": [
        "Renewable Energy Manufacturing Award",
        "Power Equipment Manufacturing Excellence",
        "Oil & Gas Industrial Excellence Award"
      ]
    },
    "Technology & Industrial Innovation": {
      "Research & Development": [
        "Industrial R&D Excellence Award",
        "Patent & Innovation Excellence Award",
        "Best Product Development Initiative"
      ],
      "Digital & Smart Solutions": [
        "IoT in Manufacturing Award",
        "Smart Factory of the Year",
        "Industrial Data Analytics Excellence Award"
      ]
    },
    "Workforce & Leadership": {
      "Leadership Awards": [
        "Industrial Leader of the Year",
        "Manufacturing CEO of the Year",
        "Young Industrial Entrepreneur Award",
        "Women Leader in Manufacturing Award"
      ],
      "Workforce Excellence": [
        "Best Workforce Development Program",
        "Excellence in Industrial Safety Standards",
        "Skill Development Excellence Award"
      ]
    },
    "Special Recognition": {
      "Brand & Legacy": [
        "Iconic Manufacturing Brand of the Decade",
        "Lifetime Achievement in Industrial Sector",
        "Global Industrial Excellence Award",
        "Make in India Champion Award"
      ]
    }
  },
  "Beauty & Wellness": {
    "Beauty Brands & Product Manufacturing": {
      "Overall Excellence": [
        "Beauty Brand of the Year",
        "Cosmetics Company of the Year",
        "Luxury Beauty Brand Award",
        "Emerging Beauty Startup Award",
        "Global Skincare Excellence Award",
        "Premium Makeup Brand of the Year",
        "Haircare Brand Excellence Award",
        "Personal Care Brand of the Year"
      ],
      "Product Innovation": [
        "Best Skincare Product",
        "Best Anti-Aging Innovation",
        "Best Organic Beauty Product",
        "Best Herbal Cosmetics Brand",
        "Clean Beauty Innovation Award",
        "Vegan Beauty Brand Award",
        "Dermatologically Tested Product Award",
        "Beauty Technology Innovation Award"
      ],
      "Sustainable & Ethical Beauty": [
        "Cruelty-Free Brand of the Year",
        "Eco-Friendly Packaging Innovation",
        "Sustainable Beauty Initiative Award",
        "Zero Waste Beauty Brand",
        "Green Cosmetic Manufacturing Award"
      ]
    },
    "Salons & Professional Beauty Services": {
      "Salon Excellence": [
        "Best Luxury Salon",
        "Best Unisex Salon",
        "Best Bridal Makeup Studio",
        "Best Hair Styling Studio",
        "Best Nail Art Studio",
        "Best Skin Treatment Salon",
        "Best Franchise Salon Chain",
        "Best Boutique Beauty Studio"
      ],
      "Professional Services": [
        "Best Makeup Artist of the Year",
        "Best Hair Stylist Award",
        "Best Bridal Artist Award",
        "Best Celebrity Makeup Artist",
        "Beauty Educator of the Year",
        "Salon Trainer Excellence Award"
      ]
    },
    "Aesthetic Clinics & Dermatology": {
      "Clinical Excellence": [
        "Best Cosmetic Clinic",
        "Best Dermatology Clinic",
        "Excellence in Laser Treatment",
        "Best Non-Surgical Aesthetic Clinic",
        "Plastic Surgery Excellence Award",
        "Best Skin Rejuvenation Clinic",
        "Advanced Facial Treatment Award"
      ],
      "Medical Innovation": [
        "Aesthetic Technology Innovation Award",
        "Best Anti-Aging Treatment Clinic",
        "Hair Transplant Excellence Award",
        "Best Cosmetic Dermatologist Award"
      ]
    },
    "Wellness & Holistic Health": {
      "Spa & Therapy": [
        "Best Luxury Spa",
        "Ayurveda Wellness Excellence Award",
        "Holistic Therapy Center of the Year",
        "Best Aromatherapy Spa",
        "Traditional Healing Excellence Award",
        "Best Destination Spa Award"
      ],
      "Fitness & Nutrition": [
        "Fitness Brand of the Year",
        "Best Gym Chain",
        "Best Yoga Institute",
        "Best Wellness Retreat",
        "Nutrition Brand Excellence Award",
        "Weight Management Program Award",
        "Personal Trainer of the Year"
      ],
      "Mental Wellness": [
        "Mental Wellness Initiative Award",
        "Wellness Coaching Excellence Award",
        "Corporate Wellness Program Award"
      ]
    },
    "Beauty Education & Training Institutes": {
      "Academy Excellence": [
        "Beauty Academy of the Year",
        "Best Cosmetology Institute",
        "Makeup Training Institute Excellence Award",
        "Hair Styling Training Excellence Award",
        "International Beauty Training Award",
        "Emerging Beauty Academy Award"
      ],
      "Skill Development": [
        "Skill Development Excellence in Beauty",
        "Best Online Beauty Training Platform",
        "Vocational Beauty Education Award"
      ]
    },
    "Luxury & Premium Segment": {
      "High-End Brands": [
        "Luxury Skincare Brand Award",
        "Premium Salon Chain of the Year",
        "Luxury Spa Destination Award",
        "Exclusive Beauty Experience Award"
      ]
    },
    "Digital & Influencer Impact": {
      "Online Presence": [
        "Best Beauty Influencer Award",
        "Beauty Content Creator of the Year",
        "Best Beauty YouTube Channel",
        "Best Beauty Instagram Brand",
        "Digital Beauty Campaign of the Year"
      ],
      "E-Commerce & Tech": [
        "Best Beauty E-Commerce Platform",
        "Beauty App Innovation Award",
        "AI-Based Beauty Solution Award"
      ]
    },
    "Leadership & Individual Awards": {
      "Entrepreneurship": [
        "Beauty Entrepreneur of the Year",
        "Wellness Startup Founder Award",
        "Young Beauty Innovator Award",
        "Women Leader in Beauty Award",
        "Global Wellness Leader Award"
      ],
      "Lifetime Honors": [
        "Lifetime Achievement in Beauty Industry",
        "Iconic Beauty Personality Award"
      ]
    },
    "Special Recognition": {
      "Brand & Legacy": [
        "Iconic Beauty Brand of the Decade",
        "Most Trusted Beauty Brand",
        "Fastest Growing Wellness Brand",
        "Customer Satisfaction Excellence Award"
      ]
    }
  },
  "Technology & Digital Transformation": {
    "IT & Software Companies": {
      "Overall Excellence": [
        "IT Company of the Year",
        "Software Company of the Year",
        "Global Tech Brand Award",
        "Fastest Growing IT Firm",
        "Enterprise Software Excellence Award",
        "Best SaaS Company of the Year",
        "Product-Based Tech Company Award",
        "Service-Based IT Company Award"
      ],
      "Custom & Enterprise Solutions": [
        "Best ERP Solution Provider",
        "Best CRM Solution Provider",
        "Best HR Tech Solution",
        "Best FinTech Software Provider",
        "Best HealthTech Platform",
        "Best EdTech Technology Provider",
        "Best GovTech Solution Award"
      ]
    },
    "Artificial Intelligence & Data Science": {
      "AI Excellence": [
        "AI Startup of the Year",
        "Best AI Innovation Award",
        "Machine Learning Excellence Award",
        "Generative AI Solution Award",
        "AI for Social Impact Award",
        "AI in Healthcare Excellence Award",
        "AI in Finance Innovation Award",
        "AI in Manufacturing Award"
      ],
      "Data & Analytics": [
        "Data Analytics Company of the Year",
        "Big Data Excellence Award",
        "Predictive Analytics Innovation Award",
        "Business Intelligence Excellence Award",
        "Data Security & Privacy Innovation Award",
        "Cloud Data Platform Excellence Award"
      ]
    },
    "Cybersecurity & Cloud Computing": {
      "Cybersecurity": [
        "Cybersecurity Company of the Year",
        "Best Network Security Solution",
        "Ethical Hacking Excellence Award",
        "Cloud Security Innovation Award",
        "Zero Trust Security Award",
        "Data Protection Excellence Award",
        "Cyber Defense Leadership Award"
      ],
      "Cloud & DevOps": [
        "Cloud Service Provider of the Year",
        "Best Cloud Migration Project",
        "DevOps Excellence Award",
        "Infrastructure as a Service Award",
        "Platform as a Service Excellence Award",
        "Hybrid Cloud Innovation Award"
      ]
    },
    "Blockchain, Web3 & Emerging Tech": {
      "Blockchain Excellence": [
        "Blockchain Startup of the Year",
        "Best DeFi Innovation Award",
        "Web3 Platform Excellence Award",
        "Smart Contract Innovation Award",
        "Crypto Security Excellence Award"
      ],
      "Emerging Technologies": [
        "AR/VR Innovation Award",
        "Metaverse Platform Excellence Award",
        "Quantum Computing Breakthrough Award",
        "IoT Innovation Award",
        "Robotics & Automation Excellence Award"
      ]
    },
    "Digital Transformation – Enterprise": {
      "Corporate Digitalization": [
        "Best Digital Transformation Initiative",
        "Smart Enterprise Award",
        "Digital Banking Transformation Award",
        "Industry 4.0 Excellence Award",
        "Digital Supply Chain Innovation Award",
        "Digital HR Transformation Award",
        "Smart Manufacturing Initiative Award"
      ],
      "Customer Experience": [
        "Digital Customer Experience Award",
        "Omnichannel Innovation Award",
        "UX/UI Excellence Award",
        "Mobile App Innovation Award"
      ]
    },
    "Startups & Innovation Ecosystem": {
      "Startup Excellence": [
        "Tech Startup of the Year",
        "Most Innovative Tech Startup",
        "Disruptive Innovation Award",
        "Emerging SaaS Startup Award",
        "DeepTech Innovation Award",
        "AgriTech Innovation Award",
        "HealthTech Startup Award"
      ],
      "Incubation & Acceleration": [
        "Best Tech Incubator",
        "Startup Accelerator Excellence Award",
        "Innovation Hub of the Year"
      ]
    },
    "E-Commerce & Digital Platforms": {
      "Platform Excellence": [
        "Best E-Commerce Platform",
        "Digital Marketplace of the Year",
        "B2B Platform Excellence Award",
        "D2C Brand Technology Award",
        "Online Payment Innovation Award"
      ],
      "MarTech & AdTech": [
        "Digital Marketing Technology Award",
        "AdTech Innovation Award",
        "SEO/SEM Excellence Award",
        "Marketing Automation Excellence Award"
      ]
    },
    "Telecom & Connectivity": {
      "Telecommunication Excellence": [
        "Telecom Company of the Year",
        "5G Innovation Award",
        "Best Broadband Service Provider",
        "Satellite Communication Excellence Award",
        "Smart City Connectivity Award"
      ]
    },
    "Leadership & Individual Awards": {
      "Tech Leadership": [
        "Tech CEO of the Year",
        "CIO of the Year",
        "CTO of the Year",
        "Chief Digital Officer Award",
        "Women Leader in Technology Award",
        "Young Tech Entrepreneur Award",
        "Tech Influencer of the Year"
      ],
      "Lifetime & Visionary": [
        "Lifetime Achievement in Technology",
        "Digital Visionary Award",
        "Global Tech Icon Award"
      ]
    },
    "Sustainability & Ethical Tech": {
      "Green Tech": [
        "Green Technology Innovation Award",
        "Sustainable IT Infrastructure Award",
        "Energy Efficient Data Center Award",
        "Carbon Neutral Technology Award"
      ],
      "Ethical & Inclusive Tech": [
        "Tech for Social Impact Award",
        "Inclusive Technology Award",
        "Digital Accessibility Excellence Award"
      ]
    },
    "Government & Public Sector Digitalization": {
      "e-Governance": [
        "Best e-Governance Initiative",
        "Digital Public Service Award",
        "Smart Governance Innovation Award",
        "Digital India Excellence Award"
      ]
    },
    "Special Recognition": {
      "Brand & Legacy": [
        "Iconic Technology Brand of the Decade",
        "Fastest Growing Tech Company",
        "Global Digital Excellence Award",
        "Customer Trust Excellence Award"
      ]
    }
  },
  "Finance & Banking": {
    "Banking Institutions": {
      "Overall Banking Excellence": [
        "Bank of the Year",
        "Best Public Sector Bank",
        "Best Private Sector Bank",
        "Best International Bank",
        "Best Regional Bank",
        "Fastest Growing Bank Award",
        "Most Trusted Bank Brand",
        "Customer Service Excellence in Banking"
      ],
      "Retail & Corporate Banking": [
        "Excellence in Retail Banking",
        "Best Corporate Banking Services",
        "Best SME Banking Services",
        "Best NRI Banking Services",
        "Excellence in Trade Finance",
        "Best Loan & Credit Services"
      ],
      "Digital Banking": [
        "Best Digital Bank",
        "Best Mobile Banking App",
        "Digital Customer Experience Award",
        "Innovation in Online Banking",
        "AI-Powered Banking Excellence Award"
      ]
    },
    "FinTech & Digital Finance": {
      "FinTech Excellence": [
        "FinTech Startup of the Year",
        "Most Innovative FinTech Company",
        "Best Payment Gateway Provider",
        "Digital Wallet Innovation Award",
        "Cross-Border Payment Excellence Award",
        "Blockchain in Finance Award",
        "Embedded Finance Innovation Award",
        "Open Banking Excellence Award"
      ],
      "Lending & Credit Tech": [
        "Best Digital Lending Platform",
        "P2P Lending Excellence Award",
        "BNPL Innovation Award",
        "Credit Scoring Innovation Award"
      ]
    },
    "Insurance Sector": {
      "Insurance Excellence": [
        "Insurance Company of the Year",
        "Best Life Insurance Provider",
        "Best General Insurance Company",
        "Health Insurance Excellence Award",
        "Digital Insurance Innovation Award",
        "Claims Settlement Excellence Award"
      ],
      "InsurTech Innovation": [
        "InsurTech Startup of the Year",
        "AI in Insurance Innovation Award",
        "Insurance Customer Experience Award"
      ]
    },
    "Investment & Wealth Management": {
      "Asset & Wealth Management": [
        "Best Asset Management Company",
        "Wealth Management Excellence Award",
        "Best Mutual Fund House",
        "Investment Advisory Excellence Award",
        "Portfolio Management Excellence Award",
        "Private Equity Excellence Award",
        "Venture Capital Firm of the Year"
      ],
      "Alternative Investments": [
        "Hedge Fund Excellence Award",
        "Real Estate Investment Excellence Award",
        "ESG Investment Leadership Award"
      ]
    },
    "Capital Markets & Stock Exchange": {
      "Market Excellence": [
        "Stock Exchange of the Year",
        "Best Brokerage Firm",
        "Capital Market Innovation Award",
        "IPO Advisory Excellence Award",
        "Equity Research Excellence Award",
        "Derivatives Market Excellence Award"
      ]
    },
    "NBFC & Microfinance": {
      "NBFC Excellence": [
        "NBFC of the Year",
        "Best Gold Loan Company",
        "Best Consumer Finance Company",
        "Housing Finance Excellence Award"
      ],
      "Financial Inclusion": [
        "Microfinance Institution of the Year",
        "Financial Inclusion Champion Award",
        "Rural Banking Excellence Award",
        "Women Empowerment through Finance Award"
      ]
    },
    "Risk, Compliance & Governance": {
      "Risk Management": [
        "Risk Management Excellence Award",
        "Fraud Prevention Innovation Award",
        "AML & Compliance Excellence Award",
        "Cyber Risk Excellence in Finance"
      ],
      "Governance": [
        "Best Corporate Governance in Finance",
        "Ethical Banking Leadership Award"
      ]
    },
    "ESG & Sustainable Finance": {
      "Green Finance": [
        "Green Finance Initiative Award",
        "Sustainable Banking Excellence Award",
        "Climate Finance Leadership Award",
        "Carbon Neutral Finance Institution Award"
      ],
      "Impact Finance": [
        "Social Impact Investment Award",
        "Sustainable Investment Fund of the Year"
      ]
    },
    "Leadership & Individual Awards": {
      "Executive Leadership": [
        "Banking CEO of the Year",
        "CFO of the Year – Financial Sector",
        "FinTech Visionary Award",
        "Women Leader in Finance Award",
        "Young Financial Leader Award",
        "Digital Banking Leader Award"
      ],
      "Lifetime & Iconic": [
        "Lifetime Achievement in Banking",
        "Finance Industry Icon Award",
        "Global Financial Visionary Award"
      ]
    },
    "Special Recognition": {
      "Brand & Performance": [
        "Iconic Financial Brand of the Decade",
        "Fastest Growing Financial Institution",
        "Customer Trust Excellence Award",
        "Innovation in Financial Services Award"
      ]
    }
  },
  "Sustainability & Environment": {
    "Corporate Sustainability": {
      "Overall Excellence": [
        "Sustainable Company of the Year",
        "ESG Leader of the Year",
        "Net Zero Commitment Award",
        "Carbon Reduction Excellence Award",
        "Sustainable Supply Chain Award",
        "Responsible Business Award",
        "Green Corporate Leadership Award"
      ],
      "ESG Performance": [
        "Best ESG Reporting Award",
        "Climate Risk Disclosure Excellence",
        "Sustainable Governance Award",
        "Diversity & Inclusion Impact Award",
        "Ethical Business Excellence Award"
      ]
    },
    "Renewable Energy & Clean Tech": {
      "Clean Energy Projects": [
        "Solar Energy Project of the Year",
        "Wind Energy Excellence Award",
        "Hydropower Innovation Award",
        "Green Hydrogen Innovation Award",
        "Bioenergy Excellence Award",
        "Energy Storage Innovation Award"
      ],
      "Renewable Companies": [
        "Renewable Energy Company of the Year",
        "CleanTech Startup of the Year",
        "Energy Efficiency Excellence Award",
        "Smart Grid Innovation Award"
      ]
    },
    "Climate Action & Carbon Management": {
      "Climate Initiatives": [
        "Climate Action Leadership Award",
        "Carbon Neutral Organization Award",
        "Carbon Capture Innovation Award",
        "Net Zero Initiative of the Year",
        "Green Building Excellence Award"
      ],
      "Adaptation & Resilience": [
        "Climate Resilience Project Award",
        "Sustainable Urban Development Award",
        "Disaster Risk Reduction Excellence Award"
      ]
    },
    "Water & Waste Management": {
      "Water Conservation": [
        "Water Sustainability Initiative Award",
        "Wastewater Treatment Innovation Award",
        "Water Recycling Excellence Award",
        "River Restoration Excellence Award"
      ],
      "Waste & Circular Economy": {
        "General": [
          "Zero Waste Initiative Award",
          "Recycling Innovation Award",
          "Circular Economy Excellence Award",
          "Plastic Reduction Leadership Award",
          "E-Waste Management Excellence Award"
        ]
      }
    },
    "Agriculture & Biodiversity": {
      "Sustainable Agriculture": [
        "Organic Farming Excellence Award",
        "Agri Sustainability Innovation Award",
        "Sustainable Food Production Award",
        "Soil Health Excellence Award"
      ],
      "Biodiversity Protection": [
        "Wildlife Conservation Excellence Award",
        "Forest Restoration Leadership Award",
        "Marine Conservation Award",
        "Biodiversity Impact Award"
      ]
    },
    "Green Infrastructure & Urban Sustainability": {
      "Sustainable Cities": [
        "Smart Green City Award",
        "Urban Sustainability Excellence Award",
        "Eco-Friendly Infrastructure Award",
        "Green Mobility Innovation Award",
        "Sustainable Transport Initiative Award"
      ],
      "Buildings & Construction": [
        "LEED Certified Project of the Year",
        "Energy Efficient Building Award",
        "Green Architecture Excellence Award"
      ]
    },
    "Sustainable Finance & Investment": {
      "Green Finance": [
        "Green Finance Initiative Award",
        "Sustainable Investment Fund of the Year",
        "Climate Finance Leadership Award",
        "Impact Investment Excellence Award"
      ],
      "ESG Investors": [
        "ESG Investment Leader Award",
        "Sustainable Banking Excellence Award"
      ]
    },
    "NGO & Social Impact": {
      "Environmental NGOs": [
        "Environmental NGO of the Year",
        "Community Sustainability Leadership Award",
        "Grassroots Climate Action Award",
        "Environmental Education Excellence Award"
      ],
      "Youth & Community": [
        "Youth Climate Leader Award",
        "Community Green Initiative Award",
        "Women in Sustainability Leadership Award"
      ]
    },
    "Technology for Sustainability": {
      "Green Tech": [
        "Clean Technology Innovation Award",
        "AI for Climate Action Award",
        "IoT for Environmental Monitoring Award",
        "Sustainable Manufacturing Innovation Award"
      ],
      "Digital & Data Impact": [
        "Carbon Tracking Innovation Award",
        "Environmental Data Analytics Award",
        "Sustainability Reporting Tech Award"
      ]
    },
    "Leadership & Individual Awards": {
      "Executive Leadership": [
        "Sustainability Leader of the Year",
        "Chief Sustainability Officer Award",
        "Green Entrepreneur of the Year",
        "Women Leader in Sustainability Award",
        "Young Climate Innovator Award"
      ],
      "Lifetime & Recognition": [
        "Lifetime Achievement in Environmental Leadership",
        "Global Sustainability Visionary Award"
      ]
    },
    "Special Recognition": {
      "Brand & Legacy": [
        "Iconic Green Brand of the Decade",
        "Fastest Growing Sustainable Company",
        "Global Environmental Excellence Award",
        "Sustainability Impact Award"
      ]
    }
  },
  "Public & Government Sector": {
    "Governance & Public Administration": {
      "Overall Excellence": [
        "Government Department of the Year",
        "Public Administration Excellence Award",
        "Best State Government Initiative",
        "Best Central Government Initiative",
        "Outstanding District Administration Award",
        "Citizen-Centric Governance Award",
        "Transparent Governance Excellence Award"
      ],
      "Policy & Reform": [
        "Public Policy Innovation Award",
        "Administrative Reform Excellence Award",
        "Good Governance Leadership Award",
        "Ease of Doing Business Initiative Award"
      ]
    },
    "e-Governance & Digital Public Services": {
      "Digital Innovation": [
        "Best e-Governance Initiative",
        "Digital Public Service Award",
        "Smart Governance Innovation Award",
        "Digital Transformation in Government Award",
        "Best Government Portal Award",
        "AI in Public Service Award",
        "Blockchain in Governance Award"
      ],
      "Citizen Services": [
        "Online Citizen Service Excellence Award",
        "Digital Grievance Redressal Award",
        "Best Public Service App Award"
      ]
    },
    "Smart Cities & Urban Development": {
      "Urban Excellence": [
        "Smart City of the Year",
        "Urban Sustainability Excellence Award",
        "Best Municipal Corporation Award",
        "Clean City Excellence Award",
        "Public Transport Innovation Award",
        "Waste Management Leadership Award"
      ],
      "Infrastructure Development": [
        "Urban Infrastructure Excellence Award",
        "Affordable Housing Initiative Award",
        "Green Urban Development Award"
      ]
    },
    "Public Sector Undertakings (PSUs)": {
      "PSU Excellence": [
        "Public Sector Enterprise of the Year",
        "PSU Innovation Excellence Award",
        "Best Government-Owned Company",
        "PSU Sustainability Leadership Award",
        "Outstanding Contribution by PSU Award"
      ]
    },
    "Public Health & Education Initiatives": {
      "Healthcare Programs": [
        "Public Health Initiative of the Year",
        "Rural Healthcare Excellence Award",
        "Immunization & Vaccination Excellence Award",
        "Health Awareness Campaign Award"
      ],
      "Education Programs": [
        "Government Education Reform Award",
        "Skill Development Initiative Award",
        "Digital Education Excellence Award"
      ]
    },
    "Rural Development & Social Welfare": {
      "Community Development": [
        "Rural Development Excellence Award",
        "Women Empowerment Initiative Award",
        "Poverty Alleviation Excellence Award",
        "Social Justice Leadership Award",
        "Inclusive Governance Award"
      ],
      "Agriculture & Livelihood": [
        "Agricultural Development Excellence Award",
        "Farmer Welfare Initiative Award",
        "Self-Help Group Empowerment Award"
      ]
    },
    "Environment & Sustainability Programs": {
      "Green Government": [
        "Sustainable Governance Award",
        "Climate Action by Government Award",
        "Renewable Energy Adoption Excellence Award",
        "Water Conservation Initiative Award"
      ]
    },
    "Defense, Safety & Law Enforcement": {
      "Public Safety": [
        "Law Enforcement Excellence Award",
        "Disaster Management Leadership Award",
        "Fire & Emergency Services Excellence Award",
        "Traffic Management Innovation Award"
      ],
      "Defense Services": [
        "Defense Excellence Award",
        "Border Security Leadership Award"
      ]
    },
    "Transport & Infrastructure": {
      "Transport Innovation": [
        "Public Transport Excellence Award",
        "Railway Innovation Award",
        "Airport Development Excellence Award",
        "Road Infrastructure Excellence Award"
      ]
    },
    "Leadership & Individual Awards": {
      "Administrative Leadership": [
        "Public Service Leader of the Year",
        "IAS Officer Excellence Award",
        "Civil Services Leadership Award",
        "Young Public Administrator Award",
        "Women Leader in Public Service Award"
      ],
      "Lifetime Recognition": [
        "Lifetime Achievement in Public Service",
        "Governance Visionary Award"
      ]
    },
    "Special Recognition": {
      "National & Global Impact": [
        "National Governance Excellence Award",
        "Global Public Sector Leadership Award",
        "Public Trust Excellence Award",
        "Innovation in Public Policy Award"
      ]
    }
  },
  "Media, Culture & Sports": {
    "Media & Journalism": {
      "Print & News Media": [
        "Newspaper of the Year",
        "Regional Newspaper Excellence Award",
        "Investigative Journalism Award",
        "Political Reporting Excellence Award",
        "Business Journalism Award",
        "Best Editorial Leadership Award",
        "Photojournalism Excellence Award"
      ],
      "Television & Broadcast": [
        "News Channel of the Year",
        "Best TV Anchor Award",
        "Breaking News Coverage Award",
        "Documentary Excellence Award",
        "Best Talk Show Award"
      ],
      "Digital Media": [
        "Digital News Platform of the Year",
        "Best News Website Award",
        "Podcast Excellence Award",
        "Social Media Journalism Award",
        "YouTube News Channel Award"
      ]
    },
    "Film & Entertainment": {
      "Cinema Awards": [
        "Film of the Year",
        "Best Director Award",
        "Best Actor Award",
        "Best Actress Award",
        "Best Supporting Actor Award",
        "Best Screenplay Award",
        "Best Cinematography Award",
        "Best Music Director Award",
        "Best Editing Award"
      ],
      "OTT & Streaming": [
        "Best OTT Platform",
        "Web Series of the Year",
        "Best Digital Actor Award",
        "Streaming Innovation Award"
      ],
      "Production & Studios": [
        "Production House of the Year",
        "Animation Studio Excellence Award",
        "VFX Innovation Award"
      ]
    },
    "Advertising, PR & Marketing": {
      "Advertising Excellence": [
        "Ad Agency of the Year",
        "Creative Campaign of the Year",
        "Brand Storytelling Excellence Award",
        "Digital Advertising Innovation Award"
      ],
      "Public Relations": [
        "PR Agency of the Year",
        "Corporate Communication Excellence Award",
        "Crisis Communication Award"
      ]
    },
    "Arts & Culture": {
      "Performing Arts": [
        "Theatre Production of the Year",
        "Classical Music Excellence Award",
        "Dance Performance Excellence Award",
        "Folk Art Preservation Award"
      ],
      "Visual Arts": [
        "Artist of the Year",
        "Contemporary Art Excellence Award",
        "Photography Excellence Award",
        "Sculpture Innovation Award"
      ],
      "Cultural Heritage": [
        "Heritage Preservation Award",
        "Cultural Promotion Excellence Award",
        "Museum of the Year"
      ]
    },
    "Literature & Publishing": {
      "Literary Excellence": [
        "Author of the Year",
        "Book of the Year",
        "Poetry Excellence Award",
        "Fiction Excellence Award",
        "Non-Fiction Excellence Award"
      ],
      "Publishing Industry": [
        "Publishing House of the Year",
        "Literary Editor Excellence Award"
      ]
    },
    "Fashion & Lifestyle": {
      "Fashion Industry": [
        "Fashion Designer of the Year",
        "Sustainable Fashion Brand Award",
        "Luxury Fashion House Award",
        "Emerging Designer Award"
      ],
      "Lifestyle Media": [
        "Lifestyle Influencer Award",
        "Fashion Magazine of the Year"
      ]
    },
    "Sports – Individual & Team": {
      "Athlete Awards": [
        "Athlete of the Year",
        "Best Male Athlete Award",
        "Best Female Athlete Award",
        "Young Sports Talent Award",
        "Para Athlete Excellence Award"
      ],
      "Team & Federation": [
        "Sports Team of the Year",
        "Best Sports Federation Award",
        "Coaching Excellence Award",
        "Grassroots Sports Development Award"
      ]
    },
    "eSports & Digital Gaming": {
      "Gaming Excellence": [
        "eSports Player of the Year",
        "eSports Team of the Year",
        "Best Gaming Tournament Award",
        "Game Developer Excellence Award"
      ]
    },
    "Leadership & Lifetime Recognition": {
      "Media Leadership": [
        "Media Personality of the Year",
        "Entertainment Icon Award",
        "Sports Leadership Award",
        "Cultural Ambassador Award",
        "Women Leader in Media Award"
      ],
      "Lifetime Honors": [
        "Lifetime Achievement in Media",
        "Lifetime Achievement in Sports",
        "Cultural Legacy Award"
      ]
    },
    "Special Recognition": {
      "Impact & Innovation": [
        "Global Media Excellence Award",
        "Innovation in Entertainment Award",
        "Cultural Impact Award",
        "Social Impact Through Media Award"
      ]
    }
  }
};

const AVAILABLE_AWARDS = [
  getAwardName(),
  "India Excellence Awards & Conference 2026",
  "Invest India Summit 2026",
  "Business and Leadership Summit 2026",
];

const initialForm = {
  awardName: AVAILABLE_AWARDS[0],
  participationType: "nominated as award", // default
  field: "",
  category: "",
  subCategory: "",
  otherSubCategory: "",
  nomineeName: "",
  organization: "",
  designation: "", // for simple form
  mobile: "",      // for simple form
  email: "",       // for simple form

  orgHeadName: "",
  orgHeadDesignation: "",
  orgHeadMobile: "",
  orgHeadEmail: "",

  contactName: "",
  contactDesignation: "",
  contactMobile: "",
  contactEmail: "",

  website: "",
  facebook: "",
  instagram: "",
  youtube: "",
  turnover: "",

  street: "",
  city: "",
  state: "",
  zip: "",

  preferredLocation: [],
  pdf: null,
  remarks: "",
  acceptTerms: false,
};

export default function NominationForm() {
  const { id } = useParams();
  const location = useLocation();
  const { token, user: authUser } = useAuth();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const awardFromQuery = queryParams.get("award");

  const awardsList = useMemo(() => {
    const list = [...AVAILABLE_AWARDS];
    if (awardFromQuery && !list.includes(awardFromQuery)) {
      list.unshift(awardFromQuery);
    }
    return list;
  }, [awardFromQuery]);

  const [form, setForm] = useState({
    ...initialForm,
    awardName: awardFromQuery || getAwardName()
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const inputRef = useRef({});

  const isEditMode = !!id;

  // Load existing nomination if editing
  useEffect(() => {
    if (isEditMode && token) {
      const load = async () => {
        try {
          setLoading(true);
          const data = await fetchNominationById(id, token);

          if (data.status !== "nominated") {
            setError("This nomination can no longer be edited.");
            return;
          }

          setForm(prev => ({
            ...prev,
            ...data,
            subCategory: data.subCategory || "",
            otherSubCategory: data.otherSubCategory || "",
            acceptTerms: false,
          }));
        } catch (err) {
          setError(err.message || "Failed to load nomination data");
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [id, token, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (name === "participationType") {
      setForm((prev) => ({
        ...initialForm,
        awardName: prev.awardName,
        participationType: value,
      }));
      setFieldErrors({});
      return;
    }

    if (name === "field") {
      setForm((prev) => ({
        ...prev,
        field: value,
        category: "",
        subCategory: "",
        otherSubCategory: "",
      }));
      return;
    }

    if (name === "category") {
      setForm((prev) => ({
        ...prev,
        category: value,
        subCategory: "",
        otherSubCategory: "",
      }));
      return;
    }

    if (name === "subCategory") {
      setForm((prev) => ({
        ...prev,
        subCategory: value,
        otherSubCategory: value === "Other" ? prev.otherSubCategory : "",
      }));
      return;
    }

    // Phone Input Restriction
    const phoneFields = ["mobile", "contactMobile", "orgHeadMobile"];
    if (phoneFields.includes(name)) {
      const allowedRegex = /^[\d\s\+\-\(\)]*$/;
      if (!allowedRegex.test(value)) {
        alert("Text are not allowed! Please enter only phone number.");
        return;
      }
    }

    // Handle multi-select fields (e.g., preferredLocation)
    if (name === "preferredLocation") {
      setForm((prev) => {
        const currentLocations = Array.isArray(prev.preferredLocation) ? prev.preferredLocation : [];
        const newLocations = currentLocations.includes(value)
          ? currentLocations.filter((loc) => loc !== value)
          : [...currentLocations, value];
        return { ...prev, preferredLocation: newLocations };
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredAward = [
      "field", "category", "subCategory", "nomineeName", "organization", "turnover",
      "orgHeadName", "orgHeadDesignation", "orgHeadMobile", "orgHeadEmail",
      "contactName", "contactDesignation", "contactMobile", "contactEmail",
      "street", "city", "state", "zip"
    ];
    const requiredOther = ["nomineeName", "organization", "designation", "mobile", "email"];

    const list = form.participationType === "nominated as award" ? requiredAward : requiredOther;

    list.forEach(field => {
      if (!form[field] || (typeof form[field] === "string" && form[field].trim() === "")) {
        errors[field] = "Required";
      }
    });

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    const phoneFields = ["mobile", "contactMobile", "orgHeadMobile"];

    phoneFields.forEach(field => {
      if (form[field] && form[field].trim() !== "" && !phoneRegex.test(form[field])) {
        errors[field] = "Invalid format";
      }
    });

    if (form.participationType === "nominated as award" && form.subCategory === "Other" && !form.otherSubCategory) {
      errors.otherSubCategory = "Specify category";
    }

    if (!form.acceptTerms) {
      errors.acceptTerms = "Required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      alert("Please fill all mandatory fields marked in red.");

      const currentErrors = {};
      const requiredAward = ["field", "category", "subCategory", "nomineeName", "organization", "turnover", "orgHeadName", "orgHeadDesignation", "orgHeadMobile", "orgHeadEmail", "contactName", "contactDesignation", "contactMobile", "contactEmail", "street", "city", "state", "zip"];
      const requiredOther = ["nomineeName", "organization", "designation", "mobile", "email"];
      const list = form.participationType === "nominated as award" ? requiredAward : requiredOther;

      list.forEach(f => { if (!form[f] || (typeof form[f] === "string" && form[f].trim() === "")) currentErrors[f] = true; });

      const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
      ["mobile", "contactMobile", "orgHeadMobile"].forEach(f => {
        if (form[f] && !phoneRegex.test(form[f])) currentErrors[f] = true;
      });

      if (form.participationType === "nominated as award" && form.subCategory === "Other" && !form.otherSubCategory) currentErrors.otherSubCategory = true;
      if (!form.acceptTerms) currentErrors.acceptTerms = true;

      const keys = Object.keys(currentErrors);
      if (keys.length > 0 && inputRef.current[keys[0]]) {
        inputRef.current[keys[0]].scrollIntoView({ behavior: "smooth", block: "center" });
        inputRef.current[keys[0]].focus();
      }
      return;
    }

    try {
      setSubmitting(true);

      // Prepare FormData for file upload
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === "preferredLocation") {
          // Send array as multiple entries or JSON string as per server expectation
          // Multer or JSON parsing? Since we use JSON.stringify in request usually, but FormData is different.
          // Let's send it as multiple entries which is standard for FormData
          form[key].forEach(loc => formData.append("preferredLocation", loc));
        } else if (key === "pdf" && form[key]) {
          formData.append("pdf", form[key]);
        } else {
          formData.append(key, form[key]);
        }
      });

      if (isEditMode) {
        await updateUserNomination(id, formData, token);
        navigate(`/dashboard`);
      } else {
        const response = await createNomination(formData, token);
        navigate("/success", { state: { autoCreated: response?.autoCreated } });
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const availableCategories = fieldMap[form.field] || {};
  const groupedSubCategories = availableCategories[form.category] || {};

  const getSelectClass = (name) => {
    const base = "w-full bg-[#0a0503]/80 border rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-[#d4af37]/50 appearance-none cursor-pointer";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-white/10 hover:border-[#d4af37]/50 hover:bg-[#0f0805]";
    return `${base} ${errorClass}`;
  };

  const getInputClass = (name) => {
    const base = "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/50";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-white/20 hover:border-[#d4af37]/40";
    return `${base} ${errorClass}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center">
        <FiRefreshCcw className="text-[#d4af37] w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-32 relative overflow-hidden bg-[#0a0503]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => isEditMode ? navigate(-1) : navigate("/")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-300 group"
              title="Close / Go Back"
            >
              <FiX size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            {authUser && (
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/10 hidden sm:block">
                Nominee: {authUser.email}
              </p>
            )}
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
        </div>

        <div className="mb-8 md:mb-12 text-center relative group">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 tracking-tighter uppercase font-black px-4 text-center">
              {form.awardName.split(" ").map((word, i, arr) => {
                const isOrange = i === 0 || word.toLowerCase() === "summit" || word === "2026";
                return (
                  <span
                    key={i}
                    className={`text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isOrange ? "text-[#ffb400]" : "text-white"
                      }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>
          </div>

          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto rounded-full mb-8"></div>

          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed px-4 italic">
            {isEditMode
              ? "Refine your submission to ensure every detail shines for the jury review."
              : "Honor the pioneers, celebrate the innovators. Register your presence or nominate for excellence in your chosen field."
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-center">
            <p className="font-bold flex items-center justify-center gap-2">
              <span className="text-lg">⚠️</span> {error}
            </p>
          </div>
        )}

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

            {/* Award Selection */}
            <div className="md:col-span-2 space-y-4 mb-4">
              <label className="text-xs font-black text-[#ffb400] uppercase tracking-[0.3em] pl-1">
                Select Award / Summit Event *
              </label>
              <div className="relative group">
                <select
                  name="awardName"
                  value={form.awardName}
                  onChange={handleChange}
                  className="w-full bg-[#0a0503] border-2 border-[#d4af37]/30 rounded-2xl px-6 py-4 text-white text-lg font-bold outline-none transition-all duration-300 focus:border-[#ffb400] focus:ring-4 focus:ring-[#ffb400]/10 appearance-none cursor-pointer shadow-2xl"
                >
                  {awardsList.map((award) => (
                    <option key={award} value={award} className="bg-black text-white">
                      {award}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-[#ffb400] transition-colors">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Participation Choice */}
            <div className="md:col-span-2 space-y-6">
              <label className="text-sm font-bold text-[#d4af37] uppercase tracking-widest pl-1">
                Choose Your Presence Role
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { id: "nominated as award", prefix: "Nominated as", highlight: "Awarded", primary: true },
                  { id: "attend as speaker", prefix: "Attend as", highlight: "Speaker", primary: false },
                  { id: "attend as exhibitor", prefix: "Attend as", highlight: "Exhibitor", primary: false },
                  { id: "attend as sponsor", prefix: "Attend as", highlight: "Sponsor", primary: false },
                ].map((type) => (
                  <label
                    key={type.id}
                    className={`group relative flex flex-col items-center justify-center p-4 sm:p-8 rounded-xl sm:rounded-3xl border-2 cursor-pointer transition-all duration-500 overflow-hidden
                      ${form.participationType === type.id
                        ? type.primary
                          ? "bg-gradient-to-br from-[#d4af37] via-[#f2d06b] to-[#b8860b] border-transparent text-black scale-[1.05] shadow-[0_20px_40px_rgba(212,175,55,0.4)] ring-4 ring-[#d4af37]/20"
                          : "bg-gradient-to-br from-[#c62828] via-[#e53935] to-[#b71c1c] border-transparent text-white scale-[1.05] shadow-[0_20px_40px_rgba(198,40,40,0.4)] ring-4 ring-red-500/20"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-[#d4af37]/40 hover:scale-[1.02] shadow-xl"
                      }`}
                  >
                    <input
                      type="radio"
                      name="participationType"
                      value={type.id}
                      checked={form.participationType === type.id}
                      onChange={handleChange}
                      className="hidden"
                    />

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <span className={`text-[8px] sm:text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${form.participationType === type.id ? "opacity-90" : "text-gray-500"}`}>
                        {type.prefix}
                      </span>
                      <span className={`text-sm sm:text-2xl font-black uppercase tracking-tighter leading-none transition-all duration-300 ${form.participationType === type.id ? "scale-110" : "text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}`}>
                        {type.highlight}
                      </span>
                    </div>

                    {/* Active Indicator Dot */}
                    {form.participationType === type.id && (
                      <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-ping ${type.primary ? "bg-black" : "bg-white"}`}></div>
                    )}
                  </label>
                ))}
              </div>
            </div>


            {form.participationType === "nominated as award" ? (
              <>
                <div className="md:col-span-2 p-6 sm:p-10 rounded-[2rem] bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent border border-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group/award">
                  {/* Decorative corner accent */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl group-hover/award:bg-[#d4af37]/10 transition-colors duration-700"></div>

                  <div className="mb-8 flex flex-col items-center sm:items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] mb-2">Award Selection</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6d1a] flex items-center justify-center p-2.5 shadow-lg shadow-[#d4af37]/20">
                        <Crown className="text-black w-full h-full" />
                      </div>
                      Classification & Category
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    <div className="relative group/select">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/select:text-[#d4af37] transition-colors">
                        Sector Classification *
                      </label>
                      <div className="relative group">
                        <select
                          name="field"
                          ref={el => inputRef.current.field = el}
                          value={form.field}
                          onChange={handleChange}
                          className={getSelectClass("field")}
                        >
                          <option value="" className="bg-[#3a1418]">Select Sector</option>
                          {Object.keys(fieldMap).map((f) => (
                            <option key={f} value={f} className="bg-[#3a1418]">{f}</option>
                          ))}
                          <option value="Others" className="bg-[#3a1418]">Others</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#d4af37] transition-colors">
                          <div className="border-l border-white/10 pl-3">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/select">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/select:text-[#d4af37] transition-colors">
                        Primary Category *
                      </label>
                      <div className="relative group">
                        {form.field === "Others" ? (
                          <input
                            type="text"
                            name="category"
                            ref={el => inputRef.current.category = el}
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Enter Category"
                            className={getInputClass("category")}
                          />
                        ) : (
                          <>
                            <select
                              name="category"
                              ref={el => inputRef.current.category = el}
                              value={form.category}
                              onChange={handleChange}
                              disabled={!form.field}
                              className={getSelectClass("category")}
                            >
                              <option value="" className="bg-[#3a1418]">Select Category</option>
                              {Object.keys(availableCategories).map((c) => (
                                <option key={c} value={c} className="bg-[#3a1418]">{c}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#d4af37] transition-colors">
                              <div className="border-l border-white/10 pl-3">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="relative group/select">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/select:text-[#d4af37] transition-colors">
                        Award Subcategory *
                      </label>
                      <div className="relative group">
                        {form.field === "Others" ? (
                          <input
                            type="text"
                            name="subCategory"
                            ref={el => inputRef.current.subCategory = el}
                            value={form.subCategory}
                            onChange={handleChange}
                            placeholder="Enter Subcategory"
                            className={getInputClass("subCategory")}
                          />
                        ) : (
                          <>
                            <select
                              name="subCategory"
                              ref={el => inputRef.current.subCategory = el}
                              value={form.subCategory}
                              onChange={handleChange}
                              disabled={!form.category}
                              className={getSelectClass("subCategory")}
                            >
                              <option value="" className="bg-[#3a1418]">Select Subcategory</option>
                              {Object.entries(groupedSubCategories).map(([group, list]) => (
                                <optgroup key={group} label={group} className="bg-black text-[#d4af37] font-bold">
                                  {list.map((item) => (
                                    <option key={item} value={item} className="bg-[#3a1418] text-white font-normal">
                                      {item}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                              {form.category && (
                                <option value="Other" className="bg-[#3a1418] text-[#d4af37] font-bold italic">Other Category...</option>
                              )}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#d4af37] transition-colors">
                              <div className="border-l border-white/10 pl-3">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {form.subCategory === "Other" && (
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">Custom Category Details *</label>
                      <input
                        name="otherSubCategory"
                        ref={el => inputRef.current.otherSubCategory = el}
                        value={form.otherSubCategory}
                        onChange={handleChange}
                        placeholder="Type your suggested category title here"
                        className={`${getInputClass("otherSubCategory")} border-[#d4af37]/30 ring-[#d4af37]/10`}
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Nominee Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name of Nominee / Professional *</label>
                      <input
                        name="nomineeName"
                        ref={el => inputRef.current.nomineeName = el}
                        placeholder="Ex: Dr. Prashant Kumar"
                        value={form.nomineeName}
                        onChange={handleChange}
                        className={getInputClass("nomineeName")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Organization / School / Institution *</label>
                      <input
                        name="organization"
                        ref={el => inputRef.current.organization = el}
                        placeholder="Organization Name"
                        value={form.organization}
                        onChange={handleChange}
                        className={getInputClass("organization")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Turnover *</label>
                      <input
                        name="turnover"
                        ref={el => inputRef.current.turnover = el}
                        placeholder="Ex: 50 Cr. / 100 Million"
                        value={form.turnover}
                        onChange={handleChange}
                        className={getInputClass("turnover")}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Organization Head Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Head Name *</label>
                      <input name="orgHeadName" ref={el => inputRef.current.orgHeadName = el} value={form.orgHeadName} onChange={handleChange} className={getInputClass("orgHeadName")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Designation *</label>
                      <input name="orgHeadDesignation" ref={el => inputRef.current.orgHeadDesignation = el} value={form.orgHeadDesignation} onChange={handleChange} className={getInputClass("orgHeadDesignation")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile Number *</label>
                      <input name="orgHeadMobile" ref={el => inputRef.current.orgHeadMobile = el} value={form.orgHeadMobile} onChange={handleChange} className={getInputClass("orgHeadMobile")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Official Email *</label>
                      <input name="orgHeadEmail" ref={el => inputRef.current.orgHeadEmail = el} value={form.orgHeadEmail} onChange={handleChange} className={getInputClass("orgHeadEmail")} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Contact Person Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Name *</label>
                      <input name="contactName" ref={el => inputRef.current.contactName = el} value={form.contactName} onChange={handleChange} className={getInputClass("contactName")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Designation *</label>
                      <input name="contactDesignation" ref={el => inputRef.current.contactDesignation = el} value={form.contactDesignation} onChange={handleChange} className={getInputClass("contactDesignation")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile *</label>
                      <input name="contactMobile" ref={el => inputRef.current.contactMobile = el} value={form.contactMobile} onChange={handleChange} className={getInputClass("contactMobile")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email *</label>
                      <input name="contactEmail" ref={el => inputRef.current.contactEmail = el} value={form.contactEmail} onChange={handleChange} className={getInputClass("contactEmail")} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Social Media Presence
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Website</label>
                      <input name="website" placeholder="https://yourwebsite.com" value={form.website} onChange={handleChange} className={getInputClass("website")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Facebook</label>
                      <input name="facebook" placeholder="Facebook Profile/Page Link" value={form.facebook} onChange={handleChange} className={getInputClass("facebook")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instagram</label>
                      <input name="instagram" placeholder="Instagram Profile Link" value={form.instagram} onChange={handleChange} className={getInputClass("instagram")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">YouTube</label>
                      <input name="youtube" placeholder="YouTube Channel Link" value={form.youtube} onChange={handleChange} className={getInputClass("youtube")} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5 space-y-6">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Location & Logistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Street Address *</label>
                      <input name="street" ref={el => inputRef.current.street = el} value={form.street} onChange={handleChange} className={getInputClass("street")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City *</label>
                      <input name="city" ref={el => inputRef.current.city = el} value={form.city} onChange={handleChange} className={getInputClass("city")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">State *</label>
                      <input name="state" ref={el => inputRef.current.state = el} value={form.state} onChange={handleChange} className={getInputClass("state")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">ZIP Code *</label>
                      <input name="zip" ref={el => inputRef.current.zip = el} value={form.zip} onChange={handleChange} className={getInputClass("zip")} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-6 border border-[#d4af37]/30 shadow-inner text-2xl">
                    📝
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-2 uppercase tracking-tighter text-center">Registration Info</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-8 text-center max-w-md italic">
                    You are registering to attend as a {form.participationType.split(' ').pop()}. Our team will review your profile and reach out for coordination.
                  </p>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Full Name *</label>
                      <input name="nomineeName" ref={el => inputRef.current.nomineeName = el} placeholder="Ex: Dr. Prashant Kumar" value={form.nomineeName} onChange={handleChange} className={getInputClass("nomineeName")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Organization *</label>
                      <input name="organization" ref={el => inputRef.current.organization = el} placeholder="Company / Institution Name" value={form.organization} onChange={handleChange} className={getInputClass("organization")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Designation *</label>
                      <input name="designation" ref={el => inputRef.current.designation = el} placeholder="Current Job Title" value={form.designation} onChange={handleChange} className={getInputClass("designation")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Mobile Contact *</label>
                      <input name="mobile" ref={el => inputRef.current.mobile = el} placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={handleChange} className={getInputClass("mobile")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Official Email *</label>
                      <input name="email" ref={el => inputRef.current.email = el} placeholder="work@domain.com" value={form.email} onChange={handleChange} className={getInputClass("email")} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Portfolio / Website</label>
                      <input name="website" placeholder="https://example.com" value={form.website} onChange={handleChange} className={getInputClass("website")} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Preferred Event Location */}
            <div className="md:col-span-2 pt-8 border-t border-white/5 space-y-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Preferred Event Location
                </h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold ml-1 mt-1">
                  (Optional - Please select your preference)
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {["Mumbai", "USA", "London"].map((loc) => (
                  <label
                    key={loc}
                    className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer text-center
                      ${form.preferredLocation?.includes(loc)
                        ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] shadow-[0_5px_15px_rgba(212,175,55,0.2)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                      }`}
                  >
                    <input
                      type="checkbox"
                      name="preferredLocation"
                      value={loc}
                      checked={form.preferredLocation?.includes(loc)}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PDF Support Document Upload */}
            <div className="md:col-span-2 pt-8 border-t border-white/5 space-y-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Support Document (Optional)
                </h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold ml-1 mt-1">
                  Upload any supporting document or profile (PDF only, max 5MB)
                </p>
              </div>

              <div className="relative group">
                <input
                  type="file"
                  name="pdf"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type === "application/pdf") {
                      if (file.size > 5 * 1024 * 1024) {
                        alert("File size exceeds 5MB limit.");
                        e.target.value = "";
                        return;
                      }
                      setForm(prev => ({ ...prev, pdf: file }));
                    } else if (file) {
                      alert("Please upload a valid PDF file.");
                      e.target.value = "";
                    }
                  }}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
                    ${form.pdf
                      ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-[#d4af37]/40"
                    }`}
                >
                  <div className="text-3xl mb-3">
                    {form.pdf ? "📄" : "📤"}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {form.pdf ? form.pdf.name : "Click to select PDF"}
                  </span>
                  {form.pdf && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setForm(prev => ({ ...prev, pdf: null }));
                        document.getElementById('pdf-upload').value = "";
                      }}
                      className="mt-4 text-[10px] font-black underline uppercase tracking-tighter hover:text-white"
                    >
                      Remove File
                    </button>
                  )}
                </label>
              </div>
            </div>

            <div className="md:col-span-2 pt-8 border-t border-white/5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Additional Remarks</label>
              <textarea name="remarks" value={form.remarks} onChange={handleChange} rows={4} placeholder="Your message..." className={`${getInputClass("remarks")} resize-none`} />
            </div>

            <div className="md:col-span-2 bg-white/5 border border-white/5 p-6 rounded-2xl group transition-all hover:bg-white/[0.07]">
              <label className="flex gap-4 cursor-pointer select-none">
                <div className="relative flex items-center pt-1">
                  <input type="checkbox" name="acceptTerms" ref={el => inputRef.current.acceptTerms = el} checked={form.acceptTerms} onChange={handleChange} className="w-5 h-5 rounded border-2 border-[#d4af37]/40 bg-transparent checked:bg-[#d4af37] appearance-none transition-all cursor-pointer" />
                  {form.acceptTerms && <span className="absolute left-[3px] top-[4px] text-black text-[10px] font-bold pointer-events-none">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm tracking-tight transition-colors ${fieldErrors.acceptTerms ? "text-red-400" : "text-gray-300"}`}>
                    <span className="font-bold text-[#d4af37]">DECLARATION:</span> I hereby verify that I have reviewed the Terms & Conditions. The data provided is true to the best of my knowledge.
                  </p>
                </div>
              </label>
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-4 py-8">
              <button
                type="submit"
                disabled={submitting}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:scale-95 disabled:grayscale disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {submitting ? "Processing..." : isEditMode ? "Update Submission" : "Submit Registration"}
                  {!submitting && <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>}
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
