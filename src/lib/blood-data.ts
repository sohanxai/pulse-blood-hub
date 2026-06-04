// Shared blood / city / demo donor data.
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = (typeof BLOOD_GROUPS)[number];

// Full India: States, UTs and major cities.
export const STATE_CITIES: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati","Rajahmundry","Kakinada"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Tawang"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tezpur"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia","Ara"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh"],
  "Haryana": ["Faridabad","Gurugram","Panipat","Ambala","Karnal","Hisar","Rohtak","Sonipat"],
  "Himachal Pradesh": ["Shimla","Dharamshala","Solan","Mandi","Kullu","Manali"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh","Deoghar"],
  "Karnataka": ["Bengaluru","Mysuru","Mangaluru","Hubballi","Belagavi","Davangere","Ballari","Tumakuru","Shivamogga"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Kannur","Alappuzha","Palakkad"],
  "Madhya Pradesh": ["Indore","Bhopal","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Rewa"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Thane","Solapur","Kolhapur","Amravati","Navi Mumbai"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur"],
  "Meghalaya": ["Shillong","Tura","Jowai"],
  "Mizoram": ["Aizawl","Lunglei","Champhai"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Pathankot"],
  "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer","Alwar","Bhilwara"],
  "Sikkim": ["Gangtok","Namchi","Gyalshing"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Erode","Vellore","Thoothukudi"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Secunderabad"],
  "Tripura": ["Agartala","Udaipur","Dharmanagar"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Ghaziabad","Agra","Varanasi","Meerut","Prayagraj","Noida","Bareilly","Aligarh","Moradabad","Gorakhpur"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rishikesh","Nainital"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Bardhaman","Malda"],
  // Union Territories
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Silvassa","Diu"],
  "Delhi": ["New Delhi","Dwarka","Rohini","Saket","Karol Bagh","Connaught Place","Janakpuri","Pitampura"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla"],
  "Ladakh": ["Leh","Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry","Karaikal","Yanam"],
};

export const STATES = Object.keys(STATE_CITIES).sort();
export const ALL_CITIES: string[] = Array.from(
  new Set(Object.values(STATE_CITIES).flat()),
).sort();

// Backwards-compat export
export const CITIES = ALL_CITIES;

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

function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
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

const GENERIC_AREAS = ["Central","North","South","East","West","Sector 5","Civil Lines","Old Town"];

export function generateDemoDonors(blood_group: BloodGroup, city: string, count: number): DemoDonor[] {
  const seed = blood_group.charCodeAt(0) * 31 + city.length * 17 + (city.charCodeAt(0) || 1) * 7;
  const rand = rng(seed);
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
      area: GENERIC_AREAS[Math.floor(rand() * GENERIC_AREAS.length)],
      is_available: rand() > 0.15,
      reliability_score: 75 + Math.floor(rand() * 25),
      donations_count: 1 + Math.floor(rand() * 15),
      last_donation_date: date.toISOString().slice(0, 10),
      isDemo: true,
    };
  });
}
