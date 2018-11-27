import React from 'react';
import Constants from '../constants/Constants';

export const addCompany = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.ADD_COMPANY, {
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

export const ListCompanies = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_COMPANIES, {
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

export const userCompany = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_COMPANY, {
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
export const deleteCompany = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.DELETE_COMPANY, {
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

