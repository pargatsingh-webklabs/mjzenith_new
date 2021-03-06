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
  ActivityIndicator,
} from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import Constants from '../constants/Constants';
import { clearUserToken } from '../API/Authorization';

import ModalDropdown from 'react-native-modal-dropdown';

export default class Menus extends React.Component {

	constructor(props) {
		super(props);
		this.state = { selectedMenu : [], menus : [] , currentUser : [] , dropDown : false, loader: false };
		this.menus = Constants.MENUS;

		this.options = ['My Profile', 'Account Setting', 'Switch Company'];
	}

	componentDidMount = () => {

		AsyncStorage.getItem('menus').then((value) =>{
			this.setState({ menus: JSON.parse(value) })
		})

		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })
			if(this.state.currentUser.accounttype == 'individual'){
				if (this.options.indexOf('Switch Company') > -1) {
					this.options.splice(this.options.indexOf('Switch Company'), 1);
				}
			}
			 this.setState({ currentUser: JSON.parse(value) })
		 })

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
			case  'list_company':
				Actions.ListCompanies();
			break;
			case  'add_company':
				Actions.AddCompany();
			break;
			case  'list_attachments':
				Actions.ListAttachments();
			break;
			case  'upload_attachments':
				Actions.UploadAttachment();
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
				this.setState({loader:true});
				clearUserToken(this.state.currentUser).then((value) =>{
					AsyncStorage.clear();
					this.setState({loader:false});
					Actions.Auth();
				});
			break;
			case  'My Profile':
				Actions.MyProfile();
			break;
			case  'Account Setting':
				Actions.AccountSetting();
			break;
			case  'Switch Company':
				Actions.SwitchCompany();
			break;
			case  'WebView':
				Actions.WebViewPage();
			break;
			default:
				alert('Something went wrong');
		}
	}

	dropDown = () =>{
		alert('show');
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
			<View style={{  alignItems:'center', marginTop:10 }}>

				<ModalDropdown
					dropdownStyle={ styles.dropdown }
					dropdownTextStyle={{ textAlign: 'center',  fontSize: 14 ,color: '#000' }}
					options={ this.options }
					onDropdownWillShow = { () => this.setState({ dropDown : true }) }
					onDropdownWillHide = { () => this.setState({ dropDown : false }) }
					onSelect = { (idx, value) => this._action(value) }

				>
					<View  style={{ flexDirection: 'row', marginTop:10 }} 	>
						<Text style={{ fontSize: 18, fontWeight: '700' }} > { this.state.currentUser.fname && this.state.currentUser.lname  ? this.state.currentUser.fname+' '+this.state.currentUser.lname : this.state.currentUser.email }</Text>
						<Icon
							name= { this.state.dropDown ? 'arrow-drop-up' : 'arrow-drop-down' }
							type='materialIcons'
							size={20}
							color={'#f05f40'}
						/>
					</View >
				</ModalDropdown>

			</View>

			<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={ false } >
				{ this.state.menus != undefined &&  this.state.menus.map( (item, key) => (
					this.state.currentUser.accounttype == 'individual' && item.name == 'company' ? null :
					<View key={ key } >
						<TouchableOpacity  style={styles.button} onPress={ () => item.subMenu == undefined ? this._action(item.slug) : this._selectedMenu(item.slug) } >
							<Icon
							  raised
							  name={ item.icon }
							  type={ item.iconType }
							  size={ item.iconSize }
							  color={ item.iconColor }
							/>
							<Text style={styles.controlText} >{ item.name }</Text>
							{ item.subMenu != undefined ? (
												<View  style={{ position: 'absolute', right: 0 }}	>
													<Icon
													  name= { this.state.selectedMenu.indexOf(item.slug) > -1 ? 'chevron-small-down' : 'chevron-small-right' }
													  type='entypo'
													  size={20}
													  color={'#f05f40'}
													/>
												</View>
											) : (<View/>)
							}

						</TouchableOpacity>
						<View style={{ paddingLeft:20 }} >
							{item.subMenu != undefined  && this.state.selectedMenu.indexOf(item.slug) > -1 && item.subMenu.map( (subItem, subKey) => (
								<TouchableOpacity key={ subKey } style={styles.button} onPress={ () => this._action(subItem.slug) } >
									<Icon
										raised
										name={ subItem.icon }
										type={ subItem.iconType }
										size={ subItem.iconSize }
										color={ subItem.iconColor }
									/>
									<Text style={styles.controlText} >{ subItem.name }</Text>
								</TouchableOpacity>
							))}

						</View>
					</View>
				))}
			</ScrollView>
			{ this.state.loader === true ? (
				<View style={styles.loderBackground}>
				  <ActivityIndicator
					color="#f05f40"
					size="large"
					animating={this.state.loader} />
					<Text>Please wait</Text>
				</View>):null
			}
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
	width:'80%',
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
  dropdown: {
	width:150,
	height:'auto',
  },
  loderBackground: {
	position:'absolute',
	right:30,
	bottom:0,
	top:0,
	alignItems: 'center',
	justifyContent: 'center',
  },
})
