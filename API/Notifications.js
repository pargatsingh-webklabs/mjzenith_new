import React from 'react';
import { Permissions, Notifications } from 'expo';
import Constants from '../constants/Constants';

export const userNotify = async (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_NOTIFICATIONS, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'multipart/form-data',
				  },
				  body: formData
			})
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch(function(error) {
				reject('Network error');
			})
	
		} catch(err) {
			reject(err.message);
		}
	});
}

export const userNotifyCount = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_NOTIFICATIONS_COUNT, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'multipart/form-data',
				  },
				  body: formData
			})
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch(function(error) {
				reject('Network error');
			})
	
		} catch(err) {
			reject(err.message);
		}
	});
}

export const userNotifyStatus = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_NOTIFICATION_STATUS, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'multipart/form-data',
				  },
				  body: formData
			})
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch(function(error) {
				reject('Network error');
			})
	
		} catch(err) {
			reject(err.message);
		}
	});
}
