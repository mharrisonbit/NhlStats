import ModalImage from "@/components/ui/ModalImage";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import usePlayerStatsViewModel from "../ViewModels/PlayerStatsViewModel";

export default function PlayerStatsScreen() {
  const route = useRoute();
  const { goalie, skater, positionName, imageUri } =
    usePlayerStatsViewModel(route);

  return (
    <View style={styles.container}>
      <ModalImage imageUri={imageUri} />
      {skater ? (
        <>
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
          <Text>Position: {positionName || skater.positionCode}</Text>
        </>
      ) : (
        <>
          <Text>Games Played: {goalie?.gamesPlayed ?? "N/A"}</Text>
          <Text>Games Started: {goalie?.gamesStarted ?? "N/A"}</Text>
          <Text>Points: {goalie?.points ?? "N/A"}</Text>
          <Text>Assists: {goalie?.assists ?? "N/A"}</Text>
          <Text>Goals: {goalie?.goals ?? "N/A"}</Text>
          <Text>Wins: {goalie?.wins ?? "N/A"}</Text>
          <Text>Losses: {goalie?.losses ?? "N/A"}</Text>
          <Text>Overtime Losses: {goalie?.overtimeLosses ?? "N/A"}</Text>
          <Text>
            Goals Against Average: {goalie?.goalsAgainstAverage ?? "N/A"}
          </Text>
          <Text>Goals Against: {goalie?.goalsAgainst ?? "N/A"}</Text>
          <Text>Time On Ice: {goalie?.timeOnIce ?? "N/A"}</Text>
          <Text>Penalty Minutes: {goalie?.penaltyMinutes ?? "N/A"}</Text>
          <Text>Save Percentage: {goalie?.savePercentage ?? "N/A"}</Text>
          <Text>Shutouts: {goalie?.shutouts ?? "N/A"}</Text>
          <Text>Saves: {goalie?.saves ?? "N/A"}</Text>
          <Text>Shots Against: {goalie?.shotsAgainst ?? "N/A"}</Text>
        </>
      )}
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
