import React from 'react';
import  {
  Component,
  PropTypes,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  AsyncStorage,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import Constants from '../constants/Constants';

export default class Menus extends React.Component {

	constructor(props) {
		super(props);
		this.state = { selectedMenu : [] , currentUser : [] };		
		this.menus = Constants.MENUS;
	}
	
	componentDidMount = () => {
		AsyncStorage.getItem('userData').then((value) =>{
		console.log(JSON.parse(value))
			 this.setState({ currentUser: JSON.parse(value) }) 
		 })
		
	}
	
	Capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	_selectedMenu = value =>{
		const array = this.state.selectedMenu;
        
        if (array.indexOf(value) == -1) { 
            array.push(value);
        }else{
            array.splice(array.indexOf(value), 1);
        }
        this.setState({selectedMenu:array});
	}
	
	_action = type =>{
		switch(type){
			case  'dashboard':
				Actions.Main();
			break;
			case  'List Company':
				Actions.ListCompanies();
			break;
			case  'Add Company':
				Actions.AddCompany();
			break;
			case  'attachments':
				
			break;
			case  'invoices':
				
			break;
			case  'documents':
				
			break;
			case  'applications':
				
			break;	
			case  'logout':
				Actions.Auth();
			break;
			default:
				alert('Something went wrong');
		}
	}

  render() {
    return (
		<View style={styles.container} >
			<TouchableOpacity >
			<View
				style={{
					alignItems: 'center',
					borderBottomWidth: 1,
				}}
				>
				<Image
					source={
						require('../assets/images/logo-150x150.png')
					}
					style={styles.logo}
				/>
			</View>
			</TouchableOpacity>
			<View style={{ alignItems:'center', marginTop:10 }}>	
				<Avatar
				  large 
				  rounded
				  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
				  onPress={() => console.log("Works!")}
				  activeOpacity={0.7}
				/>
				<Text style={{ paddingTop: 10 }} >{ this.state.currentUser.email }</Text>
			</View>	
			
			<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={ false } >
				{ this.menus.map( (item, key) => (
					<View key={ key } >
						<TouchableOpacity  style={styles.button} onPress={ () => item.subMenu == undefined ? this._action(item.name) : this._selectedMenu(item.name) } >
							<Icon
							  raised
							  name={ item.icon }
							  type={ item.iconType }
							  size={ item.iconSize }
							  color={ item.iconColor }
							/>
							<Text style={styles.controlText} >{ this.Capitalize(item.name) }</Text>
							{ item.subMenu != undefined ? (
												<View  style={{ position: 'absolute', right: 0 }}	>
													<Icon
													  name= { this.state.selectedMenu.indexOf(item.name) > -1 ? 'chevron-small-down' : 'chevron-small-right' }
													  type='entypo'
													  size={20}
													  color={'#f05f40'}
													/>
												</View>
											) : (<View/>) 
							}
							
						</TouchableOpacity>
						<View style={{ paddingLeft:20 }} >
							{item.subMenu != undefined  && this.state.selectedMenu.indexOf(item.name) > -1 && item.subMenu.map( (subItem, subKey) => (
								<TouchableOpacity key={ subKey } style={styles.button} onPress={ () => this._action(subItem.name) } >
									<Icon
										raised
										name={ subItem.icon }
										type={ subItem.iconType }
										size={ subItem.iconSize }
										color={ subItem.iconColor }
									/>
									<Text style={styles.controlText} >{ this.Capitalize(subItem.name) }</Text>
								</TouchableOpacity>
							))}
					
						</View>		
					</View>		
				))}
			</ScrollView>
		</View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
	backgroundColor: 'white',
  },
  scrollContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    overflow:'hidden'
  },
  logo: {
	width:'90%',
    resizeMode: 'contain'
  },
  controlText: {
	lineHeight: '60@ms0.1',
    paddingLeft: 10,
  },
  button: {
	alignItems: 'center',
	flexDirection: 'row',	
    backgroundColor: 'white',
  },
})
