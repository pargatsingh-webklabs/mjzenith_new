const apiUrl = 'https://mjzenith.com/api/';
const downloadUrl = 'https://mjzenith.com/';

export default {
	BASEURL 					: downloadUrl,
	USER_LOGIN 					: apiUrl+'login',
	USER_REGISTER 				: apiUrl+'register',
	FORGET_PASS 				: apiUrl+'forgetpassword',
	ADD_COMPANY 				: apiUrl+'add_company',
	USER_COMPANIES 				: apiUrl+'getUserCompanies',
	USER_COMPANY 				: apiUrl+'getUserCompany',
	DELETE_COMPANY 				: apiUrl+'deleteCompany',
	UPDATE_PROFILE 				: apiUrl+'updateUserInfo',
	USER_DETAIL 				: apiUrl+'userDetails',
	UPDATE_PASSWORD 			: apiUrl+'updatepassword',
	USER_DOCUMENTS 				: apiUrl+'getUserDocuments',
	VIEW_DOWNLOAD_DOCUMENT		: downloadUrl+'uploads/user_documents/',
	USER_APPLICATIONS 			: apiUrl+'getUserApplications',
	RESET_APPLICATIONS_FORM 	: apiUrl+'resetApplicationForm',
	USER_INVOICES 				: apiUrl+'listInvoices',
	USER_NOTIFICATIONS			: apiUrl+'getNotifications',
	USER_NOTIFICATIONS_COUNT	: apiUrl+'getNotificationsCount',
	USER_NOTIFICATION_STATUS	: apiUrl+'changeNotificationStatus',
	CLEAR_USER_TOKEN			: apiUrl+'clearUserToken',
};
