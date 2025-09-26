

const basicUrl = 'https://api.nhle.com/';
const statsUrl = 'https://api-web.nhle.com/';

/**
 * Gets a list of all NHL teams.
 * @returns promise of the data of all teams.
 */
const getTeams = async (): Promise<any> => {
    const response = await callApi(basicUrl + 'stats/rest/en/team');
    return response;
};

/**
 * Gets the stats for the team based on the tricode.
 * @param tricode the three letter code of the team.
 * @returns promise of the data from the team.
 */
const getTeamByTricode = async (triCode:string): Promise<any> => {
    const response = await callApi(statsUrl + 'v1/club-stats/' + triCode + '/now');
    return response;
};

/**
 * Gets the team based on the game type and season.
 * @param gameType this is the type of game (1=preseason, 2=regular, 3=playoffs)
 * @param season the season in the format YYYYYYYY (e.g. 20232024)
 * @returns promise of the data from the team.
 */
const getTeamById= async (gameType:number, season:string): Promise<any> => {
    const response = await callApi(basicUrl + 'stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=' + season + '%20and%20gameTypeId=' + gameType);
    return response;
}

/**
 * Gets the streams for the games.
 * @returns promise of an array of game streams.
 */
const getWatchInfo= async (): Promise<any> => {
    const response = await callApi(statsUrl + 'v1/where-to-watch');
    return response;
}
// https://api-web.nhle.com/v1/network/tv-schedule/2023-11-10
/**
 * Gets the streams for the games.
 * @returns promise of an array of game streams.
 */
const getTodaysWatchInfo= async (date:string): Promise<any> => {
    const response = await callApi(statsUrl + 'v1/network/tv-schedule/' + date);
    return response;
}


/**
 * Gets the glossary terms that are going to be used.
 * @returns promise of an array of glossary terms.
 */
const getGlossaryInfo= async (): Promise<any> => {
    const response = await callApi('https://api.nhle.com/stats/rest/en/glossary');
    
    return response;
}


const callApi = async (url: string): Promise<any> => {
    try {
        
        const response = await fetch(url);
        const data = await response.json();
        return data;
        } catch (error) {
            // console.error("Error fetching data: ", error);
            return null;
        }
}

export { getGlossaryInfo, getTeamById, getTeamByTricode, getTeams, getTodaysWatchInfo, getWatchInfo };

