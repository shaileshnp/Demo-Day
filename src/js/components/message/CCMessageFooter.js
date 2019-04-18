import React, { Component } from "react";
import { Row, Col, Button, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import {CometChat} from "@cometchat-pro/chat";
import LoginModal from './../modal/login/LoginModal';
import * as utils from './../../lib/uiComponentLib';

import * as actionCreator from "./../../store/actions/cc_action";

import icon_attach from "./../../../public/img/icon_attach.svg";
import icon_send from "./../../../public/img/icon_send.svg";
import icon_attach_gallery from "./../../../public/img/icon_attach_gallery.svg";
import icon_attach_location from "./../../../public/img/icon_attach_location.svg";
import icon_attach_mic from "./../../../public/img/icon_attach_mic.svg";
import icon_attach_cam from "./../../../public/img/icon_attach_cam.svg";
import icon_attach_video from "./../../../public/img/icon_attach_video.svg";
import icon_attach_file from "./../../../public/img/icon_attach_file.svg";

import './style.sass';

class ccMessageFooter extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = { 
      showAttach: false, 
      isShowingLoginModal: false
    };
  }

  handleEnterPressed(e) {

    if (e.key == "Enter") {
      console.log("key pressed : " + e.key);
     // var content = this.ccMessageEditorBox.innerText;
     this.sendTextMessage();  
    }
  }

  handleMessage(e) {
    this.sendTextMessage();
  }

  async sendTextMessage() {
    var content = this.ccMessageEditorBox.textContent.trim();
    console.log("inside message handler : " + content + "\n Message content : " + content.length );
    if (content.length > 0) {
      try {
        await this.props.sendMessage(
          content,
          this.props.activeUser,
          this.props.activeMessageType
        );
        this.ccMessageEditorBox.textContent = "";
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleMediaMessageGallery = e => {
    document.getElementById("ccMessageInputGallery").click();
  };

  openModalHandler = (modalName) => {

    switch(modalName){
      case 'login':    this.setState({isShowingLoginModal: true}); break;
    }
    
  }

  closeModalHandler = () => {
      this.setState({
          isShowingLoginModal: false
      });
  }

  

  //send media message
  async sendMediaMessage(content,mediaType) {
    try {
      await this.props.sendMediaMessage(
        content,
        this.props.activeUser,
        this.props.activeMessageType,
        mediaType
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const loginModal  = this.state.isShowingLoginModal ? (<LoginModal close={this.closeModalHandler.bind(this)}/>) : null;

    if(this.props.isGuest){

      return(
        <div className="buttonContainer">
           <button onClick={this.openModalHandler.bind(this,"login")} className="startChatBtn">START CHATTING</button>
           {loginModal}
        </div>
        

      );

    }else{
      return (
        <div>
          
          <Row style={ccMessageFooterStyle}>
            
            <Col lg={12} md={12} sm={12} xs={12} className="h-100">
              <div 
                className="ccMessageEditorBox border border-radius-full color-border-grey"
                contentEditable="true"
                data-placeholder="Type a message..."
                ref={div => {
                  this.ccMessageEditorBox = div;
                }}
                onKeyUp={this.handleEnterPressed.bind(this)}
              />
            </Col>
            {/* <Col lg={2} md={2} sm={2} xs={2} className="cc-no-padding h-100 align-center" >
              <div className="ccMessageFooterMenu">
                <span className="cc-icon sendButton " onClick={this.handleMessage.bind(this)} dangerouslySetInnerHTML={{__html:icon_send}}/>
              </div>
            </Col> */}
          </Row>
  
           {loginModal} 
  
        </div>
      );
    }

    
  }
}

var ccMessageFooterStyle = {
  position: "absolute",
  minHeight: "64px",
  maxHeight: "200px",
  backgroundColor: "#FFFFFF",
  bottom: "0px",
  width: "100%",
  display:"flex",
  justifyItems: "center",
  alignItems: "center",
  margin: "0px",

};

var ccMessageInputFile = {
  fontsize: "1px",
  width: "0px",
  height: "0px",
  opacity: "0",
  filter: "alpha(opacity=0)",
  position: "relative",
  top: "-40",
  left: "-20"
};

const mapStateToProps = store => {
  return {
    activeUser: store.message.activeMessage.id,
    activeMessageType: store.message.activeMessage.type,
    isGuest: store.users.isGuestUser
  };
};

const mapDispachToProps = dispatch => {
  return {
    sendMessage: (content, uid, msgType) =>         dispatch(actionCreator.sendTextMessage(uid, content, msgType)),
    sendMediaMessage: (content, uid, msgType,mediaType) =>    dispatch(actionCreator.sendMediaMessage(uid, content, msgType,mediaType)),
    
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ccMessageFooter);
