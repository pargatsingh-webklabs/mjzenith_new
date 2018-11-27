import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

export default class TopBar extends React.Component {
  render() {
    return (
      <View style={ styles.bar } >
			<TouchableOpacity style={{alignItems: 'flex-start',}} onPress={() => Actions.drawerToggle() }>
				<Icon
				  name='bars'
				  type='font-awesome'
				  size={40}
				  color={'#fff'}				 
				/>
			</TouchableOpacity>
		</View>
    );
  }
}
const styles = StyleSheet.create({
	bar: {
		paddingTop:20,
		paddingBottom:10,
		paddingLeft:20,
		paddingRight:20,
		backgroundColor: '#f05f40',
	},

});
