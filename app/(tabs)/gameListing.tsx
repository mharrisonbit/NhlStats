import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useGameListingViewModel from "../ViewModels/GameListingViewModel";

export default function GameListings() {
  const {
    isFocused,
    gameListings,
    fetchedRef,
    getListings,
    formatShowTimes,
    broadcastTapped,
  } = useGameListingViewModel();

  useEffect(() => {
    getListings();
  }, [isFocused, gameListings]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: 16 }}>
          {gameListings?.broadcasts?.length ? (
            gameListings.broadcasts.map((broadcast, idx) => (
              <View key={idx} style={styles.showListing}>
                <View style={{ marginBottom: 12 }}>
                  <Text>{broadcast.title}</Text>
                  <Text>{broadcast.description}</Text>
                  <Text>
                    {formatShowTimes(broadcast.startTime, broadcast.endTime)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text>Loading or no broadcasts found.</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  showListing: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
});
