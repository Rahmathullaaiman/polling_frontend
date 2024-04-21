import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './components/Auth';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import Options from './components/Options';
import Addproperty from './components/Addproperty';
import Userdashboard from './pages/Userdashboard';
import PropertyDetail from './components/PropertyDetails';
import Rents from './pages/Rents';
import Addrentproperty from './components/Addrentproperty';
import Rentpropertydetails from './components/Rentpropertydetails';
import Updateproperty from './components/Updateproperty';
import Updaterentproperty from './components/Updaterentproperty';
import History from './pages/History';
import Payment from './components/Payment';
import Propertydetailspage from './components/PropertyDetails';
import Rentpayment from './components/Rentpayment';
import Renthistory from './pages/Renthistory';
import Admin from './components/Admin';
import Userlist from './components/Userlist';
import Newuserdashboard from './pages/Newuserdashboard';
import Adduserproperty from './components/Adduserproperty';
import Propertyrequests from './components/Propertyrequests';
import Adduserrentproperty from './components/Adduserrentproperty';
import Rentrequest from './components/Rentrequest';
import Property from './components/Property';
import Servicerp from './components/Servicerp';
import Chat from './components/Chat';
import Requs from './components/Requs';
import Chatworker from './components/Chatworker';

function App() {
  return (
    <div className='app'>
     
      <Routes>
      <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/rents" element={<Rents/>}/>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/users" element={<Userlist/>}/>
        <Route path="/adminn" element={<Admin  Register />}/>
        <Route path="/admins" element={<Admin  />}/>
        <Route path="/request" element={<Propertyrequests />}/>
        <Route path="/rentrequest" element={<Rentrequest />}/>
        <Route path="/propertydetails" element={<Propertydetailspage/>} />
        <Route path="/history" element={<History />} />
        <Route path="/renthistory" element={<Renthistory />} />
        <Route path = '/payment/:id' element={<Payment/>}/>
        <Route path = '/payments/:id' element={<Rentpayment/>}/>
        <Route path="/updatetheproperty" element={<Updateproperty/>} />
        <Route path="/updaterentproperty" element={<Updaterentproperty/>} />
        <Route path="/rentpropertydetails" element={<Rentpropertydetails/>} />
        <Route path="/options" element={<Options/>}/>
        <Route path="/addproperty" element={<Addproperty/>}/>
        <Route path="/addrentproperty" element={<Addrentproperty/>}/>
        <Route path="/adduserproperty" element={<Adduserproperty/>}/>
        <Route path="/adduserrentproperty" element={<Adduserrentproperty/>}/>
        <Route path="/dashboard" element={<Userdashboard/>}/>
        <Route path="/newdashboard" element={<Newuserdashboard/>}/>
        <Route path="/Reu" element={<Property/>}/>
        <Route path="/ser" element={<Servicerp/>}/>
        <Route path="/chat/:workerId/:bookingWorkerName" element={<Chat />} />

        <Route path="/chatss/:userId/:bookingusername" element={<Chatworker/>} />

        <Route path="/requ" element={<Requs/>}/>








        <Route path="/Register" element={<Auth Register/>}/>
      </Routes>
      <Footer/>
    
    </div>
  );
}

export default App;
