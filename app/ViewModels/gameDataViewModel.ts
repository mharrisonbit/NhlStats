import { Scores } from "../Models/Scores";

const useGameDataViewModel = (route:Scores) =>{
    const gameData = route.gameData;

    return {
        gameData
    };
}

export default useGameDataViewModel;