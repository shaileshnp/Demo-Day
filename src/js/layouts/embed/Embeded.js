import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "./../../lib/uiComponentLib";
import { Grid, Row, Col } from 'react-bootstrap';
import * as actionCreator from './../../store/actions/cc_action';
import Splash from "./../../components/splash/splash";
import CCMessageContainer from '../../components/message/CCMessageContainer';


//const CCMessageContainer = React.lazy(() => import('../../components/message/CCMessageContainer'));

 class Embeded extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }
    
    render() {


        if(this.props.showLoader){
             return( <Splash/> );
        }

        return(
            <Grid fluid={true} className="border-radius-top bg-white h-100pr">
                <Row className="ccShowGrid bg-white border-radius-top ">
                    <CCMessageContainer/> 
                </Row>
            </Grid>
        );

    };
}

const mapStateToProps = (store) => {
    return {
    
        showLoader: store.app.splashHandler.showLoader,
    };
};

const mapDispachToProps = dispatch => {
    return {
        fetchUser: (limit) => dispatch(actionCreator.getUsers(limit)),
        fetchGroup: (limit) => dispatch(actionCreator.getGroups(limit)),
        registerListener: () => actionCreator.addMessageListener(dispatch),
        startFetching: () => dispatch(actionCreator.startFetching()),

    };
};

export default connect(mapStateToProps, mapDispachToProps)(Embeded);