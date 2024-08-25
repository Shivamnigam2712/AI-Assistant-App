import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import {dummyMessages} from '../constants/Dummy';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [messages, setMassages] = useState([]);
  const [record, setRecord] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ScrollViewref = useRef();

  const speechStartHandler = e => {
    console.log('speech start handler');
  };
  const speechEndHandler = e => {
    setRecord(false);
    console.log('speech end handler');
  };
  const speechResultHandler = e => {
    console.log('voice event:', e);
    const text = e.value[0];
    setResult(text);
  };
  const speechErrortHandler = e => {
    console.log('speech error handler', e);
  };

  const startRecording = async () => {
    setRecord(true);
    Tts.stop();

    try {
      await Voice.start('en-GB');
    } catch (error) {
      console.log('error:', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecord(false);
      fetchResponse();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const fetchResponse = () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMassages([...newMessages]);
      updateScrollView();
      setLoading(true);

      apiCall(result.trim(), newMessages).then(res => {
        // console.log('got api data:', res);
        if (res.success) {
          setMassages([...res.data]);
          updateScrollView();
          setResult('');
          startTextToSpeech(res.data[res.data.length - 1]);
        } else {
          Alert.alert('Error', res.msg);
        }
      });
    }
  };

  const startTextToSpeech = message => {
    if (message.content.includes('https')) {
      setSpeaking(true);
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewref?.current?.scrollToEnd({animated: true});
    }, 200);
  };

  const clear = () => {
    setMassages([]);
    Tts.stop();
  };
  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrortHandler;

    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    );
    Tts.addEventListener('tts-finish', event => {
      console.log('finish', event);
      setSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SafeView}>
        <View style={styles.InSafeView}>
          <Image
            source={require('../images/bot.png')}
            style={{
              height: hp(18),
              width: hp(15),
            }}
          />
        </View>
        {messages.length > 0 ? (
          <View style={styles.massagesContaier}>
            <Text style={styles.textMassage}>Assitant</Text>
            <View style={styles.allTextMassages}>
              <ScrollView
                ref={ScrollViewref}
                style={styles.ScrollItem}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      return (
                        <View key={index} style={styles.imageView}>
                          <View style={styles.subImageView}>
                            <Image
                              source={{uri: message.content}}
                              style={styles.ImageStyle}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View style={styles.subIndex} key={index}>
                          <Text>{message.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    return (
                      <View key={index} style={styles.indexView}>
                        <View style={styles.subIndex}>
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
            <View></View>
          </View>
        ) : (
          <Features />
        )}
        <View style={styles.btnView}>
          {messages.length > 0 && (
            <TouchableOpacity style={styles.clearContainer} onPress={clear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
          {loading ? (
            <Image
              source={require('../images/loading.png')}
              style={styles.recordImage}
            />
          ) : record ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                source={require('../images/recording.jpeg')}
                style={styles.recordImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={require('../images/record.jpeg')}
                style={styles.recordImage}
              />
            </TouchableOpacity>
          )}

          {speaking && (
            <TouchableOpacity
              style={styles.stopContainer}
              onPress={stopSpeaking}>
              <Text style={styles.clearText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ' #ffddcc',
  },
  SafeView: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  InSafeView: {
    flexDirectionj: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  massagesContaier: {
    marginVertical: 7,
    flex: 1,
    padding: 5,
  },
  textMassage: {
    color: 'grey',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: wp(7),
    margin: 5,
  },
  allTextMassages: {
    height: hp(60),
    borderRadius: 30,
    padding: 5,

    backgroundColor: '#ff661a',
  },
  ScrollItem: {
    marginVertical: 5,
  },
  indexView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subIndex: {
    width: wp(75),
    backgroundColor: ' #4d1a00',
    borderRadius: 20,
    padding: 7,
    margin: 2,
    height: wp(10),
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  subImageView: {
    padding: 4,
    borderRadius: 25,
  },
  ImageStyle: {
    // borderRadius: 20,
    resizeMode: 'contain',
    height: wp(10),
    width: wp(10),
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recordImage: {
    borderRadius: 20,
  },
  recordImage: {
    height: hp(10),
    width: hp(10),
  },
  clearContainer: {
    backgroundColor: '#778899',
    borderRadius: 30,
    height: hp(5),
    width: hp(10),
    margin: 20,
  },
  clearText: {
    color: 'white',
    fontWeight: '600',
    padding: 5,
    marginLeft: 10,
  },
  stopContainer: {
    backgroundColor: '#778899',
    borderRadius: 30,
    height: hp(5),
    width: hp(10),
    margin: 20,
  },
});
