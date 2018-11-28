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
  Clipboard
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon , List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListApplications , resetApplicationForm } from '../../../API/Applications';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';
import base64 from 'react-native-base64';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);



		this.state  = { Applications : [] , currentUser : [], refreshing: false, loader:false };

  }

  writeToClipboard = async (link,applicationName) => {
    alert(link);
    await Clipboard.setString(link);
    alert('Public URL for application : '+applicationName+' has been copied to clipboard.');
  };

	componentDidMount = () =>{
		this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })

      var userId    = this.state.currentUser.id;
      var companyId = this.state.currentUser.company_id;
  		companyId = (companyId=="" || companyId==null)?'0':companyId;
      this.setState({ userId: userId })
      this.setState({ companyId: companyId })

			this._listAll();
		})
	}

	_listAll = () =>{
		ListApplications().then(result => {
			console.log(result.data)
			this.setState({ Applications: result.data, loader:false })
		})
	}

	_onRefresh = () => {
		this._listAll();
	}


	dateTime = (UNIX_timestamp) =>{
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
	}

	resetForm = (id) =>{
		var data = {};
		data.application_id = id;
		var companyId = this.state.currentUser.company_id;
		data.company_id = (companyId=="" || companyId==null)?'0':companyId;
		data.user_id = this.state.currentUser.id;
		Alert.alert(
		  'Note : If once you reset this form, your previous changes to this form will be removed. So are you sure you want to reset this form ? ',
		  '',
		  [
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () =>  this._resetForm(data) },
		  ],
		  { cancelable: false }
		)
	}


	_resetForm = (data) => {
		this.setState({ loader:true })
		console.log(data);
		resetApplicationForm(data).then(result => {
			console.log(result);
			this.setState({  loader: false });
			alert(result.message);

		});
	}


  render() {
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

        <ScrollView
			refreshControl={
			  <RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={this._onRefresh}
			  />
			}
			contentContainerStyle={styles.contentContainer}>
            <List>
              {
                this.state.Applications != undefined && this.state.Applications.map((item) => (
  <TouchableOpacity  style={styles.button} onPress={ () => Linking.openURL(Constants.BASEURL+'application/html_application/?application_id='+base64.encode(item.id)+'&user_id='+base64.encode(this.state.userId)+'&company_id='+base64.encode(this.state.companyId) ,item.name) } >
                    <ListItem
                      titleStyle ={styles.applicationTitle}
                      subtitleStyle ={styles.applicationSubtitle}
                      title={item.name}
                      subtitle={ this.dateTime(item.created) }
                      leftIcon={
                                  <Icon
                                    name='copy'
                                    type='font-awesome'
                                    size={20}
                                    color={'#f05f40'}
                                    onPress={() =>  this.writeToClipboard(Constants.BASEURL+'application/html_application/?application_id='+base64.encode(item.id)+'&user_id='+base64.encode(this.state.userId)+'&company_id='+base64.encode(this.state.companyId) ,item.name)  }
                                  />

                                }
                      rightIcon={
                                  <Icon
                                    raised
                                    name='undo'
                                    type='font-awesome'
                                    size={20}
                                    color={'#19B31F'}
                                    onPress={() => this.resetForm(item.id)  }
                                  />

                                }
                    />
  </TouchableOpacity>
                ))
              }
            </List>

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
