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
  if (!team || !gameData) return null;

  const teamAbbr =
    team.abbreviation as keyof typeof gameData.currentStats.records;

  // 🧠 Build combined stats, but preserve context for nested structures
  const records = gameData.currentStats?.records?.[teamAbbr] || {};
  const standings = gameData.currentStats?.standings?.[teamAbbr] || {};
  const streak = gameData.currentStats?.streaks?.[teamAbbr] || {};
  const stats = gameData.gameStats || {};

  const combinedStats: Record<string, any> = {
    Wins: records.wins,
    Losses: records.losses,
    Overtime: records.ot,
    "Conference Rank": standings.conferenceRank,
    "Division Rank": standings.divisionRank,
    "League Rank": standings.leagueRank,
    "Points From Playoff Spot": standings.pointsFromPlayoffSpot,
    Streak:
      streak.type && streak.count ? `${streak.count} ${streak.type}` : "N/A",
    Blocked: stats.blocked?.[teamAbbr],
    Shots: stats.shots?.[teamAbbr],
    Hits: stats.hits?.[teamAbbr],
    Giveaways: stats.giveaways?.[teamAbbr],
    Takeaways: stats.takeaways?.[teamAbbr],
    "Penalty Minutes": stats.pim?.[teamAbbr],
    "Faceoff Win %": stats.faceOffWinPercentage?.[teamAbbr]
      ? `${stats.faceOffWinPercentage[teamAbbr]}%`
      : "N/A",
    "Power Play Goals": stats.powerPlay?.[teamAbbr]?.goals,
    "Power Play Opportunities": stats.powerPlay?.[teamAbbr]?.opportunities,
    "Power Play %": stats.powerPlay?.[teamAbbr]?.percentage
      ? `${stats.powerPlay[teamAbbr].percentage}%`
      : "N/A",
  };

  // 🧹 Filter out empty or null values
  const statsEntries = Object.entries(combinedStats).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.teamName}>
        {team.locationName} {team.teamName}
      </Text>

      <View style={styles.statsGrid}>
        {statsEntries.length > 0 ? (
          statsEntries.map(([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text style={styles.statLabel}>{key}:</Text>
              <Text style={styles.statValue}>{String(value)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No stats available</Text>
        )}
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
    width: "95%",
  },
  teamName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  statsGrid: {
    width: "100%",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexWrap: "wrap",
  },
  statLabel: {
    fontSize: 13,
    color: "#495057",
    flexWrap: "wrap",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#212529",
    textAlign: "right",
    flexWrap: "wrap",
  },
  noData: {
    textAlign: "center",
    color: "#868e96",
    marginTop: 8,
  },
});

export default TeamStatsCard;
