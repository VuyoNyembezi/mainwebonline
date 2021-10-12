
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Navbar,Col,Form,FormControl,Table,Button,Nav } from 'react-bootstrap';
import { Card,CardBody,Container,Input,InputGroup,Row} from 'reactstrap';
import {logout} from './Auth'
import './App.css'

import {FcInfo,FcCancel, FcSearch} from 'react-icons/fc'



function RemoveUser (props) {
    const [RemoveValue,setRemove] = useState({
        employID:'',
        role:0,
        adminName:'',
        email:'',
        id:0
    })
    const [RolesData,setRolesData] = useState( [] );
    const [users,setUsers] = useState([]);
    const requestOptions ={
        method:'Get',
        headers:{'Authorization': `Bearer ${localStorage.getItem('myadmintoken')}`
          ,'Content-Type': 'application/json'},
      }
    useEffect(() => {
        const fetchData = async () =>{
            const roleResponse = await fetch('https://localhost:44323/api/login/Roles');
        const usersResponse = await fetch('https://localhost:44323/api/Login/Users',requestOptions);
        
        const RolesData = await (roleResponse.json() );
        const users = await (usersResponse.json());

setRolesData(RolesData);
        setUsers(users)

        };
        fetchData();
    }, [ ])

    const [searchValue,setSearchvalue] = useState({
        employeeId:''
      })
      const handleChange =(event) =>{
      setSearchvalue({
        ...searchValue,
        [event.target.name] : event.target.value,
      })
      setRemove({
          ...RemoveValue,
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
      setUsers(response.data)
      })
      }

function selectEmp (users){
    setRemove({id: users.id,
        adminName: users.adminName ,
        email: users.email})
}

function handleSubmit(event) {
    event.preventDefault();
    debugger;
    fetch(`https://localhost:44323/api/Login/ChangeRole`,{
        method:'PUT',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('myadmintoken')}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id: RemoveValue.id,
            fkRoleId: RemoveValue.role
        })
    })
    .then(Response => { 
   if (Response.status === 200)
   {
     return   alert(`User Role successfully Changed ${<FcInfo/>}`);
   }
   else
   return alert(`User Role Update Failed ${<FcCancel/>}`);
      })
      .catch(error =>{
       
         alert("Employee update process failed")
     })
}
const [adm,setadm]= useState('');
function logout()  {
    setadm({adm:''})
    localStorage.clear()
    }

return(
    <>
<div className="grid-child purple">
<Navbar bg="light" variant="light">
    <Link onClick= {() => logout()} to="/" >
        <Button variant="danger">
            Log Out
        </Button>
    </Link>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a> {localStorage.getItem('admin')}</a>
      </Navbar.Text>
    </Navbar.Collapse>
</Navbar>
<Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                </Nav>
                <Form className="d-flex" onSubmit={onsubmit}>
                  <FormControl  type="text"  placeholder="Search" className="me-2" onChange={handleChange} name="employeeId" value={searchValue.employeeId}  required aria-label="Search"
                  />
                  <Button variant="outline-success" type='submit' >Search </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
<h4><b>System Users</b></h4>
<Table  striped bordered hover>
            <thead>
            <tr> 
            <th scope="col"> Name </th> 
            <th scope="col"> email </th> 
            <th scope="col"> Department </th> 
            <th scope="col"> Branch </th> 
            <th scope="col"> System Role </th>
            <th scope="col">Click !!</th>
            </tr>    
            </thead> 
            <tbody>{
                users.map((users, Index)=>{
                    return<tr key={Index}>               
                        <td>{users.adminName}</td>
                        <td>{users.email}</td>
                        <td>{users.departmentName}</td>
                        <td>{users.cityName}</td>
                        <td>{users.roleName}</td>
                        <td><button onClick={() => selectEmp(users)}>SELECT</button></td>
                    </tr>
                })
            } 
            </tbody>
            </Table>
</div>
<div className="grid-child green">
<Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="8" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={handleSubmit} >
                            <div className="row mb-2 pageheading">
                                <div className="col-sm-12">
                                    Selected User
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={handleChange} name="adminName" value={RemoveValue.adminName} placeholder="Display User Name" required  readOnly/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Input type="email" onChange={handleChange} name="email" value={RemoveValue.email} placeholder="Show Email " required readOnly/>
                            </InputGroup>
                            <div className="form-group dropdown">
                                <select className="form-control" name="role"  onChange={handleChange}value={RolesData.roleId} required>
                                    <option value="">Select Role</option>
                                    {RolesData.map((e, key) =>{
                                        return <option key={key} value={e.roleId}>{e.roleName}</option>
                                    })}
                                </select>
                            </div>
                            <Button type="submit" variant="success" >Change Role</Button>                        
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
</div>
</>
);
}
export default RemoveUser;