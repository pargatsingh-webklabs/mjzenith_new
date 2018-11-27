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
				alert(response.message);
				Actions.drawer();
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={ require('../../assets/images/logo-150x150.png')}
              style={styles.welcomeImage}
            />
          </View>
          
          <View style={styles.successContainer}>
            <Image
              source={ require('../../assets/images/check-circle.gif')}
              style={styles.successImage}
            />
          </View>
                    
          <View style={styles.successContainer}>
			<Text style={styles.successText} >Thanks for signing up</Text>
          </View>
          <View style={{ marginTop: 20}}>
			<Text style={styles.successSubText} > Please check your email in order to activate your account</Text>
          </View>
          <View style={styles.homeIcon}>
					<Icon
					  raised
					  name='home'
					  type='font-awesome'
					  size={20}
					  color={'#f05f40'}
					  onPress={() => Actions.Auth() }
					/>
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
		paddingTop: '20@ms2',
		marginBottom: 0,
	},

	successContainer: {
		alignItems: 'center',
		paddingTop: '10@ms10',
		marginBottom: 0,
	},	
	successImage: {
		width: '50%',
		resizeMode: 'contain',
		marginTop: 0,
		marginLeft: -10,
	},
	homeIcon: {
		paddingTop: '20@ms2',
		alignItems: 'center',
	},
	welcomeImage: {
		width: '100%',
		resizeMode: 'contain',
		marginTop: 0,
		marginLeft: -10,
	},	
	icon:{
		position:'absolute',
		right:20,
		bottom:20
	},
	successText:{
		textAlign: 'center', 
		fontWeight:'800',
		fontSize:22,
		color:'#232d49' 
	},
	successSubText:{
		textAlign: 'center', 
		fontWeight:'600',
		fontSize:16,
		color:'#232d49' 
	},	
	signUpSubText:{
		textAlign: 'center', 
		fontWeight:'900',
		fontSize:12,
		color:'#f05f40' 
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
