import React from 'react';
import { StyleSheet, View, AsyncStorage, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { WebBrowser } from 'expo';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Constants from '../../../constants/Constants';
import TopBar from '../../../components/TopBar';

export default class HomeScreen extends React.Component {
  constructor(props) {
		super(props);
		this.state  = { currentUser : [], refreshing : false, loader : false  };
    var {Platform} = React
  }

  componentDidMount = () =>{
		AsyncStorage.getItem('userData').then((value) =>{
			this.setState({ currentUser: JSON.parse(value) })
      var userId    = this.state.currentUser.id;
      var companyId = this.state.currentUser.company_id;
  		companyId     = (companyId=="" || companyId==null)?'0':companyId;
      var url       = Constants.BASEURL+'uploadfile/?user_id='+userId+'&company_id='+companyId;
      var result    = WebBrowser.openBrowserAsync(url);
      if(result){
          Actions.HomeScreen();

      }
		})
	}

  render() {
    return (
     <View style={styles.container}>
		   <TopBar />
      </View>
    );
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	}
});
