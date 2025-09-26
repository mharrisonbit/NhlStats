import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Skater } from "../Models/NHLTeamStats";

export default function PlayerStatsScreen() {
  const route = useRoute();
  const params = (route as any).params as { stats?: Skater } | undefined;
  const stats = params?.stats;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: stats?.headshot || "" }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Games Played: {stats?.gamesPlayed ?? "N/A"}</Text>
      <Text>Goals: {stats?.goals ?? "N/A"}</Text>
      <Text>Points: {stats?.points ?? "N/A"}</Text>
      <Text>Game Winning Goals: {stats?.gameWinningGoals ?? "N/A"}</Text>
      <Text>Power Play Goals: {stats?.powerPlayGoals ?? "N/A"}</Text>
      <Text>Shorthanded Goals: {stats?.shorthandedGoals ?? "N/A"}</Text>
      <Text>Overtime Goals: {stats?.overtimeGoals ?? "N/A"}</Text>
      <Text>Shots: {stats?.shots ?? "N/A"}</Text>
      <Text>Shooting Percentage: {stats?.shootingPctg ?? "N/A"}</Text>
      <Text>Assists: {stats?.assists ?? "N/A"}</Text>
      <Text>Penalty Minutes: {stats?.penaltyMinutes ?? "N/A"}</Text>
      <Text>
        Avg Time On Ice Per Game: {stats?.avgTimeOnIcePerGame ?? "N/A"}
      </Text>
      <Text>Avg Shifts Per Game: {stats?.avgShiftsPerGame ?? "N/A"}</Text>
      <Text>Faceoff Win Percentage: {stats?.faceoffWinPctg ?? "N/A"}</Text>
      <Text>Plus/Minus: {stats?.plusMinus ?? "N/A"}</Text>
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
//  playerId?:            number;
//     headshot?:            string;
//     firstName?:           FirstName;
//     lastName?:            LastName;
//     positionCode?:        PositionCode;
//     gamesPlayed?:         number;
//     goals?:               number;
//     assists?:             number;
//     points?:              number;
//     plusMinus?:           number;
//     penaltyMinutes?:      number;
//     powerPlayGoals?:      number;
//     shorthandedGoals?:    number;
//     gameWinningGoals?:    number;
//     overtimeGoals?:       number;
//     shots?:               number;
//     shootingPctg?:        number;
//     avgTimeOnIcePerGame?: number;
//     avgShiftsPerGame?:    number;
//     faceoffWinPctg?:      number;
