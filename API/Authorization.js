import React from 'react';
import Constants from '../constants/Constants';

export const signIn = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_LOGIN, {
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

export const signUp = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_REGISTER, {
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

export const forgetPass = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.FORGET_PASS, {
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

export const updateProfile = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.UPDATE_PROFILE, {
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

export const userDetail = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.USER_DETAIL, {
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
export const updatePassword = (params) => {
   return new Promise((resolve, reject) => {  
		try {	
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.UPDATE_PASSWORD, {
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

