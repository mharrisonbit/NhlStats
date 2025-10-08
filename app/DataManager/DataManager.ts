
import { useCallback, useState } from 'react';
import { NHLGameListing } from '../Models/NHLGameListing';
import { NHLGlossary } from '../Models/NHLGlossary';
import { NHLTeam } from '../Models/NHLTeam';
import { NHLTeamStats } from '../Models/NHLTeamStats';
import { Scores } from '../Models/Scores';

const basicUrl = 'https://api.nhle.com/';
const statsUrl = 'https://api-web.nhle.com/';
const scoresUrl = 'https://nhl-score-api.herokuapp.com/';

/**
 * Custom hook for managing NHL API calls with loading state
 * @returns Object containing API functions and loading state
 */
const useNHLDataManager = () => {
    const [isLoading, setIsLoading] = useState(false);

    const callApi = useCallback(async (url: string): Promise<any> => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data: ", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Gets a list of all NHL teams.
     * @returns promise of the data of all teams.
     */
    const getTeams = useCallback(async (): Promise<NHLTeam> => {
        const response = await callApi(basicUrl + 'stats/rest/en/team');
        return response;
    }, [callApi]);

    /**
     * Gets the stats for the team based on the tricode.
     * @param tricode the three letter code of the team.
     * @returns promise of the data from the team.
     */
    const getTeamByTricode = useCallback(async (triCode: string): Promise<NHLTeamStats> => {
        const response = await callApi(statsUrl + 'v1/club-stats/' + triCode + '/now');
        return response;
    }, [callApi]);

    /**
     * Gets the team based on the game type and season.
     * @param gameType this is the type of game (1=preseason, 2=regular, 3=playoffs)
     * @param season the season in the format YYYYYYYY (e.g. 20232024)
     * @returns promise of the data from the team.
     */
    const getTeamById = useCallback(async (gameType: number, season: string): Promise<NHLTeamStats> => {
        const response = await callApi(basicUrl + 'stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=' + season + '%20and%20gameTypeId=' + gameType);
        return response;
    }, [callApi]);

    /**
     * Gets the streams for the games.
     * @returns promise of an array of game streams.
     */
    const getWatchInfo = useCallback(async (): Promise<NHLGameListing> => {
        const response = await callApi(statsUrl + 'v1/where-to-watch');
        return response;
    }, [callApi]);

    /**
     * Gets the streams for the games for a specific date.
     * @param date the date in format YYYY-MM-DD
     * @returns promise of an array of game streams.
     */
    const getTodaysWatchInfo = useCallback(async (date: string): Promise<NHLGameListing> => {
        const response = await callApi(statsUrl + 'v1/network/tv-schedule/' + date);
        return response;
    }, [callApi]);

    /**
     * Gets the glossary terms that are going to be used.
     * @returns promise of an array of glossary terms.
     */
    const getGlossaryInfo = useCallback(async (): Promise<NHLGlossary> => {
        const response = await callApi('https://api.nhle.com/stats/rest/en/glossary');
        return response;
    }, [callApi]);

    const getTodaysScores = useCallback(async (): Promise<Scores[]> => {
        const today = new Date().toISOString().split('T')[0];;
        const response = await callApi(scoresUrl + "api/scores?startDate=" + today + "&endDate=" + today);
        return response;
    },[callApi]);

    const getScoresForDate = useCallback(async (dataString:string): Promise<Scores[]> => {
        // const today = new Date().toISOString().split('T')[0];
        const response = await callApi(scoresUrl + "api/scores?startDate=" + dataString + "&endDate=" + dataString);
        return response;
    },[callApi]);

    return {
        isLoading,
        getTeams,
        getTeamByTricode,
        getTeamById,
        getWatchInfo,
        getTodaysWatchInfo,
        getGlossaryInfo,
        getTodaysScores,
        getScoresForDate
    };
};

export default useNHLDataManager;

