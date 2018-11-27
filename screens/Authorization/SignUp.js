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
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from 'react-native-elements'
import { MonoText } from '../../components/StyledText';
import { Actions } from 'react-native-router-flux';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import { signUp } from '../../API/Authorization';

export default class SignUp extends React.Component {
  
  	constructor(props) {
		super(props);
		this.state = { email: '', password: '', company: '', hidePassword: true, loader: false , selectedRadio: '' };
	}
  
	managePasswordVisibility = () =>
	{
		this.setState({ hidePassword: !this.state.hidePassword });
	}
	
	userRegister =()=> {
	    if (!this.state.email || !this.state.password || !this.state.selectedRadio || (this.state.selectedRadio == 'company' && !this.state.company) ){ 
			alert('Please fill all fields');
			return false;
		}

		this.setState({loader:true});	
		
		var data = {} ;
		data.email = this.state.email;
		data.password = this.state.password;
		data.accounttype = this.state.selectedRadio;
		data.company_name = this.state.company;
		
		signUp(data).then(response => {
			this.setState({loader:false});
			if(response.result == 'success'){
				//alert(response.message);
				Actions.ThankYou();
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} >
          <View style={styles.welcomeContainer}>
            <Image
              source={ require('../../assets/images/logo-150x150.png')}
              style={styles.welcomeImage}
            />
          </View>
          <View style={{ marginTop: 50}}>
			  <TextInput
				style={styles.input}
				placeholder='Email'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({email:text})}
				value={this.state.email}
			  />
			  <Icon
			  containerStyle={styles.icon}
			  name='envelope-o'
			  type='font-awesome'
			  color='#51bbfc'
			  size={20}
			/>
          </View>
          
          <View style={{ marginTop: 10}}>
			<TextInput
				style={styles.input}
				placeholder='Password'
				placeholderTextColor="#767676" 
				onChangeText={(text) => this.setState({password:text})}
				value={this.state.password}
				secureTextEntry = { this.state.hidePassword }
			/>
			<Icon
				containerStyle={styles.icon}
				name={this.state.hidePassword ? 'eye' : 'eye-with-line' }
				type='entypo'
				onPress={this.managePasswordVisibility}
				color='#51bbfc'
				size={20}			  
			/>
			</View>
			<View style={{ marginTop: 10}} ><Text>Account type:</Text></View>
			<RadioGroup   
				size={24} 
				color='#51bbfc' 
				style={{ flexDirection: 'row' }}
				onSelect = {(index, value) => this.setState({selectedRadio : value })}
				 >
					<RadioButton value={'individual'}  color='#f05f40' style={ styles.radioBox } >
					  <Text>Individual</Text>
					</RadioButton>
					<RadioButton value={'company'}  color='#f05f40' style={ styles.radioBox } >
					  <Text>Company</Text>
					</RadioButton>
			</RadioGroup>
			
			{ this.state.selectedRadio == 'company' ? (
				<View style={{ marginTop: 10}}>
				<TextInput
					style={styles.input}
					placeholder='Company name'
					placeholderTextColor="#767676" 
					onChangeText={(text) => this.setState({ company:text })}
					value={this.state.company}
				/>
				</View>				
				) : (<View/>) }

			

			<View style={{ marginTop: 50}}>
				<TouchableOpacity style={styles.button} onPress={this.userRegister} >
					<Text style={styles.btnText}>Sign up</Text>
				</TouchableOpacity>
			</View>
			
			<View style={{ marginTop: 30}}>
			  <Text style={styles.signUpText} >Already have an account? <Text onPress={ () => Actions.SignIn() } style={styles.signUpSubText} >Sign In</Text></Text>
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
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:20,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 100,
		marginBottom: 20,
	},
	welcomeImage: {
		width: '100%',
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
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
	icon:{
		position:'absolute',
		right:20,
		bottom:20
	},
	forget:{
		textAlign: 'right', 
		fontWeight:'900',
		fontSize:12,
		color:'#232d49' 
	},
	signUpText:{
		textAlign: 'center', 
		fontWeight:'900',
		fontSize:12,
		color:'#232d49' 
	},
	signUpSubText:{
		textAlign: 'center', 
		fontWeight:'900',
		fontSize:12,
		color:'#f05f40' 
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
});
