import React, { Component, BackHandler } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';
import Menus  from './components/Menus';

import HomeScreen from './screens/TabScreens/Home/HomeScreen';

import MyProfile from './screens/TabScreens/MyProfile';

import AccountSetting from './screens/TabScreens/AccountSetting';

import ListDocuments from './screens/TabScreens/Documents/ListDocuments';

import ListInvoices from './screens/TabScreens/Invoices/ListInvoices';

import ListApplications from './screens/TabScreens/Applications/ListApplications';

import ListAttachments from './screens/TabScreens/Attachments/ListAttachments';
import UploadAttachment from './screens/TabScreens/Attachments/UploadAttachment';

import Notifications from './screens/TabScreens/Notifications';

import WebViewPage from './screens/TabScreens/WebView/WebViewPage';

import SwitchCompany from './screens/TabScreens/Company/SwitchCompany';
import ListCompanies from './screens/TabScreens/Company/ListCompanies';
import AddCompany from './screens/TabScreens/Company/AddCompany';

import SignIn from './screens/Authorization/SignIn';
import SignUp from './screens/Authorization/SignUp';
import ThankYou from './screens/Authorization/ThankYou';
import ForgetPass from './screens/Authorization/ForgetPass';


class RouterComponent extends Component {

	constructor(props) {
		super(props);
		this.state = { initialSceneMain : false, initialSceneAuth : false, loading: true };
	}
	
	componentDidMount = () => {
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ loading: false });
			if(value != null){
				Actions.Main();
			}else{
				Actions.Auth();
			}
		 })
	}
	

    render() {
		if (this.state.loading) {
		  return <View style={{  flex: 1,justifyContent: 'center',alignItems: 'center' }}><Text style={{ marginTop :50 }}>Loading...</Text></View>;
		}
		let backLoginScene=false;
        return (
			<Router 
				backAndroidHandler={() => {
					const back_button_prohibited = ['login'];
					if (back_button_prohibited.includes(Actions.currentScene) ) {
						if (backLoginScene == false) {
							backLoginScene = !backLoginScene;
							return true;
						} else {
							backLoginScene = false;
							BackHandler.exitApp();
						}
						return false;
				}}}>
			    <Scene key="root" hideNavBar={true} >
					<Scene key="Auth" hideNavBar type="reset"  initial={ this.state.initialSceneAuth } >
			            <Scene key="SignIn" component={SignIn}   />
			            <Scene key="SignUp" component={SignUp}   />
			            <Scene key="ForgetPass" component={ForgetPass}  /> 
						<Scene key="ThankYou" component={ThankYou}   />
						<Scene key="Menus" component={Menus}  type="reset" />
			         </Scene>
					 <Scene key='Main'  drawer={true}  contentComponent={Menus} type="reset" initial={ this.state.initialSceneMain } > 
			            <Scene key="Home" hideNavBar  icon={this.Add} type="reset"  >
			                <Scene key="HomeScreen"  component={HomeScreen}  type="reset" />
			            </Scene>
			            <Scene key="Company" hideNavBar  icon={this.Add} type="replace"  >
			                <Scene key="ListCompanies" hideNavBar  component={ListCompanies}  type="replace" />
			                <Scene key="AddCompany"  hideNavBar component={AddCompany} type="replace"   />
			                <Scene key="SwitchCompany"  hideNavBar component={SwitchCompany} type="replace"   />
			            </Scene>
			            <Scene key="Profile" hideNavBar  type="replace"  >
			                <Scene key="MyProfile"  component={MyProfile}  type="replace" />
			            </Scene>
			            <Scene key="Account" hideNavBar  type="replace"  >
			                <Scene key="AccountSetting"  component={AccountSetting}  type="replace" />
			            </Scene>
			            <Scene key="Documents" hideNavBar  type="replace"  >
			                <Scene key="ListDocuments" hideNavBar  component={ListDocuments}  type="replace" />
			            </Scene>
						<Scene key="Applications" hideNavBar   type="replace"  >
								<Scene key="ListApplications" hideNavBar  component={ListApplications}  type="replace" />
						</Scene>

						<Scene key="Attachments" hideNavBar    type="replace"  >
								<Scene key="ListAttachments" hideNavBar  component={ListAttachments}  type="replace" />
								<Scene key="UploadAttachment" hideNavBar  component={UploadAttachment}  type="replace" />
						</Scene>

						<Scene key="Invoices" hideNavBar  type="replace"  >
								<Scene key="ListInvoices" hideNavBar  component={ListInvoices}  type="replace" />
						</Scene>
						<Scene key="Notify" hideNavBar  icon={this.Add} type="replace"  >
								<Scene key="Notifications" hideNavBar  component={Notifications}  type="replace" />
						</Scene>
						<Scene key="WebView" hideNavBar   type="replace"  >
								<Scene key="WebViewPage" hideNavBar  component={WebViewPage}  type="replace" />
						</Scene>
			        </Scene>
			    </Scene>
			</Router>
        );
    }
};


export default RouterComponent;
