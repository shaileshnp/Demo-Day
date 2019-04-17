
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import icon_cc from "./../../../public/img/cc-logo.svg";
import * as actionCreator from './../../store/actions/cc_action';
import {CometChat} from "@cometchat-pro/chat";
import CCManager from "./../../lib/cometchat/ccManager";
import './style.sass';

class Splash extends Component{

    componentDidMount() {
        console.log("kshitiz", this.props.isGuestUser);
        console.log("kshitiz", this.props.loginUser);
        if(this.props.isGuestUser){
            CometChat.login(this.props.loginUser,CCManager.apiKey).then(
                user=>{
                    
                    this.props.setGuestSession(user);
                    this.props.registerListener();

                    // var GUID = "techstar-demo";
                    // var password = "";
                    // var groupType = CometChat.GROUP_TYPE.PUBLIC;

                    // CometChat.joinGroup(GUID, groupType,password).then(
                    //     group => {
                    //         console.log("demo",{group});
                    //         this.props.startFetchingMessage("group","techstar-demo",100);
                    //     },
                    //     error => {
                    //         console.log("Group joining failed with exception:", error);
                    //     }
                    // );
                    
                    this.props.stopLoader();
                }               
            );
        } else {
            CometChat.logout()
            .then(
                ()=>{      
                CometChat.login(this.props.loginUser,CCManager.apiKey).then(
                user=>{
                    this.props.setGuestSession(user);
                    this.props.registerListener();

                    var GUID = "techstar-demo";
                    var password = "";
                    var groupType = CometChat.GROUP_TYPE.PUBLIC;


                    CometChat.joinGroup(GUID, groupType,password).then(
                        group => {
                            console.log("demo",{group});
                            //this.props.startFetchingMessage("group","techstar-demo",100);
                        }
                        // error => {
                        //     console.log("Group joining failed with exception:", error);
                        // }
                    );
                    
                    this.props.stopLoader();  
                })
            });
        }
    }



    render(){

        return(

        <Grid fluid={true} className="border-radius-top bg-white h-100pr">
            <Row className="ccShowGrid bg-white border-radius-top ">
                <Col lg={12} className="splashContainer">

                <div className="iconContainer">
                    <div class="icon_cc" dangerouslySetInnerHTML={{__html:icon_cc}}/>
                </div>
                
                <div class="loaderContainer">Loading <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                    <span class="loader__dot">.</span>
                </div>

                </Col>
            </Row>
        </Grid>
          
        );
    };
    
}

const mapStateToProps = (store) => {
    return {
        currentStage: store.app.splashHandler.stage,
        isSyncStarted: store.app.splashHandler.syncStarted,
        isGuestUser :  store.users.isGuestUser,
        loginUser: store.users.loginUser
        
    };
};

const mapDispachToProps = dispatch => {
    return {
        registerListener: () => actionCreator.addMessageListener(dispatch),
        setGuestSession:(user) => dispatch(actionCreator.setUserSession(user)),
        startFetchingMessage: (uType,uid,limit) => dispatch(actionCreator.getUserMessageHistory(uType,uid,limit)),
        stopLoader : ()=> dispatch(actionCreator.stopLoader())
    };
};

export default connect(mapStateToProps, mapDispachToProps)(Splash);