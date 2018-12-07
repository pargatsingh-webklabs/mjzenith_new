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
  Linking
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon,  List, ListItem, Badge } from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListInvoices } from '../../../API/Invoices';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';
import base64 from 'react-native-base64';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state = { Invoices : [] , currentUser : [], refreshing: false, loader:false };
	}

    openWebView = async (link) => {
      this.setState({ loader:true });
      Actions.WebViewPage({'link':link+'&view='+base64.encode('mobile')});
    };

	componentDidMount = () =>{
		this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })
			this._listAll();

		})


	}

	_listAll = () =>{
		var data = {};
		var companyId = this.state.currentUser.company_id;
		data.company_id = (companyId=="" || companyId==null)?'0':companyId;
		data.user_id = this.state.currentUser.id;
    console.log(data)
		ListInvoices(data).then(result => {
			console.log(result.data)
			this.setState({ Invoices: result.data, loader:false })
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
			<Text style={styles.contentHeading}>List Invoices</Text>
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
                this.state.Invoices != undefined ?
					this.state.Invoices.map((item) => (

					<TouchableOpacity style={styles.button} onPress={ () => this.openWebView(Constants.BASEURL+'admin/login/preview_invoice/?iid='+base64.encode(item.id)) } >
						<ListItem
						  containerStyle = {{backgroundColor:item.badgeContainer}}
						  badge={{ value: item.statusBadge ,containerStyle:{backgroundColor:item.badgeColor}, textStyle: { color: '#fff' } }}
						  titleStyle ={{color:'#f05f40',fontSize:20,  fontWeight:'600'}}
						  subtitleStyle ={styles.subtitleText}
						  title={'INV-'+item.invoice_no}
						  subtitle={ "Due Date : "+this.dateTime(item.due_date) }
						/>
					</TouchableOpacity>

					))
				:(<View  style={{flex: 1, justifyContent: 'center', flexDirection: 'row', paddingTop:10, paddingBottom:10}}>
						<Text style={styles.textDescription}>No data available</Text>
				</View>)	
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
  subtitleText:{
    color: '#ff9900',
		fontWeight:'500'
  },
	contentHeading: {
		paddingTop: 20,
		paddingBottom:0,
		textAlign:"center",
		fontSize:25,
		fontWeight:'600'
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
