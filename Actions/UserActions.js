import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { getUserHelper } from '../Utils';
import _ from 'lodash';
import {
    CURRENT_USER,
    NOTIFICATIONS,
    INBOX,
    ALL_USER
} from './types';

export const getCurrentUser = (userId) => {
    return async (dispatch) => {
        const user = await firebase.database().ref(`accounts/${userId}`).once('value');
        setCurrentUser(dispatch, user.val());
    }
}

export const allUsers = () => {
    return new Promise( (resolve, reject) => {
		try {
				firebase.database().ref('/accounts').orderByChild('points').limitToLast(10).on('value',function(snapshot){
				var array = [];
				  snapshot.forEach(function(childSnapshot) {
					array.unshift(childSnapshot.val());
				  });
				  resolve(array);
			});
			
		} catch(err) {
			alert(err.message);
		};
	})
}


export const getAllUsers = (search) => {
    return async (dispatch) => {
        if(search !== undefined && search !== ''){
          const listofUsers_search = [];
          const users_search = await firebase.database().ref('accounts').orderByChild("firstName").startAt(search).endAt(search+'\uf8ff').once('value');
          users_search.forEach(user => {
              listofUsers_search.push(user.val());
          });
          dispatch(AllUsers(listofUsers_search));
          return listofUsers_search;
        }else{
          const listofUsers = [];
          const users = await firebase.database().ref('accounts').orderByChild('points').once('value');
          users.forEach(user => {
            listofUsers.push(user.val());
          });
          dispatch(AllUsers(listofUsers));
          return listofUsers;
  			}
    }
}

export const AllUsers = allUsers => ({
      type: ALL_USER,
      payload: {allUsers}
});

export const getUser = (userId) => {
    return async (dispatch) => {
        const user = await firebase.database().ref(`accounts/${userId}`).once('value');
        return user.val();
    }
}

export const getAllFriends = (id) => {
    return async (dispatch) => {
        const ids = await firebase.database().ref(`accounts/`).once('value');
        const users = _.filter(ids.val(), 'expoPNToken')
        // await Promise.all(ids.val().map(async (id, key) => {
        //     const users = await getUserHelper(id);
        //     list.push(users);
        // }));
        return users;
    }
}

export const getUserNotifications = (id) => {
    return (dispatch) => {
        const array =[];
        const newArray =[];
        firebase.database().ref(`accounts/${id}`).child('notifications').on('child_added', (data) => {
			array.push(data.val());
			newArray.push({notify:data.val(),userData:''});
			array.map((childSnapshot, index) =>{
			  firebase.database().ref('accounts').child(childSnapshot.sendByUser).once('value').then(function(userData){
				newArray[index].userData = userData.val();
				setNotifications(dispatch,newArray);
			  })
			});
        });
        firebase.database().ref(`accounts/${id}`).child('notifications').on('child_changed', (data) => {
			array.push(data.val());
			newArray.push({notify:data.val(),userData:''});
			array.map((childSnapshot, index) =>{
			  firebase.database().ref('accounts').child(childSnapshot.sendByUser).once('value').then(function(userData){
				newArray[index].userData = userData.val();
				setNotifications(dispatch,newArray);
			  })
			});
        });
    }
}

export const getUserInbox = (ids) => {
    return async (dispatch) => {
        const inbox = []
        ids.forEach((value, key) => {
            firebase.database().ref('pendingCases').child(value.case).on('value', (data) => {

                setInbox(dispatch, data.val());
            });
        });
    }
}

const setCurrentUser = (dispatch, user) => {
    dispatch({
        type: CURRENT_USER,
        user
    });
}

export const setNotifications = (dispatch, notifications) => {
    dispatch({
        type: NOTIFICATIONS,
        notifications
    });
}

export const setInbox = (dispatch, inbox) => {
    dispatch({
        type: INBOX,
        inbox
    });
}
