import { Goalie, NHLTeamStats, Skater } from "@/app/Models/NHLTeamStats";
import { Scores } from "@/app/Models/Scores";

// Central place for navigation param types so screens can import them.
export type RootStackParamList = {
  "Screens/TeamStatsScreen": { stats: NHLTeamStats; title?: string };
  "Screens/PlayerStatsScreen": { skater?: Skater; goalie?:Goalie; title?: string };
  "Screens/GameDataScreen": {gameData?:Scores, title: string};
};

export default RootStackParamList;
