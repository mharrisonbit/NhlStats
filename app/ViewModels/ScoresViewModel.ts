import RootStackParamList from "@/Navigation/navigation";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import useNHLDataManager from "../DataManager/DataManager";
import { isNullOrWhiteSpace } from "../GlobalFunctions";
import { Scores } from "../Models/Scores";


const useScoresViewModel = () => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { isLoading, getTodaysScores, getScoresForDate } = useNHLDataManager();
    const [ gameScores, setScores ] = useState<Scores[]>([]);
    const [ dateString, setDateString ] = useState("");
    const [ dateForDisplay, setDateForDisplay ] = useState("");
    
    const getScores = async () => {
        setScores([]);
        let results = await getTodaysScores();
        setScores(results);
    }

    const getScoresByDate = async() => {
        setScores([]);
        if(isNullOrWhiteSpace(dateString)){
            const date = new Date();
            const formattedDate = date.toISOString().substring(0, 10);
            setDateForDisplay(formattedDate);
            await getScores();
            return;
        }
        setDateForDisplay(dateString);
        let results = await getScoresForDate(dateString);
        setDateString("");
        setScores(results);
    }

    const formatGameTime = (dateString: string): string => {
        if (isNullOrWhiteSpace(dateString)) {
          return "N/A";
        }
      
        const date = new Date(dateString);
      
        const localTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        return localTime;
      };
      
    const showGameData = (data:Scores) => {
        navigation.navigate("Screens/GameDataScreen", {
            gameData : data,
            title: data.teams.away.teamName + " vs " + data.teams.home.teamName
            
        });
    }
    
    return [
        getScoresByDate,
        formatGameTime,
        showGameData,
        setDateString,
        isLoading,
        gameScores,
        dateString,
        dateForDisplay,
    ]
}

export default useScoresViewModel;