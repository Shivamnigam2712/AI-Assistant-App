import axios from 'react-native-axios';
const {apiKey} = require('../constants/Dummy');

const client = axios.create({
  headers: {
    Authorization: 'Bearer' + apiKey,
    'content-Type': 'application/json',
  },
});

const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndPoint = 'https://api.openai.com/v1/images/generations';
export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'user',
          content:
            'Does this message want to generate an AI picture, image , art or anything similar? ${prompt}. Simply answer with yes or no.',
        },
      ],
    });

    // console.log('data:', res.data.choices[0].message);
    let isArt = res.data?.choices[0]?.message.content;
    if ((isArt = toLowerCase().includes('yes'))) {
      console.log('dalle api call');
      return dalleApiCall(prompt, messages || []);
    } else {
      console.log('chat gpt api call');
      return chatgptApiCall(prompt, messages || []);
    }
  } catch (error) {
    console.log('error', err);
    return Promise.resolve({success: false, msg: err.messages});
  }
};

const chatgptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-3.5-turbo-1106',
      messages,
    });

    let answer = res.data?.choices[0]?.message.content;
    messages.push({role: 'assistant', content: answer.trim()});
    return Promise.resolve({success: true, data: messages});
  } catch (err) {
    console.log('error', err);
    return Promise.resolve({success: false, msg: err.messages});
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndPoint, {
      prompt,
      n: 1,
      size: '512 x 512',
    });

    let url = res?.data?.data[0]?.url;
    console.log('got url of the image:', url);
    messages.push({role: 'assistant', content: url});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.log('error', err);
    return Promise.resolve({success: false, msg: err.messages});
  }
};
