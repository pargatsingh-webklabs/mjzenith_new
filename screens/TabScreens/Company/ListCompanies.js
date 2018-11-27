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
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon ,  List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListCompanies, deleteCompany } from '../../../API/Company';
import TopBar from '../../../components/TopBar';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);    
		this.state = { Companies : [] , currentUser : [], refreshing: false, loader:false };	
	}
	
	componentDidMount = () =>{
		this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{ 	
			this.setState({ currentUser: JSON.parse(value) }) 
			this._listAll();
			
		})
		
		
	}
	
	_listAll = () =>{
		var data = {};
		data.user_id = this.state.currentUser.id;
		
		ListCompanies(data).then(result => {
			this.setState({ Companies: result.data, loader:false })
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
	
	deleteCompany = (id) =>{
		var data = {};
		data.id = id;
		Alert.alert(
		  'Are you sure you want to delete company!',
		  '',
		  [
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () =>  this._deleteCompany(data) },
		  ],
		  { cancelable: false }
		)
	}
	
	_deleteCompany = (data) => {
		this.setState({ loader:true })
		deleteCompany(data).then(result => {
			this.setState({  loader: false });
			this._listAll();
		});
	}
	
  render() {
    return (
     <View style={styles.container}>
		<TopBar />
		<View >
            <Text style={styles.contentHeading}>List Companies</Text>
        </View>
		<View style={styles.loderBackground}>
		  <ActivityIndicator
			color="#f05f40"
			size="large"
			animating={this.state.loader} />
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
                this.state.Companies != undefined && this.state.Companies.map((item) => (
                  <TouchableOpacity   key={item.id} style={styles.button} onPress={ () => Actions.AddCompany({ CompanyId: item.id }) } >
                    <ListItem
                      titleStyle ={{color:'#f05f40',fontSize:20,  fontWeight:'600'}}
                      title={item.name}
                      subtitle={ this.dateTime(item.created) }
                      rightIcon={ 
                                  <Icon
                                    raised
                                    name='bitbucket'
                                    type='font-awesome'
                                    size={20}
                                    color={'#fc0399'}
                                    onPress={() => this.deleteCompany(item.id) }
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
	loderBackground: {
		position:'absolute',
		right:0,
		left:0,
		bottom:0,
		top:100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentHeading: {
        paddingTop: 20,
        paddingBottom:0,
        textAlign:"center",
        fontSize:25,
        fontWeight:'600'
    },
});
