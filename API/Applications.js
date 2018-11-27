import React from 'react';
import Constants from '../constants/Constants';


export const ListApplications = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			fetch(Constants.USER_APPLICATIONS, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'multipart/form-data',
				  }
			})
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
	
		} catch(err) {
			reject(err.message);
		}
	});
}

export const resetApplicationForm = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.RESET_APPLICATIONS_FORM, {
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
	
		} catch(err) {
			reject(err.message);
		}
	});
}



