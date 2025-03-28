import "dotenv/config";

export default {
  expo: {
    name: "w_care",
    slug: "w_care",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.wcare.app"
    },
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY // ✅ Loads from .env
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    permissions: ["CAMERA", "MEDIA_LIBRARY"]
  }
};
