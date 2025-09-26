import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/themed-view";
import Separator from "@/components/ui/Separator";
import TrackerButton from "@/components/ui/TrackerButton";
import { usePopup } from "@/components/ui/usePopup";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGlossaryInfo } from "../DataManager/DataManager";
import { NHLGlossary } from "../Models/NHLGlossary";

export default function TabTwoScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();
  const [glossary, setGlossary] = useState<NHLGlossary | null>(null);
  const [searchText, onChangeText] = useState("");
  const fetchedRef = useRef(false);
  const { showPopup } = usePopup();

  useEffect(() => {
    if (isFocused && !fetchedRef.current && !glossary) {
      fetchedRef.current = true;
      (async () => {
        const data = await getGlossaryInfo();
        if (data) setGlossary(data);
      })();
    }
  }, [isFocused, glossary]);

  const searchGlossary = (query: string) => {
    if (!glossary || !query.trim()) {
      alert("Please enter a search term.");
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = glossary.data.filter(
      (item: any) =>
        item.fullName.toLowerCase().includes(lowerQuery) ||
        item.abbreviation.toLowerCase().includes(lowerQuery) ||
        item.definition.toLowerCase().includes(lowerQuery)
    );
    if (results.length === 0) {
      alert("No results found.");
    } else {
      const result = results[0];
      let foundItemIndex = glossary.data.findIndex(
        (i: any) => i.id === result.id
      );
      if (foundItemIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: foundItemIndex * 28, // Assuming each item is approximately 40px tall
          animated: true,
        });
      }
      showPopup({
        title: `${result.abbreviation} • ${result.fullName}`,
        message: result.definition,
        buttons: [{ text: "Close" }],
      });
      onChangeText("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.searchField}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={searchText}
        />
        <TrackerButton
          buttonStyle={styles.searchButton}
          title="search"
          onPress={() => {
            searchGlossary(searchText);
          }}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.info}>
            {glossary &&
              glossary.data.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    showPopup({
                      title: `${item.abbreviation} • ${item.fullName}`,
                      message: item.definition,
                      buttons: [{ text: "Close" }],
                    })
                  }
                >
                  <Text>
                    {item.abbreviation}: {item.fullName}
                  </Text>
                  <Separator />
                </TouchableOpacity>
              ))}
          </Text>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  titleContainer: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "70%",
  },
  searchButton: {
    width: "30%",
  },
  searchField: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    paddingRight: 35,
    width: "100%",
  },
});
