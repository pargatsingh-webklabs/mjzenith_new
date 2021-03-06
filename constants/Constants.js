const apiUrl = 'https://mjzenith.com/api/';
const downloadUrl = 'https://mjzenith.com/';

export default {
	BASEURL 									: downloadUrl,
	USER_LOGIN 								: apiUrl+'login',
	USER_REGISTER 						: apiUrl+'register',
	FORGET_PASS 							: apiUrl+'forgetpassword',
	ADD_COMPANY 							: apiUrl+'add_company',
	USER_COMPANIES 						: apiUrl+'getUserCompanies',
	USER_COMPANY 							: apiUrl+'getUserCompany',
	DELETE_COMPANY 						: apiUrl+'deleteCompany',
	UPDATE_PROFILE 						: apiUrl+'updateUserInfo',
	USER_DETAIL 							: apiUrl+'userDetails',
	UPDATE_PASSWORD 					: apiUrl+'updatepassword',
	USER_DOCUMENTS 						: apiUrl+'getUserDocuments',
	VIEW_DOWNLOAD_DOCUMENT		: downloadUrl+'uploads/user_documents/',
	USER_APPLICATIONS 				: apiUrl+'getUserApplications',
	RESET_APPLICATIONS_FORM 	: apiUrl+'resetApplicationForm',
	USER_ATTACHMENTS 					: apiUrl+'getUserAttachments',
	DELETE_ATTACHMENT 				: apiUrl+'deleteUserAttachment',
	USER_INVOICES 						: apiUrl+'listInvoices',
	USER_NOTIFICATIONS				: apiUrl+'getNotifications',
	USER_NOTIFICATIONS_COUNT	: apiUrl+'getNotificationsCount',
	USER_NOTIFICATION_STATUS	: apiUrl+'changeNotificationStatus',
	CLEAR_USER_TOKEN					: apiUrl+'clearUserToken',
	MENUS : [
			{ id: 1, name: 'dashboard', icon: 'home' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 2, name: 'company', icon: 'building-o' , iconColor: '#f05f40' , iconSize: 20  , iconType: 'font-awesome',
				subMenu: [
							{ id: 3, name: 'List Company', icon: 'building-o', iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  },
							{ id: 4, name: 'Add Company', icon: 'building-o' , iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  }
				]
			},
			{ id: 5, name: 'attachments', icon: 'files-o' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20 ,
				subMenu: [
							{ id: 6, name: 'List Attachments', icon: 'files-o' , iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  },
							{ id: 7, name: 'Upload Attachments', icon: 'files-o' , iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  }
				]
			},
			{ id: 8, name: 'invoices', icon: 'clipboard' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 9, name: 'documents', icon: 'file-text' , iconType: 'feather', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 10, name: 'applications', icon: 'file-text' , iconType: 'feather', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 11, name: 'logout', icon: 'log-out' , iconType: 'entypo', iconColor: '#f05f40' , iconSize: 20
			}
		],
	MENUS_WIHOUT_COMP : [
			{ id: 1, name: 'dashboard', icon: 'home' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 5, name: 'attachments', icon: 'files-o' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20 ,
				subMenu: [
							{ id: 6, name: 'List Attachments', icon: 'files-o' , iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  },
							{ id: 7, name: 'Upload Attachments', icon: 'files-o' , iconColor: '#54667a' , iconSize: 15 , iconType: 'font-awesome'  }
				]
			},
			{ id: 8, name: 'invoices', icon: 'clipboard' , iconType: 'font-awesome', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 9, name: 'documents', icon: 'file-text' , iconType: 'feather', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 10, name: 'applications', icon: 'file-text' , iconType: 'feather', iconColor: '#f05f40' , iconSize: 20
			},
			{ id: 11, name: 'logout', icon: 'log-out' , iconType: 'entypo', iconColor: '#f05f40' , iconSize: 20
			}
		],

};
