import React,{useState,useEffect} from 'react';
import {Card, CardBody,Col,Container,Input,InputGroup,Nav,Row,Label} from 'reactstrap';
import {Button,Navbar,Form} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {logout} from './Auth'


import {FcOk,FcPlus,FcHighPriority} from "react-icons/fc"

function Register (props) {
    const [RegisterForm, setRegisterFormValue] = useState({
        email:"",
        password:"",
        adminName: "",
        department:0,
        city:0,
        role:0,
       
    })
    const [adm,setadm]= useState('');
const [RolesData,setRolesData] = useState( [] );
const [CityData,setCityData] = useState( [] );
const [DeptData,setDeptData] = useState( [] );
useEffect(() => {
    const fetchData = async () =>{
        if (fetchData){
              const roleResponse = await fetch('https://localhost:44323/api/login/Roles');
        const departmentResponse = await fetch('https://localhost:44323/api/login/Departments');
        const cityResponse = await fetch('https://localhost:44323/api/login/Cities');
       
        const RolesData = await (roleResponse.json() );
        const DeptData = await (departmentResponse.json());
        const CityData = await (cityResponse.json());
  
        setRolesData(RolesData);
        setDeptData(DeptData);
        setCityData(CityData);
        }
        else{
            alert('Sever is Currently down please contact Support')
        }
      
    }
   
   fetchData();
}, [ ])

const handleChange = (event) => {
    setRegisterFormValue({
        ...RegisterForm,
        [event.target.name] : event.target.value,
    })
};

function handleSubmit(event) {
event.preventDefault();
debugger;

fetch('https://localhost:44323/api/login/InsertUser',{
    method: 'post',
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('myadmintoken')}`,
        'Accept':'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        adminName: RegisterForm.adminName,
        password:RegisterForm.password,
        email: RegisterForm.email,
        cityID: RegisterForm.city,
        departmentID:RegisterForm.department,
        roleID: RegisterForm.role
    })      
}).then((Response) => Response.json())
.then((Result)=>{
    
    if (Result.returnId >=1)
    {
        alert(`user added successful ${<FcOk/>}`) 
    }
    else if(Result.returnId === -2)
    {
        alert("failed email already used")
    }
    else if(Result.returnId <1)
    alert("registration failed")       
})
}


function logout()  {
    setadm({adm:''})
    localStorage.clear()
    }


return (
<div className="app flex-row align-items-center">
<>
<Navbar bg="light" variant="light">
    <Link onClick= {() => logout()} to="/" >
        <Button variant="danger">
            Log Out
        </Button>
    </Link>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a>{localStorage.getItem('admin')}</a>
      </Navbar.Text>
    </Navbar.Collapse>
</Navbar>
<Navbar bg="dark" className="justify-content-end" variant="light">
    <Link to="/Reset">
        <Button variant= "warning">
            Reset Client Password
        </Button>
    </Link>
    <Link to="/removeUser">

        <Button variant="danger">
        <FcHighPriority/>
            Deactivate User
        </Button>
    </Link>

</Navbar>
</>
  <Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="7" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={handleSubmit}>
                            <div className="row mb-2 pageheading">
                                <div className="col-sm-12">
                                    Sign Up
                                </div>
                            </div>
                            <div className="form-group dropdown">
                                <select className="form-control" name="role"  onChange={handleChange}value={RolesData.roleId} required>
                                    <option value="">Select Role</option>
                                    {RolesData.map((e, key) =>{
                                        return <option key={key} value={e.roleId}>{e.roleName}</option>
                                    })}
                                </select>
                            </div>
                            <br/>
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={handleChange} name="adminName"  value={RegisterForm.adminName} placeholder="Enter Name" required  />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Input type="email" onChange={handleChange} name="email"  value={RegisterForm.email} placeholder="Enter  Email" required />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Input type="text" onChange={handleChange} name="password"  value={RegisterForm.password} placeholder="Enter  Password"  required />
                            </InputGroup>

                            <div className="form-group dropdown">
                                <select className="form-control" name="city" onChange={handleChange} value={CityData.cityID}  required>
                                    <option value="">Select City</option>
                                    {CityData.map((e, key) =>{
                                        return <option key={key} value={e.cityID}>{e.cityName}</option>
                                    })}
                                </select>
                            </div>
                            <br/>
                            <div className="form-group dropdown">
                                <select className="form-control" name="department" id="department" onChange={handleChange} value={DeptData.departmentID} required>
                                    <option value="">Select Department</option>
                                    {DeptData.map((e, key) =>{
                                        return <option key={key} value={e.departmentID}>{e.departmentName}</option>
                                    })}
                                </select>
                            </div>
                            <Button type="submit" color="success" >Create Admin Account <FcPlus/></Button>
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
</div>
);   
}
export default Register;





