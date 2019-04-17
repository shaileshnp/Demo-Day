import React from "react";
import Modal from './../Modal';

import { Row, Col, Button, FormGroup, FormControl, ControlLabel,InputGroup } from "react-bootstrap";

import { connect } from 'react-redux';
import icon_back from "./../../../../public/img/icon_back.svg";

import * as actionCreator from './../../../store/actions/cc_action';
import CCManager from './../../../lib/cometchat/ccManager';

import './style.sass';

class LoginModal extends React.PureComponent {

    constructor(props) {
        super(props);    
        
        this.state = {
            email: ""
        };
    }

    validateForm() {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // var re = /\S+@\S+\.\S+/;
        // console.log( this.state.email.length > 0 && re.test(this.state.email)); 
        
        return this.state.email.length > 0 && re.test(this.state.email);
      }
    
    componentDidMount(){   }


    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleLoginSubmit(){

        let name = this.state.email.split('@')[0];
        let uid = this.state.email.replace('/\./g','_');
        uid = uid.replace('@','_');
        // let uid = "superhero1";
        console.log(uid);
        //   Check for user available

        fetch('https://api.cometchat-dev.com/v1/users/'+uid,{
            method: 'GET',
            headers: { appid: CCManager.appId, apikey: CCManager.apiKey }
        })
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Create user here' );
              return;
            }else{
                console.log("do k=login");
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      }

    render(){

        return ( 
            <Modal >
                <div className="groupCreateModal border-radius-top h-100pr">
                    <div class="createGroupModalContent">

                        <Row className="loginFormContainer">
                            <Row>
                                <Col lg={12}><FormGroup controlId="email" >

                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        autoFocus
                                        className = "border-radius-full box-shadow border color-border font-size-20 H-64"
                                        type="email"
                                        placeholder="abc@xyz.com"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        
                                    />
                                    
                                    </FormGroup>
                                </Col>

                        
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <Button onClick={this.props.close} variant="primary" size="lg" className="createGroupButtonCancel">
                                        Cancel
                                    </Button>
                                

                                </Col>
                                <Col lg={6}>
                                    <Button 
                                      
                                        onClick={this.handleLoginSubmit.bind(this)}
                                        variant="primary" 
                                        size="lg" 
                                        disabled={!this.validateForm()}
                                        className="createGroupButton">
                                       Enter
                                    </Button>
                                </Col>
                                
                            </Row>

                        </Row>

                    </div>
            
                  
              </div>     
               
                             
            </Modal>
       );       
    }     

}

const mapStateToProps = (store) =>{
    return {
        
        
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {


    };
  };
  
  export default connect( mapStateToProps, mapDispachToProps )(LoginModal);
  
  



