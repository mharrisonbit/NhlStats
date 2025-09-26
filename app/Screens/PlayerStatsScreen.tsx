import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Goalie, Skater } from "../Models/NHLTeamStats";

export default function PlayerStatsScreen() {
  const route = useRoute();
  const params = (route as any).params as
    | { skater?: Skater; goalie?: Goalie; title?: string }
    | undefined;
  const skater = params?.skater ?? null;
  const goalie = params?.goalie ?? null;

  console.log("goalie", goalie);
  console.log("skater", skater);

  return skater ? (
    <View style={styles.container}>
      <Image
        source={{ uri: skater?.headshot || "" }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Games Played: {skater?.gamesPlayed ?? "N/A"}</Text>
      <Text>Goals: {skater?.goals ?? "N/A"}</Text>
      <Text>Points: {skater?.points ?? "N/A"}</Text>
      <Text>Game Winning Goals: {skater?.gameWinningGoals ?? "N/A"}</Text>
      <Text>Power Play Goals: {skater?.powerPlayGoals ?? "N/A"}</Text>
      <Text>Shorthanded Goals: {skater?.shorthandedGoals ?? "N/A"}</Text>
      <Text>Overtime Goals: {skater?.overtimeGoals ?? "N/A"}</Text>
      <Text>Shots: {skater?.shots ?? "N/A"}</Text>
      <Text>Shooting Percentage: {skater?.shootingPctg ?? "N/A"}</Text>
      <Text>Assists: {skater?.assists ?? "N/A"}</Text>
      <Text>Penalty Minutes: {skater?.penaltyMinutes ?? "N/A"}</Text>
      <Text>
        Avg Time On Ice Per Game: {skater?.avgTimeOnIcePerGame ?? "N/A"}
      </Text>
      <Text>Avg Shifts Per Game: {skater?.avgShiftsPerGame ?? "N/A"}</Text>
      <Text>Faceoff Win Percentage: {skater?.faceoffWinPctg ?? "N/A"}</Text>
      <Text>Plus/Minus: {skater?.plusMinus ?? "N/A"}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Image
        source={{ uri: goalie?.headshot || "" }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Games: {goalie?.games ?? "N/A"}</Text>
      <Text>Wins: {goalie?.wins ?? "N/A"}</Text>
      <Text>Losses: {goalie?.losses ?? "N/A"}</Text>
      <Text>Goals Against Average: {goalie?.goalsAgainstAverage ?? "N/A"}</Text>
      <Text>Save Percentage: {goalie?.savePercentage ?? "N/A"}</Text>
      <Text>Shutouts: {goalie?.shutouts ?? "N/A"}</Text>
      <Text>Saves: {goalie?.saves ?? "N/A"}</Text>
      <Text>Shots Against: {goalie?.shotsAgainst ?? "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
