import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon ,  List, ListItem} from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import { userNotify, userNotifyStatus } from '../../API/Notifications';
import TimeAgo from 'react-native-timeago';
import TopBar from '../../components/TopBar';

export default class Notifications extends React.Component {
  	constructor(props) {
		super(props);    
		this.state = { Notifications : [] , currentUser : [], refreshing: false, loader:false };	
	}
	
	componentDidMount = () =>{
		this.setState({ loader:true });
		AsyncStorage.getItem('userData').then((value) =>{ 	
			this.setState({ currentUser: JSON.parse(value) }) 
			this._listAll();
		})
	}
	
	_listAll = () =>{
		var data = {};
		data.user_id = this.state.currentUser.id;
		
		userNotify(data).then(result => {
			this.setState({ Notifications: result.data, loader:false })
		})
	}
	
	_onRefresh = () => {
		this._listAll();
	}
	
	_action = item =>{
		switch(item.type){
			case  'document':
				Actions.ListDocuments();
			break;
			default:
		}
	}
	
	_readNotification = item =>{
		var data = {};
		data.notifications_id = item.id;
		data.status = 1;
		userNotifyStatus(data).then((result) =>{
			this._action(item);
		})
		
	}
	
	_timeAgo = timestamp =>{
		var t = new Date(timestamp*1000);
		t.toISOString();
		return t;
	}
	
  render() {
    return (
     <View style={styles.container}>
		<TopBar />
		<View >
            <Text style={styles.contentHeading}>Notifications</Text>
        </View>
		<View style={styles.loderBackground}>
		  <ActivityIndicator
			color="#f05f40"
			size="large"
			animating={this.state.loader} />
		</View>
        <ScrollView 
			refreshControl={
			  <RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={this._onRefresh}
			  />
			}
				contentContainerStyle={styles.contentContainer}>
            <List>
              {
                this.state.Notifications != undefined && this.state.Notifications.map((item) => (
                  <TouchableOpacity   key={ item.id }  onPress={ () => this._readNotification(item) } >
                    <ListItem
					  containerStyle= {{ backgroundColor: item.status == 0 ? '#f2f2f2' : '#fff' }}
					  leftIcon ={
								<Icon
									iconStyle ={{ marginRight:10 }}
                                    name='file-document-outline'
                                    type='material-community'
                                    size={ 40 }
                                    color={'#f05f40'}
                                    
                                  />
						  }
                      titleStyle ={{ color:'#f05f40',fontSize:20,  fontWeight:'600' }}
                      title={ item.title }
                      subtitle={ 
								<View style={{ flexDirection: 'column' }} >
									<Text>{ item.content }</Text>
									<TimeAgo time={ this._timeAgo(item.created) } interval={20000} />
								</View>
					   }
                    />
                </TouchableOpacity>
                ))
              }
            </List>
     
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
		paddingLeft:20,
		paddingRight:20
	},
	loderBackground: {
		position:'absolute',
		right:0,
		left:0,
		bottom:0,
		top:100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentHeading: {
        paddingTop: 20,
        paddingBottom:0,
        textAlign:"center",
        fontSize:25,
        fontWeight:'600'
    },
});
