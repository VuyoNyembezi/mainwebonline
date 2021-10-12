import React,{useState,useEffect} from 'react';
import {Button,Navbar,Nav,Form,FormControl,Container,Table} from 'react-bootstrap';
import {NavLink,Link} from 'react-router-dom';
import axios from 'axios';

function Homepage(props){

    const [searchValue,setSearchvalue] = useState({
        employeeId:''
    })
const [Employees,setEmployees] = useState([]);

useEffect(() => {
    const fetchData = async () =>{
        const EmployeessResp = await fetch(`https://localhost:44323/api/Employee/`)
      const  Employees = await (EmployeessResp.json());
        setEmployees(Employees)
    }
    fetchData();
}, [])

const handleChange =(event) =>{
    setSearchvalue({
        ...searchValue,
        [event.target.name] : event.target.value,
    })
}

function onsubmit (event) {
  event.preventDefault();
  axios.get(`https://localhost:44323/api/Employee/${searchValue.employeeId}`)
  .then(response =>{
    console.log(response.data)
    setEmployees(response.data)
  })
}

const logout = () => {
    this.setAuth({auth:''})
    localStorage.clear()
    }
return(
<>
<div>
<Navbar bg="light" variant="light">
<Link onClick={() => logout()} to="/" >
        <Button variant="danger" >
           Log Out 
         </Button>
         </Link>
         <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
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
                  <Nav.Link > <NavLink  to = "/AddEmployee"> Add Employee </NavLink></Nav.Link>
                  <Nav.Link><NavLink  to = "/UpdateEmployee"> Update Details</NavLink> </Nav.Link> 
                  <Nav.Link > <NavLink  to = "/Terminate"> Terminate Employee </NavLink></Nav.Link>
                  <Nav.Link><NavLink  to = "/Employees"> Employees History</NavLink> </Nav.Link>  
                     
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
                   </tr>
               })
           } 
           </tbody>
           </Table>
</div>
</div>
</>
)
}
export default Homepage;