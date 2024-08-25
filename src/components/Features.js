import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text1}>Features</Text>
      <View style={styles.featureBox}>
        <View style={styles.title}>
          <Image
            source={require('../images/OIP.jpeg')}
            style={{height: hp(4), width: wp(4)}}
          />
          <Text style={styles.textView}>ChatGPT</Text>
        </View>
        <Text style={styles.Discription}>
          ChatGPT is a sibling model to InstructGPT, which is trained to follow
          an instruction in a prompt and provide a detailed response.
        </Text>
      </View>
      <View style={styles.featureBox}>
        <View style={styles.title}>
          <Image
            source={require('../images/OIP.jpeg')}
            style={{height: hp(4), width: wp(4)}}
          />
          <Text style={styles.textView}>DALL-E</Text>
        </View>
        <Text style={styles.Discription}>
          DALL·E 2 is an AI system that can create realistic images and art from
          a description in natural language.
        </Text>
      </View>{' '}
      <View style={styles.featureBox}>
        <View style={styles.title}>
          <Image
            source={require('../images/OIP.jpeg')}
            style={{height: hp(4), width: wp(4)}}
          />
          <Text style={styles.textView}>smart AI</Text>
        </View>
        <Text style={styles.Discription}>
          artificial intelligence (AI), the ability of a digital computer or
          computer-controlled robot to perform tasks commonly associated with
          intelligent beings.{' '}
        </Text>
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    height: hp(60),
  },
  Text1: {
    fontSize: wp(6.5),
    fontWeight: '600',
    color: '#87952',
  },
  featureBox: {
    backgroundColor: '#8ab3ea',
    padding: 4,
    borderRadius: 25,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'black',
    width: wp(70),
    height: hp(10),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  textView: {
    fontSize: wp(4.8),
    fontWeight: '600',
    color: 'black',
  },
  Discription: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: 'grey',
  },
});
