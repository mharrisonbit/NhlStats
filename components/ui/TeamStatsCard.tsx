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

  const combinedStats: Record<string, any> = {
    ...(gameData.currentStats?.records?.[teamAbbr] || {}),
    ...(gameData.currentStats?.standings?.[teamAbbr] || {}),
    ...(gameData.currentStats?.streaks?.[teamAbbr] || {}),
    ...(gameData.gameStats?.blocked && {
      Blocked: gameData.gameStats.blocked[teamAbbr],
    }),
    ...(gameData.gameStats?.shots && {
      Shots: gameData.gameStats.shots[teamAbbr],
    }),
    ...(gameData.gameStats?.hits && {
      Hits: gameData.gameStats.hits[teamAbbr],
    }),
    ...(gameData.gameStats?.giveaways && {
      Giveaways: gameData.gameStats.giveaways[teamAbbr],
    }),
    ...(gameData.gameStats?.takeaways && {
      Takeaways: gameData.gameStats.takeaways[teamAbbr],
    }),
    ...(gameData.gameStats?.pim && {
      PenaltyMinutes: gameData.gameStats.pim[teamAbbr],
    }),
    ...(gameData.gameStats?.faceOffWinPercentage && {
      FaceoffWinPercent: `${gameData.gameStats.faceOffWinPercentage[teamAbbr]}%`,
    }),
    ...(gameData.gameStats?.powerPlay?.[teamAbbr] && {
      PowerPlayGoals: gameData.gameStats.powerPlay[teamAbbr].goals,
      PowerPlayOpportunities:
        gameData.gameStats.powerPlay[teamAbbr].opportunities,
      PowerPlayPercent: `${gameData.gameStats.powerPlay[teamAbbr].percentage}%`,
    }),
  };

  const statsEntries = Object.entries(combinedStats);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.teamName}>
        {team.locationName} {team.teamName}
      </Text>

      <View style={styles.statsGrid}>
        {statsEntries.length > 0 ? (
          statsEntries.map(([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text
                style={styles.statLabel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {formatLabel(key)}:
              </Text>
              <Text
                style={styles.statValue}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {value ?? "N/A"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No stats available</Text>
        )}
      </View>
    </View>
  );
};

const formatLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

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
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexWrap: "wrap",
  },
  statLabel: {
    fontSize: 15,
    color: "#495057",
    flexShrink: 1,
    flexBasis: "60%",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    textAlign: "right",
    flexShrink: 1,
    flexBasis: "35%",
  },
  noData: {
    textAlign: "center",
    color: "#868e96",
    marginTop: 8,
  },
});

export default TeamStatsCard;
