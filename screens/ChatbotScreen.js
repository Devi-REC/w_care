import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Buffer } from "buffer"; // Ensure Buffer is imported for binary data handling

const AZURE_TTS_KEY = "608ePpZ3dO5We0KVf71mt7ANWwo1T2PEpwQ6bpAO4Fue1r52Ljl5JQQJ99BCACYeBjFXJ3w3AAAYACOGUbQK"; // 🔴 Replace with your Azure API Key
const AZURE_TTS_ENDPOINT = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";

const TTSApp = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const getTTS = async (text) => {
    try {
      const response = await fetch(AZURE_TTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "Ocp-Apim-Subscription-Key": AZURE_TTS_KEY,
          "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        },
        body: `
          <speak version='1.0' xml:lang='en-US'>
            <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
              ${text}
            </voice>
          </speak>`,
      });

      if (!response.ok) throw new Error("Azure TTS API request failed");

      const audioData = await response.arrayBuffer();
      return Buffer.from(audioData).toString("base64"); // Convert to base64 for playback
    } catch (error) {
      console.error("TTS Error:", error);
      return null;
    }
  };

  const playTTS = async () => {
    if (!text.trim()) return;

    setIsPlaying(true);
    const audioBase64 = await getTTS(text);
    if (!audioBase64) {
      setIsPlaying(false);
      return;
    }

    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri: `data:audio/mp3;base64,${audioBase64}` });
      await sound.playAsync();
    } catch (error) {
      console.error("Audio Playback Error:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Azure TTS Demo</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to speak..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={playTTS} disabled={isPlaying}>
        <Text style={styles.buttonText}>{isPlaying ? "Speaking..." : "Play Speech"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#D32F2F",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E57373",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#fc5b73",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TTSApp;
