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

  //Pull stats data
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

  const statsEntries = Object.entries(combinedStats).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  //Add goals for this team
  const teamGoals =
    gameData.goals?.filter((goal) => goal.team === teamAbbr) || [];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.teamName}>
        {team.locationName} {team.teamName}
      </Text>

      <View style={styles.statsGrid}>
        {statsEntries.map(([key, value]) => (
          <View key={key} style={styles.statItem}>
            <Text style={styles.statLabel}>{key}:</Text>
            <Text style={styles.statValue}>{String(value)}</Text>
          </View>
        ))}
      </View>

      {/*Goals Section */}
      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>Goals</Text>
        {teamGoals.length > 0 ? (
          teamGoals.map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalScorer}>
                {goal.scorer.player}{" "}
                <Text style={styles.goalDetails}>
                  (Period {goal.period}, {goal.min}:
                  {goal.sec.toString().padStart(2, "0")}
                  {goal.strength ? `, ${goal.strength}` : ""})
                </Text>
              </Text>
              {goal.assists?.length > 0 && (
                <Text style={styles.assists}>
                  Assists: {goal.assists.map((a) => a.player).join(", ")}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No goals recorded</Text>
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
    fontSize: 18,
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
  },
  statLabel: {
    fontSize: 15,
    color: "#495057",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  goalsSection: {
    width: "100%",
    marginTop: 8,
  },
  goalItem: {
    marginBottom: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  goalScorer: {
    fontSize: 15,
    fontWeight: "600",
  },
  goalDetails: {
    fontSize: 14,
    color: "#6c757d",
  },
  assists: {
    fontSize: 14,
    color: "#495057",
    marginTop: 2,
  },
  noData: {
    textAlign: "center",
    color: "#868e96",
    marginTop: 8,
  },
});

export default TeamStatsCard;
