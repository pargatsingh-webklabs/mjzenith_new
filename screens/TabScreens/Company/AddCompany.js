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
import Constants from '../../../constants/Constants';
import { Actions } from 'react-native-router-flux';
import { addCompany, userCompany  } from '../../../API/Company';
import TopBar from '../../../components/TopBar';
 
export default class AddCompany extends React.Component {
  
	constructor(props) {
		super(props);
		this.state = { currentUser: [], CName: '', CDescription: '', editCompany: [] , loader: false };
	}
	
	componentDidMount = () =>{
		AsyncStorage.getItem('userData').then((value) => this.setState({ currentUser: JSON.parse(value) }) )
		if(this.props.CompanyId != undefined){
			
			var data = {};
			data.companyId = this.props.CompanyId
			
			userCompany(data).then(result => {
				this.setState({ editCompany: result.data });
				this.setState({ CName: this.state.editCompany.name, CDescription: this.state.editCompany.description });
			});
		}
	}

	
	submit =()=> {
	    if (!this.state.CName || !this.state.CDescription){ 
			alert('Please fill all fields');
			return false;
		}
		
		this.setState({loader:true});	
		
		var data = {} ;
		if(this.state.editCompany != '' ){
			data.id = this.state.editCompany.id;
		}
		
		data.user_id = this.state.currentUser.id;
		data.name = this.state.CName;
		data.description = this.state.CDescription;
		
		addCompany(data).then(response => {
			this.setState({loader:false});
			if(response.result == 'success'){
				Actions.ListCompanies();
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
        <ScrollView  contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={ false } >
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Company Name'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ CName:text })}
				value={ this.state.CName }
			  />
          </View>
          <View style={{ marginTop: 20}}>
			  <TextInput
				style={styles.input}
				placeholder='Company Description'
				placeholderTextColor="#767676" 				
				onChangeText={(text) => this.setState({ CDescription:text })}
				value={ this.state.CDescription }
			  />
          </View>
         
			<View style={{ marginTop: 50}}>
				<TouchableOpacity style={styles.button} onPress={ () => this.submit() } >
					<Text style={styles.btnText}>{ this.state.editCompany != '' ? 'Update' : 'Submit' }</Text>
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
		paddingTop: 30,
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
});
