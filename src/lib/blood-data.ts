// Shared blood / city / demo donor data.
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
] as const;

export const COMPATIBILITY: Record<BloodGroup, { canDonateTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }> = {
  "O-":  { canDonateTo: ["O-","O+","A-","A+","B-","B+","AB-","AB+"], canReceiveFrom: ["O-"] },
  "O+":  { canDonateTo: ["O+","A+","B+","AB+"], canReceiveFrom: ["O-","O+"] },
  "A-":  { canDonateTo: ["A-","A+","AB-","AB+"], canReceiveFrom: ["O-","A-"] },
  "A+":  { canDonateTo: ["A+","AB+"], canReceiveFrom: ["O-","O+","A-","A+"] },
  "B-":  { canDonateTo: ["B-","B+","AB-","AB+"], canReceiveFrom: ["O-","B-"] },
  "B+":  { canDonateTo: ["B+","AB+"], canReceiveFrom: ["O-","O+","B-","B+"] },
  "AB-": { canDonateTo: ["AB-","AB+"], canReceiveFrom: ["O-","A-","B-","AB-"] },
  "AB+": { canDonateTo: ["AB+"], canReceiveFrom: ["O-","O+","A-","A+","B-","B+","AB-","AB+"] },
};

const NAMES = [
  "Rahul Sharma","Priya Patel","Arjun Mehta","Sneha Iyer","Vikram Singh",
  "Ananya Reddy","Rohan Gupta","Kavya Nair","Aditya Joshi","Meera Krishnan",
  "Sanjay Kumar","Divya Menon","Karthik Raj","Pooja Verma","Nikhil Desai",
  "Ishita Bose","Aryan Khanna","Riya Malhotra","Suresh Pillai","Neha Agarwal",
];
const AREAS: Record<string, string[]> = {
  Mumbai: ["Andheri","Bandra","Powai","Dadar","Borivali"],
  Delhi: ["Saket","Connaught Place","Dwarka","Karol Bagh","Rohini"],
  Bangalore: ["Indiranagar","Koramangala","Whitefield","HSR Layout","Jayanagar"],
  Chennai: ["Anna Nagar","T. Nagar","Velachery","Adyar","Mylapore"],
  Hyderabad: ["Banjara Hills","Gachibowli","Madhapur","Kukatpally","Begumpet"],
};

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export interface DemoDonor {
  id: string;
  full_name: string;
  blood_group: BloodGroup;
  phone: string;
  city: string;
  area: string;
  is_available: boolean;
  reliability_score: number;
  donations_count: number;
  last_donation_date: string;
  isDemo: true;
}

export function generateDemoDonors(blood_group: BloodGroup, city: string, count: number): DemoDonor[] {
  const rand = rng(
    blood_group.charCodeAt(0) * 31 + city.length * 17 + blood_group.length * 7,
  );
  const areas = AREAS[city] ?? ["Central","North","South","East","West"];
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[Math.floor(rand() * NAMES.length)];
    const days = Math.floor(rand() * 200) + 30;
    const date = new Date(); date.setDate(date.getDate() - days);
    return {
      id: `demo-${blood_group}-${city}-${i}`,
      full_name: name,
      blood_group,
      phone: `+91 9${Math.floor(rand() * 900000000 + 100000000)}`,
      city,
      area: areas[Math.floor(rand() * areas.length)],
      is_available: rand() > 0.15,
      reliability_score: 75 + Math.floor(rand() * 25),
      donations_count: 1 + Math.floor(rand() * 15),
      last_donation_date: date.toISOString().slice(0, 10),
      isDemo: true,
    };
  });
}
