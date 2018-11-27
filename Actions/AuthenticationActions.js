import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { 
    IS_LOADING 
} from './types';

export const createAccount =  ({firstName, lastName, email, password}) => {
    return async (dispatch)  => {
        isLoading(dispatch, true);
        try {
            const account = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
            firebase.database().ref('accounts').child(account.user.uid).set({
                id: account.user.uid,
                firstName: firstName, 
                lastName: lastName,
                email: email,
                bio: '',
                rank: 0,
                points: 0,
                wins: 0,
                losses: 0,
                cases: 0,
                teams: 0,
                userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYjU6pmBARJ191GCVK0UncdRoj_zVSJ4ZjLkRuSoDICKTfWxA'
            }).catch( err => alert(err.message));
            isLoading(dispatch, false);
            Actions.main();
        } catch(err) {
            isLoading(dispatch, false);
            alert(err.message);
        };
    }
}

export const loginAccount = ({email, password}) => {
    return async (dispatch) => {
        isLoading(dispatch, true);
        
        try {
            const account = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
            isLoading(dispatch, false);
            Actions.replace('main');
        } catch(err) {
            isLoading(dispatch, false);
            alert(err.message);
        }
    }
}

export const resetPassword = ({email}) => {
    return async (dispatch) => {
        isLoading(dispatch, true);

        try {
            const resetPassword = await firebase.auth().sendPasswordResetEmail(email);
            isLoading(dispatch, false);
            Actions.pop();
            alert('Check you inbox to reset your password');
        } catch(err) {
            isLoading(dispatch, false);
            alert(err.message);
        }
    }
}

export const updateProfileEmail =  ({email, userId}) => {
    return async (dispatch)  => {
        isLoading(dispatch, true);
        try {
			firebase.database().ref('accounts').child(userId).update({'email':email})
            isLoading(dispatch, false);
            alert("Your profile email has been updated successfully.")
            Actions.profileHome();
        } catch(err) {
            isLoading(dispatch, false);
            alert(err.message);
        };
    }
}

const isLoading = (dispatch, isLoading) => {
    dispatch({
        type: IS_LOADING,
        isLoading
    });
}
