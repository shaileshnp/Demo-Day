import React, { Component } from 'react'
import {Row} from 'react-bootstrap' 
import CCMessageHeader from './CCMessageHeader'
import CCMessageFooter from './CCMessageFooter'
import CCMessageBox from './CCMessageBox';
import { connect } from 'react-redux';

import * as action from "./../../store/actions/cc_action";

import './style.sass';

 

class CCMessageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
       
    }
  } 

  componentWillMount(){
   
  }

  
  render() {
  

    return (
        <div className="ccMessageContainer h-100" >
            
            {/* <CCMessageHeader></CCMessageHeader> */}
            <CCMessageBox/>
            
            <CCMessageFooter/>
            
        
        </div>
    );
  }
}



const mapStateToProps = (state) =>{
  return {
    
      
  };
};

const mapDispachToProps = dispatch => {
  return {
    login : (uid) => dispatch(action.loginInCC(dispatch,uid))
  };
};

export default connect( mapStateToProps, mapDispachToProps )(CCMessageContainer);


