import CustomActivityIndicator from "@/components/ui/CustomActivityIndicator";
import InputWithButton from "@/components/ui/InputWithButton";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Scores } from "../Models/Scores";
import useScoresViewModel from "../ViewModels/ScoresViewModel";

export default function scores() {
  const [
    getScoresByDate,
    formatGameTime,
    showGameData,
    setDateString,
    isLoading,
    gameScores,
    dateString,
    dateForDisplay,
  ] = useScoresViewModel() as [
    () => Promise<Scores[]>,
    (dateString: string) => string,
    Scores,
    (value: string) => void,
    boolean,
    Scores[],
    string,
    string
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View>
          <InputWithButton
            value={dateString}
            onChangeText={setDateString}
            onPress={getScoresByDate}
            placeholder="Enter date (YYYY-MM-DD)"
            buttonTitle="Get Scores"
            disabled={isLoading}
          />
          <Text
            style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20 }}
          >
            {dateForDisplay}
          </Text>
          <View>
            {gameScores.length >= 1 &&
              gameScores?.map((scoresData, scoresIndex) =>
                scoresData?.games?.map((game, gameIndex) => (
                  <TouchableOpacity
                    onPress={() => showGameData(game)}
                    key={`${scoresIndex}-${gameIndex}-${
                      game.links?.gameCenter || game.teams?.home?.abbreviation
                    }-${game.teams?.away?.abbreviation}`}
                  >
                    <View style={styles.container}>
                      <Text style={styles.teamNames}>
                        {game.teams?.home?.teamName} vs{" "}
                        {game.teams?.away?.teamName}
                      </Text>
                      <Text style={styles.gameInfo}>
                        {formatGameTime(game.startTime)}
                      </Text>
                      <Text style={styles.gameInfo}>
                        {game.teams?.home?.abbreviation}:{" "}
                        {game.scores[game.teams?.home?.abbreviation]}-
                        {game.teams?.away?.abbreviation}:{" "}
                        {game.scores[game.teams?.away?.abbreviation]}
                      </Text>
                      {/* <Separator /> */}
                    </View>
                  </TouchableOpacity>
                ))
              )}
          </View>
        </View>
        <CustomActivityIndicator visible={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  teamNames: {
    fontWeight: "bold",
    fontSize: 20,
  },
  gameInfo: {
    fontSize: 15,
  },
});
