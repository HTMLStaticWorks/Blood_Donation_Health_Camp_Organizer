// LifeStream Blood Donation & Health Camp Organizer - Static Datasets & Registry Seeding

const DEPARTMENTS = [
  {
    id: "blood-donation",
    name: "Blood Donation Camps",
    icon: "droplet",
    desc: "Organizing safe whole blood, plasma, and platelet donation drives to save lives and support blood banks.",
    doctorsCount: 3,
    timing: "Mon - Sun, 24/7 Requests Available",
    image: "images/camp_blood_donation.png"
  },
  {
    id: "cardiology-camp",
    name: "Cardiology & ECG Screening",
    icon: "heart",
    desc: "Free heart health screenings, ECG tests, blood pressure tracking, and expert counseling for cardiac wellness.",
    doctorsCount: 2,
    timing: "Mon - Fri, 09:00 AM - 04:00 PM",
    image: "images/camp_cardiology.png"
  },
  {
    id: "eye-camp",
    name: "Eye Screening & Spectacles",
    icon: "eye",
    desc: "Comprehensive vision testing, cataract detection, preventive eye care, and free spectacles distribution.",
    doctorsCount: 2,
    timing: "Mon - Sat, 08:30 AM - 05:30 PM",
    image: "images/camp_eye_screening.png"
  },
  {
    id: "pediatric-camp",
    name: "Pediatric & Child Wellness",
    icon: "baby",
    desc: "Child health checkups, nutritional advice, growth monitoring, and essential immunization drives.",
    doctorsCount: 2,
    timing: "Mon - Fri, 10:00 AM - 05:00 PM",
    image: "images/camp_pediatric.png"
  },
  {
    id: "general-checkup",
    name: "General Medicine & Diagnostics",
    icon: "stethoscope",
    desc: "Free physician consultations, blood glucose checkups, body mass index (BMI) monitoring, and lifestyle guides.",
    doctorsCount: 3,
    timing: "Mon - Sat, 08:00 AM - 06:00 PM",
    image: "images/camp_general_checkup.png"
  },
  {
    id: "dental-checkup",
    name: "Dental Health & Hygiene",
    icon: "activity",
    desc: "Free dental consultations, scaling, oral health checkups, and awareness campaigns on oral hygiene.",
    doctorsCount: 2,
    timing: "Tue - Sat, 09:00 AM - 05:00 PM",
    image: "images/camp_dental.png"
  },
  {
    id: "womens-health",
    name: "Women's Health & Wellness",
    icon: "users",
    desc: "Maternal healthcare counseling, free gynecological checkups, and breast cancer awareness drives.",
    doctorsCount: 2,
    timing: "Mon - Sat, 08:00 AM - 04:00 PM",
    image: "images/camp_womens_health.png"
  },
  {
    id: "ent-screening",
    name: "ENT Screening",
    icon: "ear",
    desc: "Ear, nose, and throat screenings, hearing assessment tests, and basic treatment consultations.",
    doctorsCount: 2,
    timing: "Mon - Fri, 10:00 AM - 06:00 PM",
    image: "images/camp_ent.png"
  },
  {
    id: "orthopedic-rehab",
    name: "Orthopedic & Bone Health",
    icon: "activity",
    desc: "Bone mineral density tests, joint pain consulting, posture analysis, and physical rehab camps.",
    doctorsCount: 2,
    timing: "Mon - Sat, 09:00 AM - 05:00 PM",
    image: "images/camp_orthopedic.png"
  }
];

const DOCTORS = [
  {
    id: "doc-1",
    name: "Dr. Marcus Sterling",
    deptId: "blood-donation",
    deptName: "Blood Donation Camps",
    qualification: "MD (Hematology), Blood Bank Officer",
    experience: "16 Years",
    timing: "Mon, Wed, Fri (09:00 AM - 01:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
    bio: "Lead Blood Bank Officer specializing in safe transfusion protocols, mobile blood collection, and donor health screening.",
    availableDays: ["Monday", "Wednesday", "Friday"],
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
  },
  {
    id: "doc-2",
    name: "Dr. Elena Rostova",
    deptId: "cardiology-camp",
    deptName: "Cardiology & ECG Screening",
    qualification: "MD, DM (Cardiology), FACC",
    experience: "12 Years",
    timing: "Tue, Thu, Sat (10:00 AM - 02:00 PM)",
    fee: "Free",
    image: "https://images.pexels.com/photos/5998467/pexels-photo-5998467.jpeg",
    bio: "Senior Cardiologist coordinating free community heart screenings, ECG analysis, and hypertension counseling.",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    slots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"]
  },
  {
    id: "doc-3",
    name: "Dr. Sarah Jenkins",
    deptId: "pediatric-camp",
    deptName: "Pediatric & Child Wellness",
    qualification: "MD (Pediatrics), MPH",
    experience: "14 Years",
    timing: "Mon, Tue, Thu (01:00 PM - 05:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    bio: "Dedicated pediatrician focusing on community child immunizations, nutrition guidelines, and growth checkup camps.",
    availableDays: ["Monday", "Tuesday", "Thursday"],
    slots: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]
  },
  {
    id: "doc-4",
    name: "Dr. Rajesh Koothrapali",
    deptId: "general-checkup",
    deptName: "General Medicine & Diagnostics",
    qualification: "MD (Internal Medicine)",
    experience: "11 Years",
    timing: "Wed, Fri (10:00 AM - 03:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
    bio: "General Physician lead for primary checkup camps, blood sugar level diagnosis, and preventative wellness consulting.",
    availableDays: ["Wednesday", "Friday"],
    slots: ["10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"]
  },
  {
    id: "doc-5",
    name: "Dr. Arthur Pendelton",
    deptId: "eye-camp",
    deptName: "Eye Screening & Spectacles",
    qualification: "MS (Ophthalmology)",
    experience: "20 Years",
    timing: "Mon, Tue, Wed (09:00 AM - 12:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop",
    bio: "Veteran Eye Surgeon leading cataract screening drives and spectacles distribution units in community centers.",
    availableDays: ["Monday", "Tuesday", "Wednesday"],
    slots: ["09:00 AM", "10:00 AM", "11:00 AM"]
  },
  {
    id: "doc-6",
    name: "Dr. Chloe Vance",
    deptId: "orthopedic-rehab",
    deptName: "Orthopedic & Bone Health",
    qualification: "MS (Ortho)",
    experience: "9 Years",
    timing: "Thu, Fri, Sat (02:00 PM - 06:00 PM)",
    fee: "Free",
    image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Orthopedic specialist running bone mineral density test camps and managing physical rehabilitation drives.",
    availableDays: ["Thursday", "Friday", "Saturday"],
    slots: ["02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]
  },
  {
    id: "doc-7",
    name: "Dr. Kenji Sato",
    deptId: "dental-checkup",
    deptName: "Dental Health & Hygiene",
    qualification: "DDS (Dental Surgery)",
    experience: "15 Years",
    timing: "Mon - Fri (09:00 AM - 01:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
    bio: "Lead Dental Consultant focused on community dental screenings, tooth decay prevention drives, and oral hygiene education.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
  },
  {
    id: "doc-8",
    name: "Dr. Maya Angelis",
    deptId: "womens-health",
    deptName: "Women's Health & Wellness",
    qualification: "MD (Gynecology)",
    experience: "10 Years",
    timing: "Tue, Thu, Sat (11:00 AM - 04:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Maternal and gynecological consultant hosting free wellness consultations and breast cancer awareness drives.",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    slots: ["11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM"]
  },
  {
    id: "doc-9",
    name: "Dr. Alan Mercer",
    deptId: "ent-screening",
    deptName: "ENT Screening",
    qualification: "MD (Otolaryngology)",
    experience: "18 Years",
    timing: "Mon - Sat (08:00 AM - 12:00 PM)",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=600&auto=format&fit=crop",
    bio: "ENT Lead specialist checking hearing disorders, nose/throat health screens, and allergy counseling during camps.",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    slots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
  }
];

const INITIAL_PATIENT = {
  name: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  phone: "+1 (555) 019-2834",
  dob: "1990-05-15",
  gender: "Female",
  bloodGroup: "O+",
  allergies: "None",
  conditions: "Healthy",
  emergencyContact: "John Jenkins (+1 555-019-2835)",
  appointments: [
    {
      id: "apt-101",
      doctorName: "Dr. Marcus Sterling",
      deptName: "Blood Donation Camps",
      date: "2026-08-20",
      time: "10:00 AM",
      status: "Upcoming",
      type: "Whole Blood Donation"
    },
    {
      id: "apt-102",
      doctorName: "Dr. Maya Angelis",
      deptName: "Women's Health & Wellness",
      date: "2026-08-10",
      time: "02:00 PM",
      status: "Completed",
      type: "General Consultation"
    },
    {
      id: "apt-103",
      doctorName: "Dr. Alan Mercer",
      deptName: "ENT Screening",
      date: "2026-07-15",
      time: "09:30 AM",
      status: "Completed",
      type: "Hearing Checkup"
    }
  ],
  prescriptions: [
    {
      id: "rx-982",
      doctorName: "Dr. Alan Mercer",
      deptName: "ENT Screening",
      date: "2026-07-15",
      medicines: [
        { name: "Saline Nasal Spray", dosage: "2 sprays each nostril, twice daily", duration: "10 Days" }
      ],
      instructions: "Keep hydrated. Follow up if allergy persists."
    }
  ],
  labReports: [
    {
      id: "lab-439",
      testName: "Blood Donation Eligibility Screen",
      testDate: "2026-07-16",
      status: "Verified",
      doctorName: "Dr. Marcus Sterling",
      results: [
        { parameter: "Hemoglobin", value: "14.2 g/dL", referenceRange: "12.0 - 16.0 g/dL", status: "Eligible" },
        { parameter: "Blood Pressure", value: "120/80 mmHg", referenceRange: "90/60 - 140/90 mmHg", status: "Eligible" },
        { parameter: "Pulse Rate", value: "72 bpm", referenceRange: "60 - 100 bpm", status: "Eligible" }
      ]
    }
  ]
};

// Seed localStorage if registry doesn't exist
if (!localStorage.getItem("hospital-users")) {
  localStorage.setItem("hospital-users", JSON.stringify([INITIAL_PATIENT]));
}

// Expose variables globally
window.DEPARTMENTS = DEPARTMENTS;
window.DOCTORS = DOCTORS;
window.INITIAL_PATIENT = INITIAL_PATIENT;
