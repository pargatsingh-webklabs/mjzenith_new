import React from 'react';
import Constants from '../constants/Constants';


export const ListDocuments = (params) => {
   return new Promise((resolve, reject) => {
		try {
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}
			fetch(Constants.USER_DOCUMENTS, {
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
