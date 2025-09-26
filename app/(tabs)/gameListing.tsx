import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTodaysWatchInfo } from "../DataManager/DataManager";
import { NHLGameListing } from "../Models/NHLGameListing";

export default function GameListings() {
  const isFocused = useIsFocused();
  const [gameListings, setGameListings] = useState<NHLGameListing | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if ((isFocused && !fetchedRef.current) || gameListings === null) {
      fetchedRef.current = true;
      (async () => {
        const data = await getTodaysWatchInfo(
          new Date().toISOString().split("T")[0]
        );
        setGameListings(data);
      })();
    }
  }, [isFocused, gameListings]);

  const formatShowTimes = (
    start: Date | undefined,
    end: Date | undefined
  ): string => {
    if (!start || !end) return "N/A";
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: 16 }}>
          {gameListings?.broadcasts?.length ? (
            gameListings.broadcasts.map((broadcast, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text>{broadcast.title}</Text>
                <Text>{broadcast.description}</Text>
                <Text>
                  {formatShowTimes(broadcast.startTime, broadcast.endTime)}
                </Text>
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
