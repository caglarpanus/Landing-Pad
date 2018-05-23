
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Title from './../../components/title/Title';
import Background from './../../components/background/Background';
import Footer from './../../components/footer/Footer';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label, Input } from 'reactstrap';

import './LoginPage.css';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            t1: false,
            modal1: false,
            modal2: false,
            username: '',
            password: '',
            message: ''
    };
    
    this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            t1: !this.state.t1
        });
    }
    
    closeModal(tabId) {
        this.setState({
            [tabId]: false
        });
    }
    showModal(modal) {
        this.setState({
            [modal]: true
        });
        console.log(this.state);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
    onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/auth/login', { username, password })
        .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/homepage')
        })
        .catch((error) => {
        if(error.response.status === 401) {
            this.setState({ message: 'Login failed. Username or password not match' });
        }
        });
        console.log(localStorage.getItem('jwtToken'))
    }

    // authStorage = () => {
    //     console.log(localStorage.getItem('jwtToken'))
    // }

    render(){

        const { username, password, message } = this.state;

        const imgStyle = {width:'350px', marginLeft:'auto', marginRight:'auto', marginTop:'50px', boxShadow:'none'}

        const bottomButton = {backgroundColor:'#3D3D9D', color:'white',width:'100%',border:'none',height:'60px',fontWeight:'bold'}
        const bottomButtonOrange = {backgroundColor:'#FF9900', color:'white',width:'100%',border:'none',height:'60px',fontWeight:'bold'}
        const title = {color:'#3D3D9D',fontSize:'40px',textAlign:'center',width:'100%',fontWeight:'600'}
        return(
            <div className="container" id="full-body">
                <Background backgroundImage="">
                    <div style={title}>LANDING PAD</div>
                    <p className="title-description">A parking rental app</p>
                    <img src='https://i.imgur.com/HKH2zed.gif' style={imgStyle} />
                    <div className=" fixed-bottom" id="sign-in">
                        <button color="primary" style={bottomButton} onClick={this.showModal.bind(this, "modal1")}>SIGN IN</button>
                        <Modal isOpen={this.state.modal1} toggle={this.closeModal.bind(this, "modal1")} className={this.props.className} id="enter-modal">
                        <ModalHeader toggle={this.closeModal.bind(this, "modal1")} className="mod-title">Sign In</ModalHeader>
                            <ModalBody className="mod-body">
                                <FormGroup row>
                                    <Label for="exampleUsername" sm={2}>Username</Label>
                                    <Col sm={10}>
                                        <Input 
                                        type="username" 
                                        name="username" 
                                        id="username" 
                                        placeholder="username"
                                        value={username} 
                                        onChange={this.onChange} required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input 
                                        type="password" 
                                        name="password" 
                                        id="examplePassword" 
                                        placeholder="password"
                                        value={password} 
                                        onChange={this.onChange} required/>
                                    </Col>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter className="mod-foot">
                                <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                                    {message !== '' &&
                                        <div className="alert alert-warning alert-dismissible" role="alert">
                                        { message }
                                        </div>
                                    }
                            </ModalFooter>
                        </Modal>
                        {/* <button onClick={() => this.authStorage()}>
                                    AUTH
                        </button> */}
                    </div>
                    <div className="fixed-bottom" id="sign-up">
                        <Link to="/signup"><button outline color="primary" style={bottomButtonOrange} onClick={this.showModal.bind(this, "modal2")}>SIGN UP</button></Link>
                    </div>

                    
                </Background>
            </div>
        )
    }
}

export default Login;

const oStyle = `<div className="container" id="full-body">
<Background backgroundImage="https://image.freepik.com/free-vector/city-background-design_1300-365.jpg">
    <Title/>
    <p className="title-description">A parking rental app</p>
    <div className=" fixed-bottom" id="sign-in">
        <Button outline color="primary" className="simple-btn" onClick={this.showModal.bind(this, "modal1")}>Sign In</Button>
        <Modal isOpen={this.state.modal1} toggle={this.closeModal.bind(this, "modal1")} className={this.props.className} id="enter-modal">
        <ModalHeader toggle={this.closeModal.bind(this, "modal1")} className="mod-title">Sign In</ModalHeader>
            <ModalBody className="mod-body">
                <FormGroup row>
                    <Label for="exampleUsername" sm={2}>Username</Label>
                    <Col sm={10}>
                        <Input 
                        type="username" 
                        name="username" 
                        id="username" 
                        placeholder="username"
                        value={username} 
                        onChange={this.onChange} required/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}>Password</Label>
                    <Col sm={10}>
                        <Input 
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="password"
                        value={password} 
                        onChange={this.onChange} required/>
                    </Col>
                </FormGroup>
            </ModalBody>
            <ModalFooter className="mod-foot">
                <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                    {message !== '' &&
                        <div className="alert alert-warning alert-dismissible" role="alert">
                        { message }
                        </div>
                    }
            </ModalFooter>
        </Modal>
        {/* <button onClick={() => this.authStorage()}>
                    AUTH
        </button> */}
    </div>
    <div className=" fixed-bottom" id="sign-up">
        <Link to="/signup"><Button outline color="primary" className="simple-btn" onClick={this.showModal.bind(this, "modal2")}>Sign Up</Button></Link>
    </div>

    <Footer/>
</Background>
</div>`