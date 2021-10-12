import logo from './logo.svg';
import './App.css';
import React,{useState,useMemo} from 'react'
import {BrowserRouter,Switch,Link} from 'react-router-dom'
import { Navbar,Nav } from 'react-bootstrap';

import Login from './Components/Administration/Login';
import Register from './Components/Administration/RegisterUser';
import RemoveUser from './Components/Administration/RemoveUser';
import AdminReset from './Components/Administration/ResetPassword';
import ChangePassword from './Components/Administration/ForgotPassword';

import AddEmployee from './Components/MainServices/AddEmployee';
import TerminateEmployee from './Components/MainServices/DeleteEmployee';
import AllEmployees from './Components/MainServices/Employees';
import TerminatedEmployees from './Components/MainServices/TerminatedEmployee';
import UpdateEmployee from './Components/MainServices/UpdateEmployee';
import ExposeApiTable from './Components/MainServices/Home';
import Homepage from './Components/MainServices/Home';
import Hometest from './testerfilter';


import {UserContext} from './hooks/UserContext'
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';
import AdminPrivate from './hooks/PrivateAdminRoute';


function App() {
  const [user,setUser] = useState(null);
  const value = useMemo (()=>({user,setUser}),[user,setUser]);

  return (
 
        <div className="App">
   <BrowserRouter>
<UserContext.Provider value={value}>
<Navbar bg="light" variant="light">
<Nav className="mr-auto">

</Nav>
         
        </Navbar> 
        <h2 className = "m-3 d-flex justify-content-center" >
     Employees portal 
        </h2>

<Switch>
{/* Users and Admins Routes */}
<PublicRoute restricted={true} path='/' component={Login} exact />
<PublicRoute restricted={true} path='/login' component={Login} />
<PublicRoute restricted={true} path='/Forgot' component={ChangePassword} />
<AdminPrivate path='/Reset' component={AdminReset} />
<AdminPrivate path='/register' component={Register} />
<AdminPrivate path='/removeUser' component={RemoveUser} />
{/* <AdminPrivate path='Reset' component={AdminReset}/> */}

{/* Main System Routes */}


<PrivateRoute path='/Home' component={Homepage} exact/>
<PrivateRoute path='/AddEmployee' component={AddEmployee} />
<PrivateRoute path='/DeleteEmployee' component={TerminateEmployee} />
<PrivateRoute path='/Employees' component={AllEmployees} />
<PrivateRoute path='/Terminate' component={TerminatedEmployees } />
<PrivateRoute path='/UpdateEmployee' component={UpdateEmployee} />

</Switch>







</UserContext.Provider>




   </BrowserRouter>
    </div>
  
  
  );
}

export default App;
