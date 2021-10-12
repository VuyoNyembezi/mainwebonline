import React,{useEffect,useState} from 'react';
import {NavLink,Link} from 'react-router-dom';
import { Navbar,Nav,Form,FormControl ,Table,Button,Modal,Container} from 'react-bootstrap';
import { logout} from '../Administration/Auth';
import axios from 'axios'
import {FcLeave,FcHome,FcAddressBook} from "react-icons/fc"

function AllEmployees (props){
const [Employees,setEmployees] = useState([]);
const requestOptions ={
  method:'Get',
  headers:{'Authorization': `Bearer ${localStorage.getItem('mytoken')}`
    ,'Content-Type': 'application/json'},
}
useEffect(() => {
  const fetchData = async () =>{
      const EmployeeDataResp = await fetch('https://localhost:44323/api/Employee',requestOptions);
      const Employees = await (EmployeeDataResp.json());
      setEmployees(Employees)
  };
  fetchData();
}, [])

const [searchValue,setSearchvalue] = useState({
  employeeId:''
})
const handleChange =(event) =>{
setSearchvalue({
  ...searchValue,
  [event.target.name] : event.target.value,
})
}
function onsubmit (event) {
event.preventDefault();
axios.get(`https://localhost:44323/api/Employee/${searchValue.employeeId}`,requestOptions)
.then(response =>{

if (!response.data.length)
{
  alert('no record found')
}
else
setEmployees(response.data)
})
}

const [auth,setAuth]= useState('');
function logout()  {
    setAuth({auth:''})
    localStorage.clear()
    }
return(
    <>
<Navbar bg="light" variant="light">
<Link onClick={() => logout()} to="/" >
        <Button variant="danger" >
           Log Out 
         </Button>
         </Link>
         <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as:<FcAddressBook/> {localStorage.getItem('user')}
      </Navbar.Text>
    </Navbar.Collapse>
        </Navbar> 
        <br/>
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#"><FcHome/></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                  <Nav.Link > <NavLink  to = "/Home"> Home </NavLink></Nav.Link>
                  <Nav.Link><NavLink className = "d-inline p-2 bg-dark text-white" to = "/Terminate"><FcLeave/> Terminated Employees</NavLink> </Nav.Link>   
                </Nav>
                <Form className="d-flex" onSubmit={onsubmit}>
                  <FormControl  type="text"  placeholder="Search" className="me-2" onChange={handleChange} name="employeeId" value={searchValue.employeeId}  required aria-label="Search"/>
                  <Button variant="outline-success" type='submit' >Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
<div>
<Table  striped bordered hover>
            <thead>
            <tr> 
            <th scope="col"> Employee ID </th> 
            <th scope="col"> First Name </th> 
            <th scope="col"> Surname </th> 
            <th scope="col"> Date Of Birth </th> 
            <th scope="col"> Gender </th>
            <th scope="col">Nationality </th>
            </tr>    
            </thead> 
            <tbody>{
                Employees.map((Employees, Index)=>{
                    return<tr key={Index}>               
                        <td>{Employees.employeeId}</td>
                        <td>{Employees.firstName}</td>
                        <td>{Employees.surname}</td>
                        <td>{Employees.dateOfBirth}</td>
                        <td>{Employees.genderType}</td>
                        <td>{Employees.nationalityGroup}</td>
                    </tr>
                })
            } 
            </tbody>
            </Table>
</div>
    </>
)
}
export default AllEmployees;