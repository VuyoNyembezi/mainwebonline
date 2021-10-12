import React,{useState} from 'react';
import './App.css';
import { Card,CardBody,CardGroup,Col,Container,Form,Input,InputGroup,Row } from 'reactstrap';
import { Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FcOk,FcCancel, FcPrivacy, FcAddressBook, FcPlus} from "react-icons/fc"
function AdminReset (props){

const [AdminResetValue,setAdminReset] =useState({
    email:'',
    password:'',
    role:1
})

const handleChange =(event) => {
  setAdminReset({
      ...AdminResetValue,
      [event.target.name] : event.target.value,
  })  
};
function handleSubmit(event){
event.preventDefault();

fetch('https://localhost:44323/api/Login/Reset',{
        method:'put',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('myadmintoken')}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email:AdminResetValue.email,
            password: AdminResetValue.password
        })
    }).then((Response)=> Response.json())
    .then((result)=>{
    
        if (result.returnId === 1)
        {
          return  alert(`Password reset successfully${<FcOk/>}`);
        }
        else if (result.returnId ===0){
        alert(`email not found, please check input ${<FcCancel/>}`)
         }       
    })
}
const [adm,setadm]= useState('');
function logout()  {
    setadm({adm:''})
    localStorage.clear()
    }
return(
    <div className="app flex-row-align-items-center">
    <>
    <Navbar bg="dark" variant="light">
    <Link onClick= {() => logout()} to="/">
    <Button variant="danger"   >
    Log Out  
     </Button>
     </Link>
     <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a>{localStorage.getItem('admin')}</a>
      </Navbar.Text>
    </Navbar.Collapse>
     
    </Navbar> 
    </>
    <div>
        <h2>Reset Client/Admin Password </h2>
    </div>
        <Container>
            <Row className="justify-content-center">
                <Col md="9" lg="7" x1="6">
                    <CardGroup>
                        <Card className="p-2">
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <div className="row mb-2 pageheading">
                                        <div className="col-sm-12 ">
                                        Reset Password
                                        </div>
                                    </div>
                                    <InputGroup className="mb-3">
                                    <FcAddressBook/><Input type="email" onChange={handleChange} placeholder="Enter Email" name="email" value={AdminResetValue.email} required/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                    <FcPrivacy/> <Input type="password" onChange={handleChange} placeholder="Enter Password" name="password" value={AdminResetValue.password} required/>
                                    </InputGroup>
                                    <Button type="submit" color="success" variant="success" size="lg">Reset <FcPlus/></Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    </div>



)





}
export default AdminReset;