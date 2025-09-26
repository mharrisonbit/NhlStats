import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PopupButton = {
  text: string;
  onPress?: () => void;
  style?: object;
};

type PopupProps = {
  visible: boolean;
  title?: string;
  message?: string;
  buttons?: PopupButton[];
  onRequestClose?: () => void;
};

export default function Popup({
  visible,
  title,
  message,
  buttons = [],
  onRequestClose,
}: PopupProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.buttonRow}>
            {buttons.map((b, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.button, b.style]}
                onPress={() => {
                  b.onPress?.();
                }}
              >
                <Text style={styles.buttonText}>{b.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  message: { fontSize: 14, color: "#333", marginBottom: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
