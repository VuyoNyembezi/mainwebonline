import React,{useState,useEffect}  from 'react';
import { NavLink,Link } from 'react-router-dom';
import { Navbar,Nav,Col,Form,FormControl,Table,Button,Modal,Row,Container } from 'react-bootstrap';
import { logout} from '../Administration/Auth';
import axios from 'axios'
import {FcAddressBook,FcApproval} from "react-icons/fc"
function UpdateEmployee (props){

const [Employees,setEmployee]= useState([])
const [FormValue,setFormValue]= useState({
    employeeId:'',
    firstName:'',
    surname:'',
})
const [searchValue,setSearchvalue] = useState({
  employeeId:''
})
const requestOptions ={
  method:'Get',
  headers:{'Authorization': `Bearer ${localStorage.getItem('mytoken')}`
    ,'Content-Type': 'application/json'},
}
const handleChange =(event) =>{
setSearchvalue({
  ...searchValue,
  [event.target.name] : event.target.value,
})


setFormValue({
  ...FormValue,
  [event.target.name]: event.target.value,
})
}
function onsubmit (event) {
event.preventDefault();
axios.get(`https://localhost:44323/api/Employee/${searchValue.employeeId}`,requestOptions)
.then(response =>{
console.log(response.data)
if (!response.data.length)
{
  alert('no record found')
}
else
setEmployee(response.data)
})
}

useEffect(() => {
  const fetchData = async () =>{
      const EmployeeResp = await fetch('https://localhost:44323/api/Employee/',requestOptions);
const Employees = await (EmployeeResp.json());
setEmployee(Employees);
console.log(Employees)
  };
fetchData();
}, [])





function selectEmp (Employees){
    setFormValue({
        employeeId: Employees.employeeId,
        firstName: Employees.firstName,
        surname: Employees.surname
    })
}
const [auth,setAuth]= useState('');
function logout()  {
    setAuth({auth:''})
    localStorage.clear()
    }
    


function handleSubmit(event){
    event.preventDefault();
    debugger;
    fetch(`https://localhost:44323/api/Employee/UpdateEmployee`,{
       method:'PUT',
       headers:{
        'Authorization': `Bearer ${localStorage.getItem('mytoken')}`,
           'Accept':'application/json',
           'Content-Type':'application/json'
       },
       body:JSON.stringify({
           employeeId: FormValue.employeeId,
           firstName: FormValue.firstName,
           surname: FormValue.surname
       })
   })
   .then(Response => {
     console.log(Response)
  if (Response.status === 200 ||201)
  {
       alert(`Employee successfully Updated ${<FcApproval/>}`);
  }
  else if (Response.status !== 200 )
  {
      alert("Employee Update Process Failed please try again or check input "); 
  }
     })
     .catch(error =>{
        alert("Employee update process failed")
    })
}

return (
<>
<Navbar bg="light" variant="light">
               <Link onClick={() => logout()} to="/" >
        <Button variant="danger"  >
            Log Out 
         </Button>
         </Link>
         <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as:<FcAddressBook/> <a >{localStorage.getItem('user')}</a>
      </Navbar.Text>
    </Navbar.Collapse>
        </Navbar> 
        <br/>
        <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#">Icon</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                <Nav.Link><NavLink  to = "/Home"> Home</NavLink> </Nav.Link> 
                  <Nav.Link > <NavLink  to = "/AddEmployee"> Add Employee </NavLink></Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={onsubmit}>
                  <FormControl  type="text"  placeholder="Search" onChange={handleChange} className="me-2" name="employeeId" value={searchValue.employeeId}  required aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
               <br/>
               <div>
               <h3>Update Employee Details </h3>
               </div><br />
               <br />               <div>
               <Form onSubmit={handleSubmit}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Employee ID</Form.Label>
      <Form.Control type="text" placeholder="Display Employee ID " name="employeeId" onChange={handleChange} value={FormValue.employeeId} required readOnly/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text"  placeholder="Enter new First Name" name="firstName" onChange={handleChange} value={FormValue.firstName} required/>
    </Form.Group>


    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Surname</Form.Label>
      <Form.Control type="text" placeholder="Enter new surname" name="surname"  onChange={handleChange} value={FormValue.surname} required />
    </Form.Group>

    

  </Row>
  <div className="justify-content-center"> 
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Label>All information correct?  check me</Form.Label>
    <Form.Check type="checkbox" required />
  </Form.Group>
  </div>
 
  <Button variant="success" type="submit">
    Update Details
  </Button>
               </Form>
               <br/>
               </div>
               <div>
                <Table striped bordered hover variant = "light" >
           <thead >
                <tr>
                <th scope="col"> EmployeeID </th> 
                <th scope="col"> FirstName </th> 
                <th scope="col"> Surname </th> 
                <th scope="col"> DateOfBirth </th> 
                <th scope="col"> Gender </th> 
                <th scope="col"> Nationality </th>
                </tr> 
           </thead> 
           <tbody>{
            Employees.map((Employees, Index)=>{
                   return<tr key={Index}>
                       <th scope="row">{Employees.employeeId}</th>
                       <td>{Employees.firstName}</td>
                       <td>{Employees.surname}</td>
                       <td>{Employees.dateOfBirth}</td>
                       <td>{Employees.genderType}</td>
                       <td>{Employees.nationalityGroup}</td>
                     <td><button onClick={() => selectEmp(Employees)}>SELECT</button></td>
                   </tr>
               })
           } 
           </tbody>
           </Table>
           </div>
</>
);
}
export default UpdateEmployee;






