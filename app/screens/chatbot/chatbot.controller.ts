import { useState, useEffect, useCallback, useRef } from "react";
import { Linking, Platform, ScrollView } from "react-native";
import MapView from "react-native-maps";
import { useChatbotUseCase } from "./chatbot.usecase";

const useChatbotController = (userId: string) => {
  const { chatState, handleSendMessage } = useChatbotUseCase(userId);
  const mapRef = useRef<MapView>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [today, setToday] = useState<string>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shortToday = new Date().toLocaleString("pt", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });

    setToday(shortToday.charAt(0).toUpperCase() + shortToday.slice(1));
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current?.animateCamera({
        center: region,
        pitch: 65,
        heading: 90,
        altitude: 1000,
        zoom: 15,
      });
    }
    scrollViewRef.current?.scrollToEnd();
  }, []);

  const region = {
    latitude: -18.91229011548046,
    longitude: -48.274014322977926,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const scheme = Platform.select({
    ios: "maps://0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${region.latitude},${region.longitude}`;
  const label = "TODO: Aqui vai o nome do hospital ou da clínica";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const handleOpenOnMaps = useCallback(() => {
    Linking.openURL(url as string);
  }, []);

  const onSendMessage = useCallback(() => {
    if (message.trim()) {
      handleSendMessage(message);
      setMessage("");
    }
  }, [handleSendMessage, setMessage]);

  const handleSelectOption = useCallback(
    (option: string) => {
      if (option.trim()) {
        handleSendMessage(option);
        setMessage("");
      }
    },
    [handleSendMessage, setMessage]
  );

  return {
    region,
    today,
    handleOpenOnMaps,
    mapRef,
    scrollViewRef,
    onSendMessage,
    chatState,
    handleSelectOption,
    message,
    setMessage,
  };
};

export default useChatbotController;
