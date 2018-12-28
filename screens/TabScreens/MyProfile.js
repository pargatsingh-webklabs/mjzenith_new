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
import { updateProfile, userDetail  } from '../../API/Authorization';
import TopBar from '../../components/TopBar';
 
export default class MyProfile extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = { currentUser: [], fName: '', lName: '', phone: '' , loader: false };
	}
	
	componentDidMount = () =>{
		var data = {};	
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) }) 
			
			data.id = this.state.currentUser.id;
			userDetail(data).then(result => {
				var userProfile = result.data;
				this.setState({ fName: userProfile.fname !='null' ? userProfile.fname : '', lName: userProfile.lname !='null' ? userProfile.lname : '', phone: userProfile.phone_no !='null' ? userProfile.phone_no : '' });
			});
			
		})
		
	}

	
	submit =()=> {
	    if (!this.state.fName || !this.state.lName){ 
			alert('Please fill all fields');
			return false;
		}
		
		this.setState({loader:true});	
		
		var data = {} ;
		
		data.id = this.state.currentUser.id;
		data.fname = this.state.fName;
		data.lname = this.state.lName;
		data.phone_no = this.state.phone;
		
		updateProfile(data).then(response => {
			this.setState({loader:false});
			if(response.result == 'success'){
				alert(response.message);
			}else if( response.result == 'error' ){
				alert(response.message);
			}else{
				alert('Something went wrong');
			}
		})
		.catch(response =>{
			this.setState({loader:false});
			alert(response);
		})
	}
	
  render() {
    return (
      <View style={styles.container}>
		<TopBar />
		<View >
            <Text style={styles.contentHeading}>My Profile</Text>
        </View>
        <ScrollView  contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={ false } >
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='First Name'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ fName:text })}
				value={ this.state.fName }
			  />
          </View>    
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Last Name'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ lName:text })}
				value={ this.state.lName }
			  />
          </View>    
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Phone Number'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ phone:text })}
				value={ this.state.phone }
				keyboardType = 'number-pad'
			  />
          </View>      

			<View style={{ marginTop: 50}}>
				<TouchableOpacity style={styles.button} onPress={ () => this.submit() } >
					<Text style={styles.btnText}>Update</Text>
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
