import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {NavLink,Link} from 'react-router-dom';
import { Navbar,Nav,Col, Form, FormControl,Modal,Row,Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { logout} from '../Administration/Auth';
import {InputGroup,Input} from 'reactstrap'
import {FcOk,FcHighPriority,FcHome,FcSearch,FcAddressBook} from "react-icons/fc";
import { IconName } from "react-icons/md";
function TerminateEmployee (props){
const [EmployeeValue,setEmployeeValue] = useState({
    employeeId:0,
    firstName:'',
    
})
const [searchValue,setSearchvalue] = useState({
  employeeId:''
})
const [EmployeeData,setEmployeeData] = useState([]);
const requestOptions ={
  method:'Get',
  headers:{'Authorization': `Bearer ${localStorage.getItem('mytoken')}`
    ,'Content-Type': 'application/json'},
}
useEffect(() => {
  const fetchData = async () =>{
      const EmployeeDataResponse = await  fetch(`https://localhost:44323/api/Employee/`,requestOptions);
      const EmployeeData = await (EmployeeDataResponse.json());

      setEmployeeData(EmployeeData);
      
  };
  fetchData();
}, [])

const handleChange =(event) =>{
    setEmployeeValue({
        ...EmployeeValue,
        [event.target.name]: event.target.value,
    })
}
function selectEmp(EmployeeData){
    setEmployeeValue({employeeId:EmployeeData.employeeId,
        firstName: EmployeeData.firstName ,
        surname: EmployeeData.surname,
        dateOfBirth: EmployeeData.dateOfbirth,
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
    setSearchvalue(response.data)
  })
}


function handleSubmit(event){
    event.preventDefault();
    debugger;
    fetch(`https://localhost:44323/api/Employee/TerminateEmployee/`,{
        method:'DELETE',
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('mytoken')}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            employeeId: EmployeeValue.employeeId,
        })
    })
    .then(Response => {
    
       return   alert(`Employee successfully Terminated ${ <FcOk/>}`)
      })
    .catch(error =>{
     
        alert(`Termination Failed try again,Contact support if the issue not resolved ${<FcHighPriority/>}`)
    })
}
const [auth,setAuth]= useState('');
function logout()  {
    setAuth({auth:''})
    localStorage.clear()
    }
    

    return (
<>
<Navbar bg="dark" variant="dark">
        <Link onClick={() => logout()} to="/" >
        <Button variant="danger"   >
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
              <Navbar.Brand href="#"><FcHome/></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                  <Nav.Link > <NavLink  to = "/Home"><FcHome/> Home </NavLink></Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={onsubmit}>
                  <FormControl  type="text"  placeholder="Search" className="me-2" name="employeeId" value={searchValue.employeeId} onChange={handleChange} required aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit"><FcSearch/>Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>




               <div>
               <Form onSubmit={handleSubmit} >
           
              
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Employee ID</Form.Label>
      <Form.Control type="text" placeholder="Display Employee ID " name="employeeId" value={EmployeeValue.employeeId} required readOnly/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" name="firstname" placeholder="Enter new First Name" value={EmployeeValue.firstName}  readOnly/>
    </Form.Group>


    <Form.Group as={Col} controlId="formGridEmail" >
      <Form.Label>Surname</Form.Label>
      <Form.Control type="text" placeholder="Enter new surname" value={EmployeeValue.surname}  readOnly />
    </Form.Group>

    

  </Row>
  <div className="justify-content-center"> 
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Label>All information correct?  check me</Form.Label>
    <Form.Check type="checkbox" required />
  </Form.Group>
  </div>
 
  
                            <Button type="submit" variant="danger" >Terminate !!</Button>
                        </Form>
               </div>
                <div>
                 <Table striped bordered hover>
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
                        EmployeeData.map((EmployeeData, Index)=>{
                            return<tr key={Index}>
                                <th scope="row">{EmployeeData.employeeId}</th>                     
                                <td>{EmployeeData.firstName}</td>
                                <td>{EmployeeData.surname}</td>
                                <td>{EmployeeData.dateOfBirth}</td>
                                <td>{EmployeeData.genderType}</td>
                                <td>{EmployeeData.nationalityGroup}</td>
                            <td><button onClick={() => selectEmp(EmployeeData)}>SELECT</button></td>
                            </tr>
                        }) 
                    } 
                    </tbody>
                </Table>
            </div>
           
</>



    )


}
export default TerminateEmployee;