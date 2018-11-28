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
import { ScaledSheet } from 'react-native-size-matters';
import { Icon ,  List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { ListCompanies } from '../../../API/Company';
import TopBar from '../../../components/TopBar';

export default class SwitchCompany extends React.Component {
  	constructor(props) {
		super(props);    
		this.state = { Companies : [] , currentUser : [], refreshing: false, loader:false, selectedRadio: '' };	
	}
	
	componentDidMount = () =>{
		this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{ 	
			this.setState({ currentUser: JSON.parse(value) }) 
			this.setState({ selectedRadio: this.state.currentUser.company_id }) 
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
	
	_submit = () => {
		if ( !this.state.selectedRadio ){ 
			alert('Please select any company');
			return false;
		}
		this.state.currentUser.company_id = this.state.selectedRadio;
		AsyncStorage.setItem('userData', JSON.stringify(this.state.currentUser)); 
		alert('Company  has been switched ')
		Actions.Main();
	}
	
  render() {
    return (
     <View style={styles.container}>
		<TopBar />
		<View >
            <Text style={styles.contentHeading}>Switch Company</Text>
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
                  <TouchableOpacity   key={item.id}  onPress={ () => this.setState({selectedRadio : item.id }) } >
                    <ListItem
                      titleStyle ={{color:'#f05f40',fontSize:20,  fontWeight:'600'}}
                      title={item.name}
                      subtitle={ this.dateTime(item.created) }
                      rightIcon={ 
									<Icon
										name= { this.state.selectedRadio == item.id ? 'radio-button-checked' : 'radio-button-unchecked' }
										type='materialIcons'
										size={30}
										color={'#f05f40'}
										onPress={() => this.setState({selectedRadio : item.id }) }
									/>
                                }
                    />
                </TouchableOpacity>
                ))
              }
            </List>
            { this.state.Companies != '' ?
				<View style={{ marginTop: 30}}>
					<TouchableOpacity style={styles.button} onPress={ () => this._submit() } >
						<Text style={styles.btnText}>Switch Company</Text>
					</TouchableOpacity>
				</View>
				: null
			}
			
        </ScrollView>

      </View>
    );
  }


}

const styles = ScaledSheet.create({
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
	button: {
		alignItems: 'center',
		backgroundColor: '#f05f40',
		padding: 20,
		borderRadius:10,
		fontWeight:'600',
	},
	btnText: { 
		color:'#fff',
		fontWeight: '700',
		fontSize:'14@ms0.3'
	},
});
