import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";
import Constants from "expo-constants";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const webViewRef = useRef(null);

  // Get OpenAI API Key securely
  const API_KEY = Constants.expoConfig.extra.openaiApiKey;

  // Function to fetch AI response from OpenAI
  const getBotResponse = async (text) => {
    if (!API_KEY) {
      console.error("OpenAI API Key is missing!");
      return "Error: Missing API key.";
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: text }],
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("OpenAI Error:", data.error);
        return "Error: Unable to get a response from OpenAI.";
      }

      return data.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
    } catch (error) {
      console.error("Fetch Error:", error);
      return "Error: Unable to connect to AI service.";
    }
  };

  const sendMessage = async (text) => {
    if (text.trim()) {
      const userMessage = { id: Date.now().toString(), text, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const responseText = await getBotResponse(text);
      const botMessage = { id: Date.now().toString(), text: responseText, sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      Speech.speak(responseText, { language: "en-IN", pitch: 1.2, rate: 0.6 });
    }
  };

  // Handle speech recognition result from WebView
  const handleSpeechResult = (event) => {
    const spokenText = event.nativeEvent.data;
    setInputText(spokenText);
    sendMessage(spokenText);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Speech Recognition WebView */}
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{
          html: `
            <html>
              <body>
                <script>
                  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                  recognition.lang = 'en-IN';
                  recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    window.ReactNativeWebView.postMessage(transcript);
                  };
                  function startListening() {
                    recognition.start();
                  }
                </script>
                <button onclick="startListening()" style="font-size: 20px;">🎤 Start Speaking</button>
              </body>
            </html>
          `,
        }}
        style={{ height: 50 }}
        onMessage={handleSpeechResult}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="Type a message..." />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(inputText)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFEBEE" },
  messageBubble: { maxWidth: "80%", padding: 10, borderRadius: 15, marginVertical: 5 },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#FFCDD2" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#FFB8C3" },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#FFEBEE" },
  input: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 20, marginRight: 10, backgroundColor: "white" },
  sendButton: { backgroundColor: "#fc5b73", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  sendButtonText: { color: "white", fontSize: 16 },
});

export default ChatbotScreen;
