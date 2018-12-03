import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Linking,
  Clipboard,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon , List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListApplications , resetApplicationForm } from '../../../API/Applications';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';
import base64 from 'react-native-base64';
;
export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state  = { Applications : [] , currentUser : [], refreshing : false, loader : false  };
    var {Platform} = React
  }


  openWebView = async (link) => {
    this.setState({ loader:true });
    Actions.WebViewPage({'link':link});
  };

	_onRefresh = () => {
		this._listAll();
	}



  render() {

    if (Platform.OS === 'ios')
      console.log('ios');
    else
      console.log('android');

    return (
     <View style={styles.container}>
		<TopBar />
		<View style={styles.loderBackground}>
		  <ActivityIndicator
			color="#f05f40"
			size="large"
			animating={this.state.loader} />
		</View>
		<View >
			<Text style={styles.contentHeading}>List Applications</Text>
		</View>

          <WebView
            source={{uri: 'https://mjzenith.com/uploadfile'}}
          />
    <ScrollView
			refreshControl={
			  <RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={this._onRefresh}
			  />
			}
			contentContainerStyle={styles.contentContainer}>
        </ScrollView>
      </View>
    );
  }


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		paddingLeft:20,
		paddingRight:20,
	},
	contentHeading: {
		paddingTop: 20,
		paddingBottom:0,
		textAlign:"center",
		fontSize:25,
		fontWeight:'600'
	},
	applicationTitle:{
		color:'#f05f40',
		fontSize:20,
		fontWeight:'600',
		marginLeft:10,
		paddingLeft:10,
		borderStyle: 'solid',
		borderLeftWidth: 1,
		borderLeftColor: 'grey'
	},
	applicationSubtitle:{
		marginLeft:10,
		paddingLeft:10,
		borderStyle: 'solid',
		borderLeftWidth: 1,
		borderLeftColor: 'grey'
	},
	loderBackground: {
		position:'absolute',
		right:0,
		left:0,
		bottom:0,
		top:100,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
