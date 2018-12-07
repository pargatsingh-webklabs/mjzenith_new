import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { userNotifyCount } from '../API/Notifications';

export default class TopBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = { notifyCount : '', currentUser : [] };
	}

	componentDidMount = () => {
		var data = {};

		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })

			data.user_id = this.state.currentUser.id;

			userNotifyCount(data).then((result) =>{
				this.setState({ notifyCount: result.data.unread })
			})
		})
	}

  render() {
    return (
      <View style={ styles.bar } >
			<TouchableOpacity  onPress={() => Actions.drawerToggle() }>
				<Icon
				  name='bars'
				  type='font-awesome'
				  size={25}
				  color={'#fff'}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => Actions.Notifications() } >
				<Icon
				  name='notifications'
				  type='materialIcons'
				  size={25}
				  color={'#fff'}
				/>
				{ this.state.notifyCount ? (<Text style={ styles.notiBadge }>{ this.state.notifyCount }</Text>) : null }
			</TouchableOpacity>
		</View>
    );
  }
}
const styles = StyleSheet.create({
	bar: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingTop:35,
		paddingBottom:10,
		paddingLeft:20,
		paddingRight:20,
		backgroundColor: '#f05f40',
	},
	notiBadge:{
		textAlign:'center',
		marginTop:-35,
		marginLeft:20,
		backgroundColor: '#000',
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 10,
		height: 18,
		width: 18,
		color: '#fff',
		overflow:"hidden"
	}

});
