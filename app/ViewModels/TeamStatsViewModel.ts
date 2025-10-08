import RootStackParamList from "@/Navigation/navigation";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GameType } from "../Models/Enums";
import { NHLTeamStats } from "../Models/NHLTeamStats";

const useTeamStatsViewModel = (data?: NHLTeamStats) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const stats = data;


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
  
    const showPlayerDetails = (player: any, type: string): void => {
      navigation.navigate("Screens/PlayerStatsScreen", {
        skater: type === "skater" ? player : undefined,
        goalie: type === "goalie" ? player : undefined,
        title:
          player.firstName.default + " " + player.lastName.default || undefined,
      });
    };

    return {
        stats,
        formatSeason,
        formatGameType,
        showPlayerDetails,
    }
}

export default useTeamStatsViewModel;