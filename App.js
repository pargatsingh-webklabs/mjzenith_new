import React, { Component }  from 'react';
import Router from './Router';
import { Permissions, Notifications } from 'expo';
import { AsyncStorage, NetInfo } from "react-native";

export default class App extends React.Component {
	componentDidMount = async() =>{
		NetInfo.getConnectionInfo().then((connectionInfo) => {
			console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
		});
		  const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		  );
		  let finalStatus = existingStatus;
console.log(existingStatus)
		  // only ask if permissions have not already been determined, because
		  // iOS won't necessarily prompt the user a second time.
		  if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		  }else{
			 this._loadAccessToken();
			}


		
	}


	_loadAccessToken = async() => {
		try {
			const token =  Notifications.getExpoPushTokenAsync();
			if(token){
				try {
					await AsyncStorage.setItem('token', JSON.stringify(token));
				}catch (error) {
					console.log(error.message);
				}
			}
		}catch (error) {
			console.log(error.message);
		}
	}

	render() {
		return (<Router/>);
	}
}


