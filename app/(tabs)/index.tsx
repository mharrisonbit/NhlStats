import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import CustomActivityIndicator from "@/components/ui/CustomActivityIndicator";
import Separator from "@/components/ui/Separator";
import TrackerButton from "@/components/ui/TrackerButton";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useIndexViewModel from "../ViewModels/IndexViewModel";

export default function HomeScreen() {
  const {
    getTeamsforList,
    buildTeamsList,
    getTeamInfo,
    isLoading,
    isFocused,
    currentTeams,
  } = useIndexViewModel();

  useEffect(() => {
    getTeamsforList();
  }, [isFocused]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <View style={styles.stepContainer}>
          <TrackerButton
            title="Get all the teams"
            onPress={() => buildTeamsList()}
          />
          {currentTeams?.data?.map((team) => (
            <React.Fragment key={team.id + (team.triCode || "")}>
              <TouchableOpacity
                onPress={(item) => getTeamInfo(team)}
                style={styles.teamListing}
              >
                <View style={styles.teamButton}>
                  <Text>{team.fullName}</Text>
                  <Text>More Info</Text>
                </View>
                <Separator color="#000" thickness={2} width="80%" />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </ThemedView>
      <CustomActivityIndicator overlay visible={isLoading} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {},
  stepContainer: {},
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  teamListing: {},
  teamButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 8,
  },
});
