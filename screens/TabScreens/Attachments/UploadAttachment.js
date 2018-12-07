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
  Button,
  WebView
} from 'react-native';
import { Icon , List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListApplications , resetApplicationForm } from '../../../API/Applications';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';
import base64 from 'react-native-base64';

import {  WebBrowser } from 'expo';
export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state  = { Applications : [] , currentUser : [], refreshing : false, loader : false , SITE_URL : ''  };
    var {Platform} = React
  }


  openWebView = async (link) => {
    this.setState({ loader:true });
    Actions.WebViewPage({'link':link});
  };

	_onRefresh = () => {
		this._listAll();
	}

  componentDidMount = () =>{
	//	this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })
      var userId    = this.state.currentUser.id;
      var companyId = this.state.currentUser.company_id;
  		companyId = (companyId=="" || companyId==null)?'0':companyId;
      this.setState({ userId: userId })
      this.setState({ companyId: companyId })
      this.setState({ SITE_URL: Constants.BASEURL+'uploadfile/?user_id='+this.state.userId+'&company_id='+this.state.companyId })

		})
	}
    
    
    
render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.paragraph}
          title="Open WebBrowser"
          onPress={this._handlePressButtonAsync}
        />
        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      </View>
    );
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(this.state.SITE_URL);
    this.setState({ result });
  };


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
