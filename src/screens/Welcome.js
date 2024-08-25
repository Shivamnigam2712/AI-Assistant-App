import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.Text1}>Jarvis</Text>
        <Text style={styles.Text2}>The Future is here, powered by AI</Text>
      </View>
      <View style={styles.AIView}>
        <Image style={styles.imagebot} source={require('../images/bot.png')} />
      </View>
      <TouchableOpacity style={styles.touchbtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Text1: {
    fontWeight: '700',
    color: 'grey',
    fontSize: wp(8),
    marginLeft: wp(20),
  },
  Text2: {
    fontSize: wp(5),
    color: 'lightgrey',
    fontWeight: '400',
  },
  AIView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: wp(20),
  },
  imagebot: {
    height: wp(80),
    width: hp(35),
  },
  touchbtn: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ccdcff',
    width: wp(80),
    height: wp(10),
  },
  btnText: {
    fontWeight: '600',
    marginHorizontal: wp(25),
    padding: wp(1),
    fontSize: wp(5),
  },
});
