// To parse this data:
//
//   import { Convert } from "./file";
//
//   const scores = Convert.toScores(json);

export interface Scores {
    date?:  DateClass;
    games?: Game[];
}

export interface DateClass {
    raw?:    Date;
    pretty?: string;
}

export interface Game {
    status?:       Status;
    startTime?:    Date;
    goals?:        any[];
    links?:        Links;
    scores?:       ScoresClass;
    teams?:        Teams;
    preGameStats?: Stats;
    currentStats?: Stats;
}

export interface Stats {
    records?:   ScoresClass;
    streaks?:   ScoresClass;
    standings?: Standings;
}

export interface ScoresClass {
    CHI?: ChiChi | number | null;
    FLA?: ChiChi | number | null;
    PIT?: ChiChi | number | null;
    NYR?: ChiChi | number | null;
    COL?: ChiChi | number | null;
    LAK?: ChiChi | number | null;
}

export interface ChiChi {
    wins?:   number;
    losses?: number;
    ot?:     number;
}

export interface Standings {
    CHI?: StandingsCHI;
    FLA?: StandingsCHI;
    PIT?: StandingsCHI;
    NYR?: StandingsCHI;
    COL?: StandingsCHI;
    LAK?: StandingsCHI;
}

export interface StandingsCHI {
    divisionRank?:          string;
    conferenceRank?:        string;
    leagueRank?:            string;
    pointsFromPlayoffSpot?: string;
}

export interface Links {
    gameCenter?: string;
}

export interface Status {
    state?: string;
}

export interface Teams {
    away?: Away;
    home?: Away;
}

export interface Away {
    abbreviation?: string;
    id?:           number;
    locationName?: string;
    shortName?:    string;
    teamName?:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toScores(json: string): Scores[] {
        return JSON.parse(json);
    }

    public static scoresToJson(value: Scores[]): string {
        return JSON.stringify(value);
    }
}
