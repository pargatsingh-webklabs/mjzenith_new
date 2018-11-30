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
import { MonoText } from '../../components/StyledText';
import Constants from '../../constants/Constants';
import { Actions } from 'react-native-router-flux';
import { signIn } from '../../API/Authorization';

export default class SignIn extends React.Component {

	constructor(props) {
		super(props);
		this.state = { email: '', password: '', hidePassword:true,loader:false };
	}

	static navigationOptions = {
		header: null,
	};

	managePasswordVisibility = () =>
	{
		this.setState({ hidePassword: !this.state.hidePassword });
	}

	userLogin =()=> {
	    if (!this.state.email || !this.state.password){
			alert('Please fill all fields');
			return false;
		}

		this.setState({loader:true});

		var data = {} ;
		data.email = this.state.email;
		data.password = this.state.password;

		signIn(data).then(response => {
			this.setState({loader:false});
			if(response.result == 'success'){
				
				if(response.data.accounttype == 'individual'){
					response.menus.splice(response.menus.indexOf(response.menus[1]), 1);
				}
				
				AsyncStorage.setItem('userData', JSON.stringify(response.data));
				AsyncStorage.setItem('menus', JSON.stringify(response.menus));
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={ false } >
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
			<View style={{ marginTop: 15}}>
			  <Text style={styles.forget} onPress={() => Actions.ForgetPass()} >Forget Password ? </Text>
			</View>

			<View style={{ marginTop: 50}}>
				<TouchableOpacity style={styles.button} onPress={ () => this.userLogin() } >
					<Text style={styles.btnText}>Sign in</Text>
				</TouchableOpacity>
			</View>

			<View style={{ marginTop: 30}}>
			  <Text style={styles.signUpText} >Don't have an account? <Text onPress={() => Actions.SignUp()} style={styles.signUpSubText} >Sign Up</Text></Text>
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
