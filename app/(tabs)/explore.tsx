import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/themed-view";
import InputWithButton from "@/components/ui/InputWithButton";
import Separator from "@/components/ui/Separator";
import { SafeAreaView } from "react-native-safe-area-context";
import useExploreViewModel from "../ViewModels/ExploreViewModel";

export default function TabTwoScreen() {
  const {
    searchGlossary,
    onChangeText,
    showPopup,
    getData,
    glossary,
    isFocused,
    scrollViewRef,
    searchText,
    isLoading,
  } = useExploreViewModel();

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ActivityIndicator hidesWhenStopped={true} animating={isLoading} />
      <View style={styles.searchField}>
        <InputWithButton
          value={searchText}
          onChangeText={onChangeText}
          onPress={() => {
            searchGlossary(searchText);
          }}
          placeholder="Ctry"
          buttonTitle="search"
          disabled={isLoading}
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
