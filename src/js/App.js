import React,{Component} from "react";
import { connect } from "react-redux";

import {isEmpty} from "./lib/uiComponentLib";
import Login from "./components/login/Login";
import Embeded from "./layouts/embed/Embeded";

import * as action from "./store/actions/cc_action";
import {CometChat} from "@cometchat-pro/chat";

export default class App extends Component {  
   
// componentDidMount(){
    
//     this.props.login("superhero10");
// }

    render() {    
        return (
            // <CheckLoginUser loggedStatus = {this.props.loggedInUser} cc_layout = {this.props.cc_layout}/> 
            <Embeded/>
        );
    }
}


// function CheckLoginUser(props){

    

//     if(isEmpty(props.loggedStatus)){
//         console.log("show login screen");
//         return <ShowLoginPage/>;
//     }else{
//         console.log("show Messenger");
//         return <ShowMessenger cc_layout = {props.cc_layout}/>;
//     }

// }

// function ShowMessenger(props) {
    
//     return <Embed/>;
// }
 

// function ShowLoginPage(props) {
//     return <Login/>; 
// }


// const mapStateToProps = state => {
//     return {
      
//       loggedInUser : state.users.loggedInUser
//     };
// };
  
// const mapDispachToProps = dispatch => {
//     return {
//         login : (uid) => dispatch(action.loginInCC(dispatch,uid))
//     };
// };

//export default connect(mapStateToProps,mapDispachToProps)(App);







