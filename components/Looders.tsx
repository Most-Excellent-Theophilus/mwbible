import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function Looders() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request or any async operation
    setTimeout(() => setLoading(false), 3000); // Stop loading after 3 seconds
  }, []);

  return (
    <ThemedView
      style={{
        position: "absolute",
        top: "10%",
        display: "flex",

        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        opacity: 0.5,
        
      }}
    >
      <ThemedText>
        <ActivityIndicator size="large" color="#4d2600" />
      </ThemedText>
    </ThemedView>
  );
}
