import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from 'react-native-elements'
import Constants from '../../constants/Constants';
import { Actions } from 'react-native-router-flux';
import { updatePassword  } from '../../API/Authorization';
import TopBar from '../../components/TopBar';
 
export default class AccountSetting extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = { currentUser: [], oldPass: '', newPass: '', confirmPass: '' , loader: false };
	}
	
	componentDidMount = () =>{
		var data = {};	
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) }) 
		
		})
	}

	
	submit =()=> {
	    if (!this.state.oldPass || !this.state.newPass || !this.state.confirmPass){ 
			alert('Please fill all fields');
			return false;
		}
		
	    if (this.state.newPass != this.state.confirmPass){ 
			alert('New password and confirm password should be same.');
			return false;
		}
		
		this.setState({loader:true});	
		
		var data = {} ;
		
		data.id = this.state.currentUser.id;
		data.old_password = this.state.oldPass;
		data.new_password = this.state.newPass;
		data.confirm_new_password = this.state.confirmPass;
		
		updatePassword(data).then(response => {
			this.setState({loader:false});
			if(response.result == 'success'){
				alert(response.message);
				Actions.Main();
			}else if( response.result == 'error' ){
				alert(response.message);
			}else{
				alert('Something went wrong');
			}
		})
	}
	
  render() {
    return (
      <View style={styles.container}>
		<TopBar />
		<View >
            <Text style={styles.contentHeading}>Account Setting</Text>
        </View>
        <ScrollView  contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={ false } >
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Old Password'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ oldPass:text })}
				value={ this.state.oldPass }
				secureTextEntry ={true}
			  />
          </View>    
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='New Password'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ newPass:text })}
				value={ this.state.newPass }
				secureTextEntry ={true}
			  />
          </View>    
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Confirm Password'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ confirmPass:text })}
				value={ this.state.confirmPass }
				secureTextEntry ={true}
			  />
          </View>    
			<View style={{ marginTop: 50}}>
				<TouchableOpacity style={styles.button} onPress={ () => this.submit() } >
					<Text style={styles.btnText}>Change Password</Text>
				</TouchableOpacity>
			</View>
			
        </ScrollView>
        { this.state.loader === true ? (
			<View style={styles.loderBackground}>
			  <ActivityIndicator
				color="#f05f40"
				size="large"
				animating={this.state.loader} />
			</View>
		) : (<View />) }
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
	input:{
		backgroundColor:'white',
		height: 60, 
		borderColor: '#e7e8eb', 
		borderWidth: 1, 
		borderRadius:10,
		paddingLeft:20,
		fontWeight:'600'
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#f05f40',
		padding: 20,
		borderRadius:10,
		fontWeight:'600',
	},
	loderBackground: {
		position:'absolute',
		right:0,
		left:0,
		bottom:0,
		top:0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: { 
		color:'#fff',
		fontWeight: '700',
		fontSize:'14@ms0.3'
	},
	contentHeading: {
        paddingTop: 20,
        paddingBottom:0,
        textAlign:"center",
        fontSize:25,
        fontWeight:'600'
    },
});
