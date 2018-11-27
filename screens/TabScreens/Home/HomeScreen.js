import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import {Actions, DefaultRenderer} from 'react-native-router-flux';

import TopBar from '../../../components/TopBar';

export default class HomeScreen extends React.Component {
  	constructor(props) {
		super(props);
	}
   //~ componentDidMount = () => AsyncStorage.getItem('userData').then((value) => console.log(value))
  render() {
    return (
     <View style={styles.container}>
		<TopBar />
        <ScrollView  contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={ require('../../../assets/images/logo-150x150.png')}
              style={styles.welcomeImage}
            />
          </View>
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
    paddingTop: 30,
	paddingLeft:20,
	paddingRight:20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: '80%',
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },

});
