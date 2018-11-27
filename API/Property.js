import React from 'react';
import Constants from '../constants/Constants';

export const getAllProperties =  (data) => {
   return new Promise((resolve, reject) => {  
		try {
			var params = {
			  "token": 'K24RQ4FoFwTRMVkxKl3K5dqK3bJ2tL',
			  "agency_id": 1,
			  "page": 1,
			  "offset": 10,
			};

			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}
			
			//~ this.setState({loader:true});
			fetch(Constants.USER_PROPERTIES, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: formData
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson.success == true){
					resolve(responseJson.data);
				}else{
					reject(false);
				}
			})
		} catch(err) {
			alert(err.message);
		};
	})
	
}
