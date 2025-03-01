import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import axios from 'axios';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const predefinedResponses = {
    "What should I eat during pregnancy?": "During pregnancy, focus on a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and dairy. Include foods high in iron, calcium, and folic acid. Avoid raw or undercooked foods, and limit caffeine intake.",
    "Is it normal to feel tired during pregnancy?": "Yes, feeling tired is common during pregnancy due to hormonal changes and increased energy demands. Make sure to get plenty of rest, eat a healthy diet, and stay hydrated.",
    "What are the signs of a medical emergency during pregnancy?": "If you experience severe abdominal pain, heavy bleeding, sudden swelling, severe headaches, or reduced fetal movement, contact your doctor or visit the nearest hospital immediately.",
    "How often should I visit the doctor during pregnancy?": "Typically, you should visit your doctor once a month during the first two trimesters, twice a month during the third trimester, and weekly as you approach your due date. However, follow your doctor's specific recommendations.",
  };

  const localResources = {
    "Find nearby hospitals": "Here are some hospitals in your area: \n1. ABC Hospital, Delhi \n2. XYZ Clinic, Mumbai \n3. PQR Maternity Center, Bangalore",
    "Find support groups": "You can join these support groups for pregnant women: \n1. Mom's Circle, Delhi \n2. Pregnancy Care Group, Mumbai \n3. Happy Moms, Bangalore",
  };

  const emergencyResponses = {
    "I have severe pain": "Please contact your doctor immediately or visit the nearest hospital. Severe pain could indicate a serious issue.",
    "I am bleeding heavily": "Heavy bleeding during pregnancy is a medical emergency. Go to the nearest hospital right away.",
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');

      try {
        const response = await getBotResponse(inputText, messages);
        const botMessage = { id: Date.now().toString(), text: response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching bot response:', error.response?.data || error.message);
        const errorMessage = { id: Date.now().toString(), text: 'Sorry, something went wrong. Please try again.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };
  const getBotResponse = async (query, chatHistory) => {
    if (predefinedResponses[query]) {
      return predefinedResponses[query];
    }
    if (localResources[query]) {
      return localResources[query];
    }
    if (emergencyResponses[query]) {
      return emergencyResponses[query];
    }
  
    const apiKey = 'r6H0r9mAApORRZgBIUJqgMT4I3EwYYpZtqOtyEKI';
    const url = 'https://api.cohere.ai/v1/chat';
  
    const customPrompt = `
      You are a friendly and empathetic chatbot designed to assist pregnant women in India.
      Your goal is to provide accurate, helpful, and culturally sensitive information about pregnancy.
      Always prioritize the user's health and well-being, and encourage them to consult a doctor for serious concerns.
  
      Guidelines:
      1. Provide clear and concise answers.
      2. Use simple language that is easy to understand.
      3. Be supportive and empathetic.
      4. For medical emergencies, advise the user to contact their doctor or visit the nearest hospital immediately.
  
      Chat History: ${chatHistory.map(msg => msg.text).join('\n')}
  
      User Question: ${query}
    `;
  
    const response = await axios.post(
      url,
      {
        message: customPrompt,
        model: 'command',
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
  
    let responseText = response.data.text;
  
    // Format the response for readability
    responseText = responseText.replace(/\. /g, '.\n\n'); // Add spacing after full stops
    responseText = responseText.replace(/, /g, ',\n'); // Slightly separate commas for clarity
    responseText = responseText.trim(); // Remove extra spaces
  
    return responseText;
  };
  

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    marginTop: '10%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFCDD2',
    borderWidth: 1,
    borderColor: '#FFB8C3',
    borderRadius: 20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFB8C3',
    borderTopWidth: 1,
    borderWidth: 2,
    borderColor: '#E57373',
    borderRadius: 20,
    color: 'white',
    padding: 10,
    minWidth: '90%',  // Ensures the message has a readable width
    maxWidth: '95%',  // Prevents overly wide messages
},
  messageText: {
    fontSize: 16,
    flexShrink: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#FFEBEE',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E57373',
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#fc5b73',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
