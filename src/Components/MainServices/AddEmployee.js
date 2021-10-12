import React,{useState,useEffect} from 'react';
import {Form,Button,Col,Nav,Navbar} from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Card,CardBody,Container,Input,InputGroup,Row,Label } from 'reactstrap';
import { logout} from '../Administration/Auth';
import {FcAddressBook,FcApproval,FcPlus} from "react-icons/fc"



function AddEmployee (props) {
    const [EmployeeValue,setEmployeeValue] = useState({
        firstname:'',
        surname:'',
        dateOfBirth:'',
        genderID:0,
        nationalityID:0,
    })
const [GenderData,setGenderData] = useState([]);
const [Nationality,setNationality] = useState([]);

useEffect(() => {
 const fetchData = async () =>{
     const GenderDataResponse = await fetch('https://localhost:44323/api/Employee/Gender')
     const NationDataResponse = await fetch('https://localhost:44323/api/Employee/Nationality')

     const GenderData = await (GenderDataResponse.json());
     const Nationality = await (NationDataResponse.json());

     setGenderData(GenderData);
     setNationality(Nationality);
 };
 fetchData();
}, [])
    const handleChange =(event) => {
        setEmployeeValue({
            ...EmployeeValue,
            [event.target.name]: event.target.value,
        })
    };

    function handleSubmit(event){
        event.preventDefault();
        debugger;
        fetch('https://localhost:44323/api/Employee/AddEmployee',{
            method:'post',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('mytoken')}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName: EmployeeValue.firstname,
                surname:EmployeeValue.surname,
                dateOfBirth: EmployeeValue.dateOfBirth,
                fkGenderId: EmployeeValue.genderID,
                fkNationId: EmployeeValue.nationalityID
            })
        }).then((Response) => Response.json())
        .then(Response =>{
   
     if(Response.returnId === 1)
     alert(`new employee record saved ${<FcApproval/>}`)
     else if(Response.returnId === -1)
     alert("saving process failed please check input")
    })
    .catch(error =>{
        
        alert("server error please contact the admin")
    })
    }
    const [auth,setAuth]= useState('');
    function logout()  {
        setAuth({auth:''})
        localStorage.clear()
        }
        

        return(
<div><div>
<Navbar bg="light" variant="light">
<Link onClick={() => logout()} to="/" >
        <Button variant="danger" >
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
                    <Navbar bg = "dark" variant = "dark" >

          <Nav className = "mr-auto" >
          <NavLink className = "d-inline p-2 bg-dark text-white" to = "/Home" >Home </NavLink> 
          <NavLink className = "d-inline p-2 bg-dark text-white"
          to = "/UpdateEmployee"> Update Employee </NavLink> 
          </Nav> 
          </Navbar> 
          <br/>
        </div>
        <div>
        <h2> ADD NEW EMPLOYEE</h2>
        </div>
        <>
        <Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="7" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={handleSubmit}>
                            
                            <InputGroup className="mb-3"> 
                            <Label>First Name : </Label>
                            <br/>
                            <InputGroup className="mb-3">
                                <Input  type = "text" placeholder = "enter first name" name= "firstname"  onChange={handleChange} value={EmployeeValue.firstname} required/>
                            </InputGroup>
                            <Label>Surname : </Label>
                            <InputGroup className="mb-3">
                                <Input  type = "text" placeholder = "enter surname" name= "surname" onChange={handleChange} value={EmployeeValue.surname} required/>
                            </InputGroup>

                            
                            <Label>Date Of Birth: </Label> <br/>
                            <InputGroup className="mb-3">
                            <TextField id="date"  type="date"  name="dateOfBirth" onChange={handleChange} value={EmployeeValue.dateOfBirth} InputLabelProps={{shrink: true,}}
                            required/>
                            </InputGroup>
                       
                            <Label>Gender : </Label>
                            </InputGroup>
                            
                            <div className="form-group dropdown">
                                <select className="form-control" name="genderID" onChange={handleChange} value={EmployeeValue.genderID} required>
                                    <option value="">Select Gender</option>
                                    {GenderData.map((e, key) =>{
                                        return <option key={key} value={e.genderId}>{e.genderType}</option>
                                    })}
                                </select>
                            </div>
                            <InputGroup className="mb-3"> 
                            <Label>Nationality : </Label>
                            </InputGroup>
                            <div className="form-group dropdown">
                                <select className="form-control" name="nationalityID" onChange={handleChange} value={EmployeeValue.nationalityID} required>
                                    <option value="">Select Nationality</option>
                                    {Nationality.map((e, key) =>{
                                        return <option key={key} value={e.nationId}>{e.nationalityGroup}</option>
                                    })}
                                </select>
                            </div>           
                            <Button type = "submit" className = "my-1"  >
                            ADD EMPLOYEE   <FcPlus/>
                            </Button> 
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
        
      
</div>

        )
}
export default AddEmployee;