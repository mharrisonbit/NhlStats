import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import TeamStatsCard from "../../components/ui/TeamStatsCard";
import { Scores } from "../Models/Scores";
import useGameDataViewModel from "../ViewModels/gameDataViewModel";

function GameDataScreen() {
  const route = useRoute();
  const params = (route as Scores)?.params ?? {};
  const { gameData } = useGameDataViewModel(params);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        {gameData && (
          <View style={styles.statMainContainer}>
            <TeamStatsCard team={gameData.teams?.home} gameData={gameData} />
            <TeamStatsCard team={gameData.teams?.away} gameData={gameData} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  statMainContainer: {
    flex: 1,
  },
});

export default GameDataScreen;
