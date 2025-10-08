import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Game } from "../../app/Models/Scores";

interface TeamStatsCardProps {
  team: Game["teams"]["home"] | Game["teams"]["away"];
  gameData: Game;
  style?: any;
}

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({
  team,
  gameData,
  style,
}) => {
  if (
    !team ||
    !gameData ||
    !gameData.currentStats ||
    !gameData.currentStats.records
  )
    return null;

  const teamAbbr =
    team.abbreviation as keyof typeof gameData.currentStats.records;
  const teamStats = gameData.currentStats.records[teamAbbr];
  const teamData = gameData;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.teamName}>
        {team.locationName} {team.teamName}
      </Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Wins:</Text>
          <Text style={styles.statValue}>{teamStats?.wins || "N/A"}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Losses:</Text>
          <Text style={styles.statValue}>{teamStats?.losses || "N/A"}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Overtime:</Text>
          <Text style={styles.statValue}>{teamStats?.ot || "N/A"}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Conference Rank:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.standings as any)?.[teamAbbr]
              ?.conferenceRank ?? "N/A"}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Division Rank:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.standings as any)?.[teamAbbr]
              ?.divisionRank || "N/A"}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>League Rank:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.standings as any)?.[teamAbbr]
              ?.leagueRank || "N/A"}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>points From Playoff Spot:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.standings as any)?.[teamAbbr]
              ?.pointsFromPlayoffSpot || "N/A"}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Streak Type:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.streaks as any)?.[teamAbbr]?.type ||
              "N/A"}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Streak:</Text>
          <Text style={styles.statValue}>
            {(teamData?.currentStats?.streaks as any)?.[teamAbbr]?.count ||
              "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    margin: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  statsGrid: {
    width: "100%",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#495057",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212529",
  },
});

export default TeamStatsCard;
