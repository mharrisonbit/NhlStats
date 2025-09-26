import { ThemedView } from "@/components/themed-view";
import RootStackParamList from "@/Navigation/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTeamById } from "../DataManager/DataManager";
import { GameType } from "../Models/Enums";
import { NHLTeamStats } from "../Models/NHLTeamStats";

export default function TeamStatsScreen() {
  const route = useRoute();
  const params = (route as any).params as { stats?: NHLTeamStats } | undefined;
  const stats = params?.stats;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const formatSeason = (): string => {
    if (!stats?.season || stats.season.length !== 8) {
      return "N/A";
    }

    const startYear = stats.season.substring(0, 4);
    const endYear = stats.season.substring(4);
    return `${startYear}-${endYear}`;
  };

  const formatGameType = (): string => {
    if (!stats?.gameType) {
      return "N/A";
    }
    return GameType[stats.gameType] || "Unknown";
  };

  const showGoalieDetails = (goalie: any): void => {
    alert(
      `Goalie: ${goalie.firstName?.default + goalie.lastName?.default}\n` +
        `Games: ${goalie.games}, Wins: ${goalie.wins}, Losses: ${goalie.losses}\n` +
        `Goals Against Average: ${goalie.goalsAgainstAverage}, Save Percentage: ${goalie.savePercentage}`
    );
  };

  const showPlayerDetails = (player: any): void => {
    navigation.navigate("Screens/PlayerStatsScreen", {
      stats: player,
      title:
        player.firstName.default + " " + player.lastName.default || undefined,
    });
  };

  const getSomeStats = async () => {
    if (!stats?.gameType || !stats?.season) {
      console.warn("Missing gameType or season, skipping getTeamById");
      return;
    }
    let results = await getTeamById(stats.gameType, stats.season);
    console.log("Fetched team by ID:", results);
  };

  if (!stats) {
    return (
      <ThemedView>
        <Text>No stats provided.</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* <Button title="Press me" onPress={() => getSomeStats()} /> */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Season: {formatSeason()}</Text>
        <Text style={styles.subtitle}>Game type: {formatGameType()}</Text>
        <Text style={styles.sectionTitle}>
          Skaters ({stats.skaters ? stats.skaters.length : 0})
        </Text>
        {stats.skaters?.map((sk) => (
          <TouchableOpacity
            key={String(sk.playerId)}
            onPress={() => showPlayerDetails(sk)}
          >
            <View key={String(sk.playerId)} style={styles.item}>
              <Text style={styles.itemName}>
                {(sk.firstName?.default ?? "") +
                  " " +
                  (sk.lastName?.default ?? "")}
              </Text>
              <Text style={styles.itemStat}>
                Goals: {sk.goals ?? 0} Assists: {sk.assists ?? 0}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>
          Goalies ({stats.goalies ? stats.goalies.length : 0})
        </Text>
        {stats.goalies?.map((g) => (
          <TouchableOpacity
            key={String(g.playerId)}
            onPress={() => showGoalieDetails(g)}
          >
            <View key={String(g.playerId)} style={styles.item}>
              <Text style={styles.itemName}>
                {(g.firstName?.default ?? "") +
                  " " +
                  (g.lastName?.default ?? "")}
              </Text>
              <Text style={styles.itemStat}>
                Saves: {g.saves ?? 0} Save %: {g.savePercentage ?? 0}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  playerButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
  },
  itemStat: {
    fontSize: 13,
    color: "#444",
  },
});
