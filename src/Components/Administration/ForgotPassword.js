import React,{useState} from 'react';
import { Card,CardBody,Col,Container,Input,InputGroup,Row } from 'reactstrap';
import { Button,Navbar ,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FcCancel,FcApproval} from "react-icons/fc"

function ChangePassword (props){

const [theStateValue,setStateValue] = useState({
    email:'',
    password:'',
    resetPasswordKey: '',

})
const handleChange = (event) => {
    setStateValue({
        ...theStateValue,
        [event.target.name] : event.target.value,
    })
};
function generate_Key(event){
    event.preventDefault();
    debugger;
    fetch('https://localhost:44323/api/Login/UserResetPass',{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: theStateValue.email
        })
    }).then((result) => result.json())
    .then((result) =>{
       
        if (result.status === "Success")
        alert("reset key sent please check your email ")
        else if(result.status ==="Failed")
        alert(" this email is not registered")
    })
};

function changePasswordHandle(event) {
    event.preventDefault()
    debugger;
    fetch('https://localhost:44323/api/Login/Forgottenpassword',{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
            password:theStateValue.password,
            email: theStateValue.email,
            resetPasswordkey:theStateValue.resetPasswordKey,
        })      
    }).then((Response) => Response.json())
    .then((Result)=>{
        
        if (Result.status ==="Failed")
       alert(`expired or incorrect reset Key` )
        else if(Result.status ===  "Success" )
         alert(`Password Changed successfully $}`)
    })
}
return(
    <div className="app flex-row align-items-center">
    <>
    <Navbar bg="dark" variant="light">
    <Link to="/">
    <Button variant="success"   >
       Login  
     </Button>
     </Link>
     
    </Navbar> 
   
    </>
    <Container>
        <Row className= "justify-content-center">
            <Col md="9" lg="7" x1="6">
            <Card className="mb-2"> <div className="col-sm-12">
                                forgotten your password?
                            </div>
                <CardBody className="p-4">
                
                     <Form onSubmit={generate_Key}>
                          <InputGroup className="mb-3" >
                            <Input type="email" onChange={handleChange} value={theStateValue.email} name="email" placeholder="Enter  Email" required />

                        </InputGroup>
                        
                        <Button type="submit" variant="warning"  >Get Key</Button><hr />
                     </Form>
                  
                       
                    <Form onSubmit={changePasswordHandle} >
                     
                        <InputGroup className="mb-3">
                            <Input type="text" onChange={handleChange} name="resetPasswordKey" value={theStateValue.resetPasswordKey} placeholder="Enter  Reset Key"  required />
                        </InputGroup>
                        <InputGroup className="mb-3">

                            <Input type='password'
                            onChange={handleChange} 
                            name="password"
                            placeholder="New  Password"  
                            value={theStateValue.password}
                            required />
                          
                        </InputGroup>

                       
                        <Button type="submit" variant="success" >Reset Password</Button>
                    </Form>
                </CardBody>
            </Card>
            </Col>
        </Row>
    </Container>
        
    </div>

)
}
export default ChangePassword;
