import React,{useState} from 'react';

import { Card,CardBody,CardGroup,Col,Container,Form,Input,InputGroup,Row } from 'reactstrap'
import {Navbar, Nav, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FcCancel,FcHighPriority } from 'react-icons/fc';

function Login(props) {
const [LoginFormValue, setLoginFormValue] = useState({
    email:"",
    password:""
})

const handleChange = (event) => {
 const {name, value} = event.target;

 setLoginFormValue((prevState) => ({
         ...prevState,
         [name] : value
 }))
};

const {email,password} = LoginFormValue;

function handleSubmit(event, d) {
    event.preventDefault();
 
    fetch('https://localhost:44323/api/login/Login',{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            Email: LoginFormValue.email,
            Password: LoginFormValue.password
        })
    }).then((Response)=> Response.json())
    .then((result)=>{
        
        if (result.status === 'Invalid')
        alert(`please check your details  `);
        else if(result.role ===2){
            localStorage.setItem('auth', d)
            localStorage.setItem('mytoken', result.token)
            localStorage.setItem('user',LoginFormValue.email)
            props.history.push('/Home')
        }
       else if(result.role ===1){
         localStorage.setItem('adm',d)
       props.history.push('/Register') 
       localStorage.setItem('myadmintoken', result.token) 
       localStorage.setItem('admin',LoginFormValue.email)
       }
       else if (result.role===3)
       alert(`Account Disabled ,please contact system admin `)
    })
}

return (
<div className="app flex-row align-items-center">
<>
<Navbar bg="light" variant="light">
    <Nav className= "me-auto">
    <Nav.Link>  Please Log in First</Nav.Link>
    </Nav>
</Navbar>
</>
<Container>
    <Row className= "justify-content-center">
        <Col md="9" lg="7" x1="6">
            <CardGroup>
                <CardBody>
                <Form onSubmit={handleSubmit}>
                <div className="row mb-2 pageheading">
                    <div className="col-sm-12 ">
                      <h3> <b>    Login </b></h3>
                    </div>
                </div>
                <InputGroup className="mb-3">
                <Input type="email" onChange={handleChange} name="email" value={email} placeholder="Enter Email"   required />
                </InputGroup>
                <InputGroup className="mb-4">
                <Input type="password" onChange={handleChange}  name="password" value={password} placeholder="Enter Password" required /> 
                </InputGroup>
                <Button type="submit" color="success">Login</Button>
                </Form>
                <p  className="text-right  text-wrap"><Link  to="/Forgot" >forgot password</Link></p>
                     
                </CardBody>
            </CardGroup>
        </Col>
    </Row>
</Container>
</div>
);
}
export default Login;
