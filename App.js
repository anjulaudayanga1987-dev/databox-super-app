import Login from './Login'; // අලුතින් එකතු කරන්න
import React, { useState, useRef } from 'react';
import { 
  FaBars, FaSearch, FaUserCircle, FaTelegram, FaWhatsapp, FaFacebook, 
  FaApple, FaAndroid, FaLine, FaViber, FaBtc, FaShoppingCart, FaExchangeAlt, 
  FaMobileAlt, FaUserSecret, FaHistory, FaFileArchive, FaMoneyBillWave, FaList, FaTimes 
} from 'react-icons/fa';
import { SiBinance, SiZalo } from 'react-icons/si';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  
  // --- File Upload, Row Count සහ Calculation සදහා State ---
  const [uploadedFileName, setUploadedFileName] = useState(""); 
  const [rowCount, setRowCount] = useState(0); 
  const [showModal, setShowModal] = useState(false); // Modal එක පෙන්වීමට
  const [calculatedCost, setCalculatedCost] = useState(0); // ගණනය කළ මුදල
  
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
        setRowCount(lines.length);
      };
      reader.readAsText(file);
    }
  };

  // --- Submit Click කළ විට ගණනය කිරීම සහ Modal එක පෙන්වීම ---
  const handleSubmitClick = () => {
    if (selectedService && rowCount > 0) {
        // ගණනය කිරීම: (පේළි ගණන / 10000) * ඒකක මිල
        const unitPrice = parseFloat(selectedService.price);
        const cost = (rowCount / 10000) * unitPrice;
        
        setCalculatedCost(cost.toFixed(3)); // දශම ස්ථාන 3කට සකසයි
        setShowModal(true); // Modal එක Open කරයි
    }
  };

  // --- Confirm Submit ---
  const handleConfirmSubmit = () => {
      alert("Task Submitted Successfully!");
      setShowModal(false);
      // මෙතැනින් Backend එකට දත්ත යැවිය හැක
  };

  const countryCodes = [
    { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
    { name: "American Samoa", code: "+1-684" }, { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" },
    { name: "Anguilla", code: "+1-264" }, { name: "Antarctica", code: "+672" }, { name: "Antigua and Barbuda", code: "+1-268" },
    { name: "Argentina", code: "+54" }, { name: "Armenia", code: "+374" }, { name: "Aruba", code: "+297" },
    { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" }, { name: "Azerbaijan", code: "+994" },
    { name: "Bahamas", code: "+1-242" }, { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" },
    { name: "Barbados", code: "+1-246" }, { name: "Belarus", code: "+375" }, { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" }, { name: "Benin", code: "+229" }, { name: "Bermuda", code: "+1-441" },
    { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" }, { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" }, { name: "British Indian Ocean Territory", code: "+246" },
    { name: "British Virgin Islands", code: "+1-284" }, { name: "Brunei", code: "+673" }, { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" }, { name: "Burundi", code: "+257" }, { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, { name: "Cape Verde", code: "+238" },
    { name: "Cayman Islands", code: "+1-345" }, { name: "Central African Republic", code: "+236" }, { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" }, { name: "China", code: "+86" }, { name: "Christmas Island", code: "+61" },
    { name: "Cocos Islands", code: "+61" }, { name: "Colombia", code: "+57" }, { name: "Comoros", code: "+269" },
    { name: "Cook Islands", code: "+682" }, { name: "Costa Rica", code: "+506" }, { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" }, { name: "Curacao", code: "+599" }, { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" }, { name: "Democratic Republic of the Congo", code: "+243" }, { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" }, { name: "Dominica", code: "+1-767" }, { name: "Dominican Republic", code: "+1-809" },
    { name: "East Timor", code: "+670" }, { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" }, { name: "Equatorial Guinea", code: "+240" }, { name: "Eritrea", code: "+291" },
    { name: "Estonia", code: "+372" }, { name: "Ethiopia", code: "+251" }, { name: "Falkland Islands", code: "+500" },
    { name: "Faroe Islands", code: "+298" }, { name: "Fiji", code: "+679" }, { name: "Finland", code: "+358" },
    { name: "France", code: "+33" }, { name: "French Polynesia", code: "+689" }, { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" }, { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" }, { name: "Gibraltar", code: "+350" }, { name: "Greece", code: "+30" },
    { name: "Greenland", code: "+299" }, { name: "Grenada", code: "+1-473" }, { name: "Guam", code: "+1-671" },
    { name: "Guatemala", code: "+502" }, { name: "Guernsey", code: "+44-1481" }, { name: "Guinea", code: "+224" },
    { name: "Guinea-Bissau", code: "+245" }, { name: "Guyana", code: "+592" }, { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" }, { name: "Hong Kong", code: "+852" }, { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" },
    { name: "Isle of Man", code: "+44-1624" }, { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" },
    { name: "Ivory Coast", code: "+225" }, { name: "Jamaica", code: "+1-876" }, { name: "Japan", code: "+81" },
    { name: "Jersey", code: "+44-1534" }, { name: "Jordan", code: "+962" }, { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" }, { name: "Kiribati", code: "+686" }, { name: "Kosovo", code: "+383" },
    { name: "Kuwait", code: "+965" }, { name: "Kyrgyzstan", code: "+996" }, { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" }, { name: "Lebanon", code: "+961" }, { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" }, { name: "Libya", code: "+218" }, { name: "Liechtenstein", code: "+423" },
    { name: "Lithuania", code: "+370" }, { name: "Luxembourg", code: "+352" }, { name: "Macau", code: "+853" },
    { name: "Macedonia", code: "+389" }, { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" }, { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" }, { name: "Marshall Islands", code: "+692" }, { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" }, { name: "Mayotte", code: "+262" }, { name: "Mexico", code: "+52" },
    { name: "Micronesia", code: "+691" }, { name: "Moldova", code: "+373" }, { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" }, { name: "Montenegro", code: "+382" }, { name: "Montserrat", code: "+1-664" },
    { name: "Morocco", code: "+212" }, { name: "Mozambique", code: "+258" }, { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" }, { name: "Nauru", code: "+674" }, { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" }, { name: "Netherlands Antilles", code: "+599" }, { name: "New Caledonia", code: "+687" },
    { name: "New Zealand", code: "+64" }, { name: "Nicaragua", code: "+505" }, { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" }, { name: "Niue", code: "+683" }, { name: "North Korea", code: "+850" },
    { name: "Northern Mariana Islands", code: "+1-670" }, { name: "Norway", code: "+47" }, { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" }, { name: "Palau", code: "+680" }, { name: "Palestine", code: "+970" },
    { name: "Panama", code: "+507" }, { name: "Papua New Guinea", code: "+675" }, { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" }, { name: "Philippines", code: "+63" }, { name: "Pitcairn", code: "+64" },
    { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, { name: "Puerto Rico", code: "+1-787" },
    { name: "Qatar", code: "+974" }, { name: "Republic of the Congo", code: "+242" }, { name: "Reunion", code: "+262" },
    { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" }, { name: "Rwanda", code: "+250" },
    { name: "Saint Barthelemy", code: "+590" }, { name: "Saint Helena", code: "+290" }, { name: "Saint Kitts and Nevis", code: "+1-869" },
    { name: "Saint Lucia", code: "+1-758" }, { name: "Saint Martin", code: "+590" }, { name: "Saint Pierre and Miquelon", code: "+508" },
    { name: "Saint Vincent and the Grenadines", code: "+1-784" }, { name: "Samoa", code: "+685" }, { name: "San Marino", code: "+378" },
    { name: "Sao Tome and Principe", code: "+239" }, { name: "Saudi Arabia", code: "+966" }, { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" }, { name: "Seychelles", code: "+248" }, { name: "Sierra Leone", code: "+232" },
    { name: "Singapore", code: "+65" }, { name: "Sint Maarten", code: "+1-721" }, { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" }, { name: "Solomon Islands", code: "+677" }, { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" }, { name: "South Korea", code: "+82" }, { name: "South Sudan", code: "+211" },
    { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" }, { name: "Sudan", code: "+249" },
    { name: "Suriname", code: "+597" }, { name: "Svalbard and Jan Mayen", code: "+47" }, { name: "Swaziland", code: "+268" },
    { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" }, { name: "Tajikistan", code: "+992" }, { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" }, { name: "Togo", code: "+228" }, { name: "Tokelau", code: "+690" },
    { name: "Tonga", code: "+676" }, { name: "Trinidad and Tobago", code: "+1-868" }, { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" }, { name: "Turkmenistan", code: "+993" }, { name: "Turks and Caicos Islands", code: "+1-649" },
    { name: "Tuvalu", code: "+688" }, { name: "U.S. Virgin Islands", code: "+1-340" }, { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" }, { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" }, { name: "Uruguay", code: "+598" }, { name: "Uzbekistan", code: "+998" },
    { name: "Vanuatu", code: "+678" }, { name: "Vatican", code: "+379" }, { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" }, { name: "Wallis and Futuna", code: "+681" }, { name: "Western Sahara", code: "+212" },
    { name: "Yemen", code: "+967" }, { name: "Zambia", code: "+260" }, { name: "Zimbabwe", code: "+263" }
  ];

  const menuItems = [
    { name: 'Product overview', icon: <FaBtc /> },
    { name: 'Status detection', icon: <FaExchangeAlt /> },
    { name: 'Active detection', icon: <FaMobileAlt /> },
    { name: 'Socialize detection', icon: <FaUserSecret /> },
    { name: 'Shopping detection', icon: <FaShoppingCart /> },
    { name: 'Exchange detection', icon: <FaBtc /> },
    { name: 'Device detection', icon: <FaApple /> },
    { name: 'Senior detection', icon: <FaUserSecret /> },
    { name: 'Days detection', icon: <FaHistory /> },
    { name: 'Number archiving', icon: <FaFileArchive /> },
    { name: 'Expense', icon: <FaMoneyBillWave /> },
  ];

  const services = [
    { id: 1, title: 'Number status detection', price: '5.571', total: '10,000', icon: <FaMobileAlt />, color: 'bg-blue-500' },
    { id: 2, title: 'TG status detection', price: '6.286', total: '10,000', icon: <FaTelegram />, color: 'bg-blue-400' },
    { id: 3, title: 'TG days detection', price: '6.286', total: '10,000', icon: <FaTelegram />, color: 'bg-blue-400' },
    { id: 4, title: 'TG senior detection', price: '16.285', total: '10,000', icon: <FaTelegram />, color: 'bg-blue-400' },
    { id: 5, title: 'Number active detection', price: '7.715', total: '10,000', icon: <FaMobileAlt />, color: 'bg-blue-500' },
    { id: 6, title: 'Ws status detection', price: '2.115', total: '10,000', icon: <FaWhatsapp />, color: 'bg-green-500' },
    { id: 7, title: 'Ws business detection', price: '2.55', total: '10,000', icon: <FaWhatsapp />, color: 'bg-green-600' },
    { id: 8, title: 'Ws days detection', price: '4.142', total: '10,000', icon: <FaWhatsapp />, color: 'bg-green-500' },
    { id: 9, title: 'Ws senior detection', price: '9.143', total: '10,000', icon: <FaWhatsapp />, color: 'bg-green-500' },
    { id: 10, title: 'Ios status dynamics detection', price: '4.857', total: '10,000', icon: <FaApple />, color: 'bg-red-500' },
    { id: 11, title: 'Ios status static detection', price: '4.143', total: '10,000', icon: <FaApple />, color: 'bg-red-500' },
    { id: 12, title: 'Zalo status detection', price: '4.143', total: '10,000', icon: <SiZalo />, color: 'bg-blue-600' },
    { id: 13, title: 'Zalo senior detection', price: '13.429', total: '10,000', icon: <SiZalo />, color: 'bg-blue-600' },
    { id: 14, title: 'Rcs status detection', price: '4.857', total: '10,000', icon: <FaAndroid />, color: 'bg-green-400' },
    { id: 15, title: 'Line status detection', price: '9.143', total: '10,000', icon: <FaLine />, color: 'bg-green-500' },
    { id: 16, title: 'Line senior detection', price: '12.0', total: '10,000', icon: <FaLine />, color: 'bg-green-500' },
    { id: 17, title: 'Fb status detection', price: '2.714', total: '10,000', icon: <FaFacebook />, color: 'bg-blue-800' },
    { id: 18, title: 'FbEmail status detection', price: '2.714', total: '10,000', icon: <FaFacebook />, color: 'bg-blue-800' },
    { id: 19, title: 'Viber status detection', price: '3.429', total: '10,000', icon: <FaViber />, color: 'bg-purple-600' },
    { id: 20, title: 'Viber days detection', price: '9.143', total: '10,000', icon: <FaViber />, color: 'bg-purple-600' },
    { id: 21, title: 'Binance status detection', price: '9.15', total: '10,000', icon: <SiBinance />, color: 'bg-yellow-500' },
    { id: 22, title: 'Okx status detection', price: '12.0', total: '10,000', icon: <FaBtc />, color: 'bg-gray-800' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 relative">
      
      {/* --- PROMPT BOX MODAL (CONFIRMATION) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-gray-700">prompt box</h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                        <FaTimes />
                    </button>
                </div>
                {/* Body */}
                <div className="p-6 text-sm text-gray-600">
                    <p>This file has a total of <span className="font-bold text-black">{rowCount}</span> mobile phone number.</p>
                    <p className="mt-2">This task will consume <span className="font-bold text-black">{calculatedCost}</span> points. Are you sure you want to submit it?</p>
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button 
                        onClick={handleConfirmSubmit} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold transition"
                    >
                        Submit
                    </button>
                    <button 
                        onClick={() => setShowModal(false)} 
                        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded text-sm font-bold transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`bg-white h-full shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} overflow-y-auto`}>
        <div className="p-4 flex items-center justify-center border-b">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
             <FaBtc size={28} />
             {isSidebarOpen && <span>Databox</span>}
          </div>
        </div>
        <ul className="mt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center gap-4 p-4 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition text-gray-500 text-sm font-medium">
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-blue-600">
              <FaBars size={20} />
            </button>
            <h2 className="font-semibold text-gray-700 hidden md:block">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
               <input type="text" placeholder="Search here..." className="bg-transparent outline-none text-sm text-gray-600 w-48"/>
               <FaSearch className="text-gray-400" />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
               <FaUserCircle size={32} className="text-gray-400"/>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {selectedService ? (
            
            // --- FORM VIEW ---
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-full text-white ${selectedService.color} text-lg`}>
                        {selectedService.icon}
                    </span>
                    <h2 className="text-lg font-bold text-gray-700">Add {selectedService.title}</h2>
                </div>
                <button 
                    onClick={() => { setSelectedService(null); setUploadedFileName(""); setRowCount(0); }} 
                    className="flex items-center gap-2 text-gray-600 font-bold text-sm hover:text-blue-600 transition"
                >
                    <FaList /> Go to the list
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">Balance</label>
                    <div className="bg-gray-100 p-2.5 rounded border border-gray-200 text-red-500 font-bold text-sm">
                       0.8590
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">Price</label>
                     <div className="bg-blue-50 p-2.5 rounded border border-blue-100 text-red-500 font-bold text-sm">
                       {selectedService.price}
                    </div>
                 </div>
                 
                 {/* Active Days */}
                 <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">Active days</label>
                    <select className="w-full border border-gray-300 p-2.5 rounded text-sm text-gray-500 focus:outline-none focus:border-blue-500">
                        <option>Please select days (required)</option>
                        <option value="0">0 days</option>
                        <option value="1">1 days</option>
                        <option value="2">2 days</option>
                        <option value="3">3 days</option>
                        <option value="5">5 days</option>
                        <option value="7">7 days</option>
                        <option value="15">15 days</option>
                        <option value="30">30 days</option>
                        <option value="45">45 days</option>
                        <option value="60">60 days</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">File type</label>
                    <select className="w-full border border-gray-300 p-2.5 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500">
                        <option>Phone</option>
                        <option>User ID</option>
                    </select>
                 </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 mb-2">Task name</label>
                <input 
                    type="text" 
                    placeholder="Please enter the task name" 
                    className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

               {/* Country Code */}
               <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 mb-2">Country code</label>
                <select className="w-full border border-gray-300 p-2.5 rounded text-sm text-gray-500 focus:outline-none focus:border-blue-500 max-h-40">
                    <option value="">Please select a country code (required)</option>
                    {countryCodes.map((country, index) => (
                        <option key={index} value={country.code}>
                            {country.name} ({country.code})
                        </option>
                    ))}
                </select>
              </div>

              {/* Upload Files */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-600 mb-2">Upload files</label>
                <div className="flex w-full border border-gray-300 rounded overflow-hidden">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept=".txt" 
                      className="hidden" 
                      style={{ display: 'none' }}
                    />

                    <input 
                        type="text" 
                        value={uploadedFileName}
                        placeholder="Please upload documents to be screened (required)" 
                        className="flex-1 p-2.5 text-sm outline-none text-gray-500"
                        readOnly
                    />
                    
                    <button 
                        onClick={handleBrowseClick}
                        className="bg-gray-100 px-6 py-2 text-sm text-gray-600 font-bold hover:bg-gray-200 border-l transition"
                    >
                        Browse
                    </button>
                </div>
                
                {/* Submit Button */}
                {rowCount > 0 && (
                   <div className="mt-4">
                     <button 
                        onClick={handleSubmitClick}
                        className="bg-red-600 text-white font-bold py-3 px-6 rounded shadow-md hover:bg-red-700 transition text-sm"
                     >
                        Submit now ({rowCount} Row)
                     </button>
                   </div>
                )}
              </div>

              <div className="text-xs text-gray-400 space-y-1">
                <p>Note: No matter whether the number in the number file has a country code or not, the country code must be selected</p>
                <p>Note: Numbers uploaded in each batch can only be numbers from the same country...</p>
                <p>Note: The file format only supports TXT format files...</p>
              </div>

            </div>

          ) : (
            // --- DASHBOARD VIEW ---
            <>
                <h3 className="font-bold text-gray-800 mb-4">Basic information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-gray-700">Balance</p>
                            <h2 className="text-2xl font-bold text-red-500 mt-2">0.86</h2>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-red-200 shadow-md">
                            Recharge
                        </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-sm font-bold text-gray-700">Spend points today</p>
                        <h2 className="text-2xl font-bold text-red-500 mt-2">0.00</h2>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-sm font-bold text-gray-700">Spend points this month</p>
                        <h2 className="text-2xl font-bold text-red-500 mt-2">460.27</h2>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-between">
                        <p className="text-sm font-bold text-gray-700">Customer Service Information</p>
                        <div className="flex justify-between items-center mt-2">
                        <a href="https://t.me/RockeyBaai" target="_blank" rel="noreferrer" className="text-red-400 text-xs font-bold hover:underline">
                            @RockeyBaai
                        </a>
                        <a href="https://t.me/RockeyBaai" target="_blank" rel="noreferrer">
                            <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                                More
                            </button>
                        </a>
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-gray-800 mb-4">Product Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
                    {services.map((service) => (
                    <div key={service.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-200">
                        <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-full text-white ${service.color} shadow-md`}>
                            {service.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm leading-tight">{service.title}</h4>
                            <p className="text-red-500 font-bold text-xs mt-1.5">
                                {service.price} <span className="text-gray-400 font-normal">Points/{service.total}</span>
                            </p>
                        </div>
                        </div>
                        <div className="flex justify-end mt-5">
                        <button 
                            onClick={() => setSelectedService(service)}
                            className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-6 py-1 rounded text-xs font-medium transition duration-300"
                        >
                            Enter
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;