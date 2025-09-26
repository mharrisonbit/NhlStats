import { NHLTeamStats, Skater } from "@/app/Models/NHLTeamStats";

// Central place for navigation param types so screens can import them.
export type RootStackParamList = {
  "Screens/TeamStatsScreen": { stats: NHLTeamStats; title?: string };
  "Screens/PlayerStatsScreen": { stats: Skater; title?: string };
};

export default RootStackParamList;
