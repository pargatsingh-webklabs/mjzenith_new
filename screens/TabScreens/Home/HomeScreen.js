import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
		this.state = { currentUser : [], menus : [] };		
		this.menus = Constants.MENUS;
	}
	
   	componentDidMount = () => {
		AsyncStorage.getItem('menus').then((result) =>{
			this.setState({ menus: JSON.parse(result) })
		})
		
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) }) 
		 })
	}
	
	
	_action = type =>{
		switch(type){
			case  'dashboard':
				Actions.Main();
			break;
			case  'company':
				Actions.ListCompanies();
			break;

			case  'attachments':

			break;
			case  'invoices':
				Actions.ListInvoices();
			break;
			case  'documents':
				Actions.ListDocuments();

			break;
			case  'applications':
				Actions.ListApplications();

			break;
			case  'logout':
				clearUserToken(this.state.currentUser).then((value) =>{
					AsyncStorage.clear();
					AsyncStorage.getItem('userData').then((value) =>{
						Actions.Auth();
					})
				});
			break;
			default:
				alert('Something went wrong');
		}
	}

	
  render() {
    return (
     <View style={styles.container}>
		<TopBar />
		<View >
			<Text style={styles.contentHeading}>Dashboard</Text>
		</View>
       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={ false } >
			<FlatList contentContainerStyle={{  alignItems: 'center', marginTop: 20, }}
			  data={  this.state.menus  }
			  numColumns={2}
			  keyExtractor={(item, index) => item.id }
			  renderItem={(item) => 
					item.item.slug == 'logout' ? null :
						<TouchableOpacity  style={{marginLeft:30,marginRight:30}} onPress={ () =>  this._action(item.item.slug)  } >
							<Icon
							  raised
							  name={ item.item.icon }
							  type={ item.item.iconType }
							  size={ 40 }
							  color={ item.item.iconColor }
							/>
							<Text style={styles.controlText} >{ item.item.name }</Text>
						</TouchableOpacity> }
			/>
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
    paddingTop: 30,
	paddingLeft:20,
	paddingRight:20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: '80%',
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
	contentHeading: {
        paddingTop: 20,
        paddingBottom:0,
        textAlign:"center",
        fontSize:25,
        fontWeight:'600'
    },
    controlText:{
		textAlign:"center",
	}

});
