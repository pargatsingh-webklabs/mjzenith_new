import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Menus  from './components/Menus';

import HomeScreen from './screens/TabScreens/Home/HomeScreen';

import MyProfile from './screens/TabScreens/MyProfile';

import AccountSetting from './screens/TabScreens/AccountSetting';

import ListCompanies from './screens/TabScreens/Company/ListCompanies';
import AddCompany from './screens/TabScreens/Company/AddCompany';

import SignIn from './screens/Authorization/SignIn';
import SignUp from './screens/Authorization/SignUp';
import ThankYou from './screens/Authorization/ThankYou';
import ForgetPass from './screens/Authorization/ForgetPass';


class RouterComponent extends Component {
	
	constructor(props) {
		super(props);
	}
	
    render() {
        return (
			<Router>
			    <Scene key="root" hideNavBar={true} >
					<Scene key="Auth" hideNavBar type="reset" >
			            <Scene key="SignIn" component={SignIn}   />
			            <Scene key="SignUp" component={SignUp}   />
			            <Scene key="ForgetPass" component={ForgetPass}  />
						<Scene key="ThankYou" component={ThankYou}   />	 
			         </Scene>
					 <Scene key='Main'  drawer={true}  contentComponent={Menus} type="reset" >
			            <Scene key="Home" hideNavBar  icon={this.Add} type="reset"  >
			                <Scene key="HomeScreen"  component={HomeScreen}  type="reset" />
			            </Scene>
			            <Scene key="Company" hideNavBar  icon={this.Add} type="replace"  >
			                <Scene key="ListCompanies" hideNavBar  component={ListCompanies}  type="replace" />
			                <Scene key="AddCompany"  hideNavBar component={AddCompany} type="replace"   />
			            </Scene>
			            <Scene key="Profile" hideNavBar  type="replace"  >
			                <Scene key="MyProfile"  component={MyProfile}  type="replace" />
			            </Scene>			           
			            <Scene key="Account" hideNavBar  type="replace"  >
			                <Scene key="AccountSetting"  component={AccountSetting}  type="replace" />
			            </Scene>			           
			        </Scene>
			    </Scene>
			</Router>            
        );
    }
};


export default RouterComponent;
