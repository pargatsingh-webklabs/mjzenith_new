import React from 'react';
import Constants from '../constants/Constants';


export const ListInvoices = (params) => {
   return new Promise((resolve, reject) => {
		try {
      var formData = new FormData();
			for (var k in params) {
				formData.append(k, params[k]);
			}
			fetch(Constants.USER_INVOICES, {
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
			.catch(function(error) {
				reject('Network error');
			})

		} catch(err) {
			reject(err.message);
		}
	});
}
