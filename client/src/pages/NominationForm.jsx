import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiX, FiRefreshCcw } from "react-icons/fi";
import { Crown } from "lucide-react";
import { createNomination, fetchNominationById, updateUserNomination } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const fieldMap = {
  "Healthcare Excellence": {
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
  "Education & Leadership": {
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
  "Business & Entrepreneurship": {
    "Corporate & Business Excellence": {
      "Overall Business Excellence": [
        "Company of the Year",
        "Business Excellence Award",
        "Fastest Growing Company of the Year",
        "Most Trusted Brand of the Year",
        "Emerging Business of the Year",
        "Industry Leader Award",
        "Excellence in Corporate Governance"
      ],
      "Global Business Awards": [
        "Global Business Excellence Award",
        "International Expansion Award",
        "Cross-Border Business Leader Award",
        "Export Excellence Award",
        "Global Brand of the Year"
      ],
      "Industry-Specific Business Awards": [
        "Manufacturing Company of the Year",
        "Retail Brand of the Year",
        "Real Estate Company of the Year",
        "IT & Software Company of the Year",
        "FMCG Brand of the Year",
        "Infrastructure Company of the Year",
        "E-Commerce Brand of the Year"
      ]
    },
    "Startup & Entrepreneurship Awards": {
      "Startup Excellence": [
        "Startup of the Year",
        "Emerging Startup of the Year",
        "Innovative Startup Award",
        "Disruptor of the Year",
        "Bootstrapped Startup of the Year",
        "High-Growth Startup Award"
      ],
      "Innovation & Technology": [
        "Tech Innovator of the Year",
        "Best AI Startup",
        "Best SaaS Startup",
        "Best FinTech Startup",
        "Best HealthTech Startup",
        "Best EdTech Startup",
        "Best GreenTech Startup"
      ],
      "Social & Impact Entrepreneurship": [
        "Social Entrepreneur of the Year",
        "Impact Startup of the Year",
        "Sustainable Business Award",
        "Rural Entrepreneurship Award",
        "Women-Led Social Enterprise Award"
      ]
    },
    "Leadership & Individual Awards": {
      "Business Leadership": [
        "CEO of the Year",
        "Entrepreneur of the Year",
        "Visionary Business Leader Award",
        "Young Entrepreneur of the Year",
        "Woman Entrepreneur of the Year",
        "Business Icon Award",
        "Lifetime Achievement in Business"
      ],
      "Functional Leadership": [
        "CFO of the Year",
        "CMO of the Year",
        "HR Leader of the Year",
        "Sales Leader of the Year",
        "Marketing Innovator Award"
      ]
    },
    "SME & MSME Awards": {
      "Small & Medium Enterprises": [
        "MSME of the Year",
        "Small Business of the Year",
        "Excellence in Family-Owned Business",
        "Excellence in Local Enterprise",
        "Regional Business Excellence Award"
      ],
      "Export & Trade": [
        "Export-Oriented MSME Award",
        "International Trade Excellence Award",
        "Make in India Excellence Award"
      ]
    },
    "Digital & E-Commerce Awards": {
      "Digital Transformation": [
        "Digital Business of the Year",
        "Excellence in Digital Marketing",
        "Best Online Brand",
        "Innovation in E-Commerce",
        "D2C Brand of the Year"
      ],
      "Data & Technology": [
        "Excellence in Business Analytics",
        "AI-Driven Business Award",
        "Automation Excellence Award",
        "Cloud-Based Business Innovation Award"
      ]
    },
    "Sustainability & CSR Awards": {
      "Green Business Awards": [
        "Sustainable Business of the Year",
        "ESG Excellence Award",
        "Green Manufacturing Excellence",
        "Renewable Energy Business Award"
      ],
      "Corporate Social Responsibility": [
        "CSR Excellence Award",
        "Community Impact Business Award",
        "Inclusive Workplace Award",
        "Diversity & Inclusion Excellence Award"
      ]
    },
    "Special Recognition Awards": {
      "General": [
        "Business Excellence Icon Award",
        "Global Business Leadership Award",
        "Rising Star in Business Award",
        "Business Innovation Champion Award",
        "Most Influential Business Personality",
        "Excellence in Brand Building"
      ]
    }
  },
  "Lifestyle & Wellness": {
    "Wellness & Healthcare Lifestyle": {
      "Holistic Wellness": [
        "Wellness Brand of the Year",
        "Holistic Wellness Center of the Year",
        "Excellence in Mind-Body Wellness",
        "Best Alternative Therapy Center",
        "Ayurveda & Natural Healing Excellence Award",
        "Yoga & Meditation Center of the Year"
      ],
      "Fitness & Physical Wellness": [
        "Fitness Brand of the Year",
        "Best Gym & Fitness Studio",
        "Personal Trainer of the Year",
        "Excellence in Sports Nutrition",
        "Best Online Fitness Platform",
        "Fitness Influencer of the Year"
      ],
      "Nutrition & Healthy Living": [
        "Nutritionist of the Year",
        "Healthy Food Brand of the Year",
        "Organic Lifestyle Brand Award",
        "Diet & Wellness Consultant Award",
        "Best Plant-Based Brand"
      ]
    },
    "Beauty & Personal Care": {
      "Beauty Brands": [
        "Beauty Brand of the Year",
        "Skincare Brand of the Year",
        "Luxury Cosmetic Brand Award",
        "Organic Beauty Brand Award",
        "Emerging Beauty Startup"
      ],
      "Salons & Aesthetics": [
        "Salon of the Year",
        "Best Spa & Wellness Retreat",
        "Best Aesthetic Clinic",
        "Hair & Makeup Artist of the Year",
        "Excellence in Dermatology & Cosmetology"
      ]
    },
    "Luxury Lifestyle Awards": {
      "Hospitality & Travel": [
        "Luxury Hotel of the Year",
        "Boutique Resort of the Year",
        "Travel Brand of the Year",
        "Wellness Retreat Destination Award",
        "Excellence in Luxury Hospitality"
      ],
      "Interior & Home Lifestyle": [
        "Interior Designer of the Year",
        "Luxury Home Brand Award",
        "Sustainable Home Design Award",
        "Smart Living Innovation Award"
      ],
      "Fashion & Style": [
        "Fashion Brand of the Year",
        "Sustainable Fashion Brand",
        "Designer of the Year",
        "Emerging Fashion Entrepreneur",
        "Lifestyle Influencer of the Year"
      ]
    },
    "Mental Health & Personal Development": {
      "Mental Wellness": [
        "Mental Health Advocate Award",
        "Counseling Center of the Year",
        "Mindfulness Coach of the Year",
        "Excellence in Emotional Wellness"
      ],
      "Personal Growth & Coaching": [
        "Life Coach of the Year",
        "Motivational Speaker Award",
        "Excellence in Leadership Coaching",
        "Corporate Wellness Program Award"
      ]
    },
    "Digital Wellness & HealthTech Lifestyle": {
      "Wellness Technology": [
        "Best Wellness App",
        "AI-Based Health & Fitness Platform",
        "Digital Wellness Innovation Award",
        "Wearable Health Tech Brand of the Year"
      ]
    },
    "Social Impact & Sustainability": {
      "Sustainable Lifestyle": [
        "Sustainable Lifestyle Brand of the Year",
        "Eco-Friendly Product Award",
        "Green Living Champion Award",
        "Ethical Beauty Brand Award"
      ],
      "Women & Community Empowerment": [
        "Women in Wellness Leadership Award",
        "Community Wellness Initiative Award",
        "Inclusive Lifestyle Brand Award"
      ]
    },
    "Individual Excellence Awards": {
      "General": [
        "Lifestyle Icon of the Year",
        "Wellness Entrepreneur of the Year",
        "Rising Star in Wellness",
        "Lifetime Achievement in Lifestyle & Wellness",
        "Global Wellness Leader Award"
      ]
    }
  },
  "Dental Care Innovation": {
    "Dental Clinics & Hospitals Excellence": {
      "Overall Dental Excellence": [
        "Dental Clinic of the Year",
        "Multi-Specialty Dental Hospital of the Year",
        "Emerging Dental Clinic Award",
        "Most Trusted Dental Brand",
        "Excellence in Patient-Centered Dental Care",
        "Best NABH Accredited Dental Clinic"
      ],
      "Specialty Dental Care": [
        "Best Cosmetic Dentistry Clinic",
        "Best Orthodontic Clinic",
        "Best Pediatric Dental Clinic",
        "Best Implantology Center",
        "Best Endodontic Clinic",
        "Best Oral & Maxillofacial Surgery Center",
        "Best Periodontology Clinic"
      ]
    },
    "Dental Innovation & Technology": {
      "Digital Dentistry": [
        "Excellence in Digital Dentistry",
        "Best CAD/CAM Dental Practice",
        "Innovation in 3D Printing Dentistry",
        "Best AI-Based Dental Diagnosis",
        "Best Laser Dentistry Practice",
        "Innovation in Dental Imaging Technology"
      ],
      "Research & Development": [
        "Breakthrough Dental Innovation Award",
        "Excellence in Dental Research",
        "Dental Technology Pioneer Award",
        "Innovation in Dental Materials"
      ]
    },
    "Dental Education & Training": {
      "Academic Excellence": [
        "Best Dental College",
        "Excellence in Dental Education",
        "Best Dental Training Institute",
        "Outstanding Dental Faculty Award",
        "Excellence in Continuing Dental Education"
      ],
      "Skill Development": [
        "Best Dental Implant Training Center",
        "Excellence in Clinical Skill Training",
        "Digital Dentistry Training Excellence Award"
      ]
    },
    "Dental Industry & Products": {
      "Dental Products & Equipment": [
        "Best Dental Equipment Manufacturer",
        "Innovation in Dental Instruments",
        "Best Dental Implant Brand",
        "Excellence in Dental Consumables"
      ],
      "Dental Pharma & Materials": [
        "Best Dental Pharmaceutical Brand",
        "Innovation in Dental Materials",
        "Excellence in Oral Care Products"
      ]
    },
    "Individual Dental Awards": {
      "Dentists & Specialists": [
        "Dentist of the Year",
        "Cosmetic Dentist of the Year",
        "Orthodontist of the Year",
        "Young Dentist of the Year",
        "Lifetime Achievement in Dentistry"
      ],
      "Dental Support Professionals": [
        "Dental Hygienist of the Year",
        "Dental Technician of the Year",
        "Excellence in Dental Assistance"
      ]
    },
    "Public Health & Community Dentistry": {
      "Social Impact": [
        "Excellence in Rural Dental Care",
        "Community Oral Health Initiative Award",
        "School Dental Health Program Excellence",
        "Affordable Dental Care Excellence Award"
      ]
    },
    "Special Recognition Awards": {
      "General": [
        "Global Dental Excellence Award",
        "Dental Innovation Champion Award",
        "Women Leader in Dentistry Award",
        "Emerging Dental Entrepreneur Award",
        "Humanitarian Dental Service Award"
      ]
    }
  }
};

const initialForm = {
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
  const { token, user: authUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
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
      setForm(() => ({
        ...initialForm,
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
        await createNomination(formData, token);
        navigate("/success");
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
    const base = "w-full bg-[#2a0d0f]/80 border rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-[#d4af37]/50 appearance-none cursor-pointer";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-white/10 hover:border-[#d4af37]/50 hover:bg-[#3a1418]";
    return `${base} ${errorClass}`;
  };

  const getInputClass = (name) => {
    const base = "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/50";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-white/20 hover:border-[#d4af37]/40";
    return `${base} ${errorClass}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3a1418] flex items-center justify-center">
        <FiRefreshCcw className="text-[#d4af37] w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-32 relative overflow-hidden bg-[#3a1418]">
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
              <span className="text-2xl sm:text-3xl md:text-5xl text-[#ffb400] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Global
              </span>
              <span className="text-2xl sm:text-3xl md:text-5xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Global Icon Awards
              </span>
              <span className="text-2xl sm:text-3xl md:text-5xl text-[#ffb400] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                & summit 2026
              </span>
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
                        Field Classification *
                      </label>
                      <div className="relative group">
                        <select
                          name="field"
                          ref={el => inputRef.current.field = el}
                          value={form.field}
                          onChange={handleChange}
                          className={getSelectClass("field")}
                        >
                          <option value="" className="bg-[#3a1418]">Select Field</option>
                          {Object.keys(fieldMap).map((f) => (
                            <option key={f} value={f} className="bg-[#3a1418]">{f}</option>
                          ))}
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
                      </div>
                    </div>

                    <div className="relative group/select">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within/select:text-[#d4af37] transition-colors">
                        Award Subcategory *
                      </label>
                      <div className="relative group">
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
                {["New Delhi", "Dubai"].map((loc) => (
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
