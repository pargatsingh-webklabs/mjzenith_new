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
import { ListAttachments , deleteUserAttachment } from '../../../API/Attachments';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';
import base64 from 'react-native-base64';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state  = { Attachments : [] , currentUser : [], refreshing : false, loader : false  };
  }

  openWebView = async (link) => {
    this.setState({ loader:true });
    Actions.WebViewPage({'link':link});
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
    var data = {};
		var companyId = this.state.currentUser.company_id;
		data.company_id = (companyId=="" || companyId==null)?'0':companyId;
		data.user_id = this.state.currentUser.id;
    console.log(data);
		ListAttachments(data).then(result => {
			console.log(result.data)
			this.setState({ Attachments: result.data, loader:false })
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

	deleteAttachment = (id,Aname) =>{
		var data = {};
		data.id = id;
		Alert.alert(
		  'Note : Are you sure you want to delete attachment :  '+Aname,
		  '',
		  [
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () =>  this._deleteAttachment(data) },
		  ],
		  { cancelable: false }
		)
	}


	_deleteAttachment = (data) => {
		this.setState({ loader:true })
		console.log(data);
		deleteUserAttachment(data).then(result => {
			console.log(result);
      this._listAll();
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
			<Text style={styles.contentHeading}>List Attachments</Text>
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
                this.state.Attachments != undefined && this.state.Attachments.map((item) => (
                  <TouchableOpacity  style={styles.button} onPress={ () => this.openWebView(Constants.BASEURL+'uploads/user_attachments/'+item.attachment) } >
                    <ListItem
                      titleStyle ={styles.attachmentsTitle}
                      title={item.attachment}
                      subtitle={

                        <View style={{ flexDirection: 'column' }} >
                          <Text><Text style={{ fontWeight:'600' }}>Added By : </Text>{ item.addedBy }</Text>
                          <Text>{ this.dateTime(item.created) }</Text>
                        </View>
                       }
                      rightIcon={
                                <Icon
                                  raised
                                  name='bitbucket'
                                  type='font-awesome'
                                  size={20}
                                  color={'#fc0399'}
                                  onPress={() =>  this.deleteAttachment(item.id,item.attachment)  }
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
	attachmentsTitle:{
		color:'#f05f40',
		fontSize:20,
		fontWeight:'600',
    paddingLeft:0,
    marginLeft:0
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
