import React from 'react';
import Constants from '../constants/Constants';


export const ListAttachments = (params) => {
  return new Promise((resolve, reject) => {
   try {
     var formData = new FormData();

     for (var k in params) {
       formData.append(k, params[k]);
     }
     console.log(formData)
     fetch(Constants.USER_ATTACHMENTS, {
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

export const deleteUserAttachment = (params) => {
   return new Promise((resolve, reject) => {
		try {
			var formData = new FormData();

			for (var k in params) {
				formData.append(k, params[k]);
			}

			fetch(Constants.DELETE_ATTACHMENT, {
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
