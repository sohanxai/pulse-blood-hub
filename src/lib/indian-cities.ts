// Comprehensive list of Indian cities grouped by State / Union Territory.
// 500+ entries spanning every state & UT — used by the city combobox.
export interface CityEntry { city: string; state: string }

export const INDIAN_LOCATIONS: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Rajahmundry","Tirupati","Kakinada","Anantapur","Kadapa","Eluru","Ongole","Chittoor","Machilipatnam","Srikakulam","Vizianagaram","Tenali","Proddatur","Hindupur","Bhimavaram"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Tawang","Ziro","Tezu","Bomdila","Roing","Aalo","Khonsa"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tinsukia","Tezpur","Bongaigaon","Karimganj","Sivasagar","Goalpara","Barpeta","Dhubri","Diphu","North Lakhimpur"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia","Arrah","Begusarai","Katihar","Munger","Chhapra","Saharsa","Hajipur","Sasaram","Dehri","Bettiah","Motihari","Bagaha","Siwan","Kishanganj","Jamalpur","Buxar","Jehanabad"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon","Jagdalpur","Raigarh","Ambikapur","Mahasamund","Dhamtari","Chirmiri","Janjgir"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda","Bicholim","Curchorem","Sanquelim","Cuncolim","Quepem","Canacona"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh","Gandhinagar","Gandhidham","Anand","Navsari","Morbi","Nadiad","Surendranagar","Bharuch","Mehsana","Bhuj","Porbandar","Palanpur","Valsad","Vapi","Veraval","Godhra","Patan","Botad"],
  "Haryana": ["Faridabad","Gurugram","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal","Sonipat","Panchkula","Bhiwani","Sirsa","Bahadurgarh","Jind","Thanesar","Kaithal","Rewari","Palwal","Fatehabad","Narnaul"],
  "Himachal Pradesh": ["Shimla","Dharamshala","Solan","Mandi","Kullu","Manali","Hamirpur","Una","Bilaspur","Chamba","Palampur","Nahan","Sundernagar","Kangra","Kasauli"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh","Deoghar","Giridih","Ramgarh","Phusro","Medininagar","Chaibasa","Dumka","Chirkunda","Sahebganj","Godda"],
  "Karnataka": ["Bengaluru","Mysuru","Mangaluru","Hubballi","Belagavi","Kalaburagi","Davangere","Ballari","Vijayapura","Shivamogga","Tumakuru","Udupi","Hassan","Chitradurga","Raichur","Bidar","Hosapete","Gadag","Bagalkot","Chikkamagaluru","Mandya","Karwar","Kolar","Robertsonpet","Bhadravati"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Kannur","Alappuzha","Palakkad","Malappuram","Kottayam","Pathanamthitta","Idukki","Kasaragod","Wayanad","Ernakulam","Manjeri","Thalassery","Ponnani","Vatakara","Kayamkulam","Neyyattinkara","Changanassery","Perinthalmanna"],
  "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa","Singrauli","Burhanpur","Khandwa","Morena","Bhind","Chhindwara","Guna","Shivpuri","Vidisha","Chhatarpur","Damoh","Mandsaur","Khargone","Neemuch","Pithampur","Hoshangabad","Itarsi","Sehore","Betul","Datia"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Thane","Navi Mumbai","Solapur","Kolhapur","Amravati","Sangli","Jalgaon","Akola","Latur","Dhule","Ahmednagar","Chandrapur","Parbhani","Ichalkaranji","Jalna","Bhiwandi","Nanded","Malegaon","Kalyan","Vasai-Virar","Panvel","Satara","Yavatmal","Ratnagiri","Beed","Wardha","Hingoli","Osmanabad","Buldhana","Gondia"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur","Kakching","Ukhrul","Senapati","Tamenglong","Jiribam","Moirang"],
  "Meghalaya": ["Shillong","Tura","Jowai","Nongstoin","Williamnagar","Baghmara","Resubelpara","Mawkyrwat","Nongpoh"],
  "Mizoram": ["Aizawl","Lunglei","Champhai","Serchhip","Kolasib","Saiha","Lawngtlai","Mamit"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha","Zunheboto","Mon","Phek","Kiphire","Longleng"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Bhadrak","Baripada","Jharsuguda","Jeypore","Barbil","Rayagada","Angul","Dhenkanal","Paradip","Kendrapara","Bargarh","Bolangir"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Hoshiarpur","Mohali","Pathankot","Moga","Firozpur","Batala","Abohar","Malerkotla","Khanna","Phagwara","Muktsar","Barnala","Rajpura","Kapurthala","Sangrur","Sunam"],
  "Rajasthan": ["Jaipur","Jodhpur","Kota","Udaipur","Bikaner","Ajmer","Bhilwara","Alwar","Sikar","Pali","Sri Ganganagar","Tonk","Kishangarh","Beawar","Hanumangarh","Dhaulpur","Bharatpur","Sawai Madhopur","Churu","Nagaur","Banswara","Chittorgarh","Jhunjhunu","Barmer","Jaisalmer","Bundi","Dausa","Pratapgarh"],
  "Sikkim": ["Gangtok","Namchi","Gyalshing","Mangan","Jorethang","Rangpo","Singtam","Pakyong"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Tiruppur","Erode","Vellore","Thoothukudi","Dindigul","Thanjavur","Kanchipuram","Karur","Sivakasi","Cuddalore","Nagercoil","Kumbakonam","Hosur","Pollachi","Rajapalayam","Pudukkottai","Neyveli","Nagapattinam","Ambur","Karaikudi","Tiruvannamalai","Krishnagiri","Ooty","Kanyakumari"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Ramagundam","Mahbubnagar","Nalgonda","Adilabad","Suryapet","Miryalaguda","Siddipet","Jagityal","Mancherial","Bhongir","Kothagudem","Sangareddy","Medak","Vikarabad"],
  "Tripura": ["Agartala","Udaipur","Dharmanagar","Kailasahar","Belonia","Khowai","Ambassa","Sabroom","Sonamura"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Ghaziabad","Agra","Varanasi","Meerut","Prayagraj","Bareilly","Aligarh","Moradabad","Saharanpur","Gorakhpur","Noida","Firozabad","Loni","Jhansi","Muzaffarnagar","Mathura","Rampur","Shahjahanpur","Farrukhabad","Mau","Hapur","Etawah","Mirzapur","Bulandshahr","Sambhal","Amroha","Hardoi","Fatehpur","Raebareli","Orai","Sitapur","Bahraich","Modinagar","Unnao","Jaunpur","Lakhimpur","Hathras","Banda","Pilibhit","Barabanki","Khurja","Gonda","Mainpuri","Lalitpur","Etah","Deoria","Ujhani","Ghazipur","Sultanpur","Azamgarh","Bijnor","Sahaswan","Basti","Chandausi","Akbarpur"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur","Rishikesh","Pithoragarh","Ramnagar","Mussoorie","Nainital","Almora","Tehri","Pauri","Kotdwar","Manglaur"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Bardhaman","Malda","Baharampur","Habra","Kharagpur","Shantipur","Dankuni","Dhulian","Ranaghat","Haldia","Raiganj","Krishnanagar","Nabadwip","Medinipur","Jalpaiguri","Balurghat","Basirhat","Bankura","Chakdaha","Darjeeling","Alipurduar","Purulia","Jangipur","Bolpur","Bangaon","Cooch Behar"],
  "Andaman and Nicobar Islands": ["Port Blair","Garacharma","Bombooflat","Diglipur","Mayabunder","Rangat","Car Nicobar"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa","Daman","Diu","Amli","Naroli"],
  "Delhi": ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Dwarka","Rohini","Saket","Karol Bagh","Connaught Place","Pitampura","Janakpuri","Lajpat Nagar","Vasant Kunj","Mayur Vihar","Shahdara","Najafgarh"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Sopore","Kathua","Udhampur","Punch","Rajouri","Kupwara","Pulwama","Kulgam","Budgam","Bandipora","Ganderbal","Doda","Kishtwar","Samba","Reasi"],
  "Ladakh": ["Leh","Kargil","Nubra","Drass","Zanskar","Diskit"],
  "Lakshadweep": ["Kavaratti","Agatti","Minicoy","Andrott","Amini","Kalpeni","Kadmat"],
  "Puducherry": ["Puducherry","Karaikal","Yanam","Mahe","Ozhukarai","Villianur"],
};

export const ALL_INDIAN_CITIES: CityEntry[] = Object.entries(INDIAN_LOCATIONS)
  .flatMap(([state, cities]) => cities.map((city) => ({ city, state })))
  .sort((a, b) => a.city.localeCompare(b.city));

export const INDIAN_STATES = Object.keys(INDIAN_LOCATIONS).sort();
