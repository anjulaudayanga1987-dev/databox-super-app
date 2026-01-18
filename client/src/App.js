import React, { useState, useRef } from 'react';
import { 
  FaBars, FaSearch, FaUserCircle, FaTelegram, FaMobileAlt, FaBtc, FaExchangeAlt, FaUserPlus, FaUserSecret, FaList, FaTimes, FaSignOutAlt 
} from 'react-icons/fa';
import Register from './Register';
import Login from './Login'; // Login පිටුව සම්බන්ධ කිරීම

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); 
  
  // 1. යූසර් ලොග් වී ඇත්දැයි බැලීමට (User State)
  const [user, setUser] = useState(null); 

  // File Upload States
  const [uploadedFileName, setUploadedFileName] = useState(""); 
  const [rowCount, setRowCount] = useState(0); 
  const [showModal, setShowModal] = useState(false);
  const [calculatedCost, setCalculatedCost] = useState(0);
  const fileInputRef = useRef(null);

  // ලොග් වුනාම වැඩ කරන Function එක
  const handleLoginSuccess = (userData) => {
    setUser(userData); // යූසර්ව සේව් කරගන්නවා
    setCurrentView('dashboard'); // කෙලින්ම Dashboard එකට යවනවා
  };

  // ලොගවුට් වුනාම
  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleBrowseClick = () => fileInputRef.current.click();

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

  const handleSubmitClick = () => {
    if (selectedService && rowCount > 0) {
        const unitPrice = parseFloat(selectedService.price);
        const cost = (rowCount / 10000) * unitPrice;
        setCalculatedCost(cost.toFixed(3));
        setShowModal(true);
    }
  };

  const handleConfirmSubmit = () => {
      alert("Task Submitted Successfully!");
      setShowModal(false);
  };

  const menuItems = [
    { name: 'Product overview', icon: <FaBtc />, view: 'dashboard' },
    { name: 'Status detection', icon: <FaExchangeAlt />, view: 'dashboard' },
    { name: 'Register User', icon: <FaUserPlus />, view: 'register' },
    // ලොග් වී නැත්නම් Login පෙන්වන්න, ලොග් වී ඇත්නම් Logout පෙන්වන්න
    !user 
      ? { name: 'Login', icon: <FaUserSecret />, view: 'login' }
      : { name: 'Logout', icon: <FaSignOutAlt />, action: handleLogout }, 
  ];

  const services = [
    { id: 1, title: 'Number status detection', price: '5.571', total: '10,000', icon: <FaMobileAlt />, color: 'bg-blue-500' },
    { id: 2, title: 'TG status detection', price: '6.286', total: '10,000', icon: <FaTelegram />, color: 'bg-blue-400' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 relative">
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-gray-700">Confirm Task</h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
                </div>
                <div className="p-6 text-sm text-gray-600">
                    <p>Total numbers: <span className="font-bold text-black">{rowCount}</span></p>
                    <p className="mt-2">Cost: <span className="font-bold text-black">{calculatedCost}</span> points.</p>
                </div>
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button onClick={handleConfirmSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold">Submit</button>
                    <button onClick={() => setShowModal(false)} className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded text-sm font-bold">Cancel</button>
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
            <li 
                key={index} 
                onClick={() => { 
                    if (item.action) item.action(); // Logout නම් action එක
                    else { setCurrentView(item.view); setSelectedService(null); } // නැත්නම් View මාරු කිරීම
                }} 
                className={`flex items-center gap-4 p-4 cursor-pointer transition text-sm font-medium ${currentView === item.view ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-blue-600"><FaBars size={20} /></button>
            <h2 className="font-semibold text-gray-700 hidden md:block">Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
             {/* යූසර් ලොග් වී ඇත්නම් නම පෙන්වන්න */}
             {user ? (
                 <span className="font-bold text-blue-600">Hi, {user.username}</span>
             ) : (
                 <span className="text-gray-400 text-sm">Guest</span>
             )}
             <FaUserCircle size={32} className="text-gray-400"/>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          
          {/* VIEW SWITCHING LOGIC */}
          {currentView === 'register' ? (
              <Register />
          ) : currentView === 'login' ? (
              // Login පිටුවට අපි අර හදපු Function එක යවනවා
              <Login onLogin={handleLoginSuccess} /> 
          ) : selectedService ? (
            // SERVICE FORM
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Add {selectedService.title}</h2>
                  <button onClick={() => setSelectedService(null)} className="flex items-center gap-2 text-gray-500"><FaList /> List</button>
               </div>
               
               <div className="mb-8">
                <div className="flex w-full border border-gray-300 rounded overflow-hidden">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".txt" className="hidden" />
                    <input type="text" value={uploadedFileName} className="flex-1 p-2.5 text-sm" readOnly placeholder="Choose file..." />
                    <button onClick={handleBrowseClick} className="bg-gray-100 px-6 py-2 text-sm font-bold border-l">Browse</button>
                </div>
                {rowCount > 0 && (
                   <div className="mt-4"><button onClick={handleSubmitClick} className="bg-red-600 text-white font-bold py-3 px-6 rounded">Submit now ({rowCount} Rows)</button></div>
                )}
              </div>
            </div>
          ) : (
            // DASHBOARD CARDS
            <>
                <h3 className="font-bold text-gray-800 mb-4">Product Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
                    {services.map((service) => (
                    <div key={service.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-transparent hover:border-gray-200">
                        <div className="flex items-start gap-3">
                           <div className={`p-2.5 rounded-full text-white ${service.color}`}>{service.icon}</div>
                           <div>
                              <h4 className="font-bold text-gray-800 text-sm">{service.title}</h4>
                              <p className="text-red-500 font-bold text-xs">{service.price} Points</p>
                           </div>
                        </div>
                        <div className="flex justify-end mt-5">
                           <button onClick={() => setSelectedService(service)} className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-6 py-1 rounded text-xs transition">Enter</button>
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