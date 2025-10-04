import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePlayerStatsViewModel from "../ViewModels/PlayerStatsViewModel";

export default function PlayerStatsScreen() {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const { goalie, skater, positionName, imageUri } =
    usePlayerStatsViewModel(route);

  const renderImage = () => (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalBackground}
        >
          <Image
            source={{ uri: imageUri }}
            style={styles.modalImage}
            contentFit="contain"
          />
        </Pressable>
      </Modal>
    </>
  );

  return (
    <View style={styles.container}>
      {renderImage()}
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});
