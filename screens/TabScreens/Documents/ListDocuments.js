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
import { Icon ,  List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListDocuments } from '../../../API/Documents';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state = { Documents : [] , currentUser : [], refreshing: false, loader:false };
	}


  openWebView = async (link) => {
    this.setState({ loader:true });
    Actions.WebViewPage({'link':link});
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
		ListDocuments(data).then(result => {
			console.log(result.data)
			this.setState({ Documents: result.data, loader:false })
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
			<Text style={styles.contentHeading}>List Documents</Text>
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
                this.state.Documents != undefined ? 
					this.state.Documents.map((item) => (
						<ListItem
						  titleStyle ={{color:'#f05f40',fontSize:20,  fontWeight:'600'}}
						  title={item.document}
						  subtitle={ this.dateTime(item.created) }
						  rightIcon={
									  <Icon
										raised
										name='eye'
										type='font-awesome'
										size={20}
										color={'#19B31F'}
										onPress={ () => this.openWebView(Constants.VIEW_DOWNLOAD_DOCUMENT+item.document)  }
									  />

									}
						/>
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
