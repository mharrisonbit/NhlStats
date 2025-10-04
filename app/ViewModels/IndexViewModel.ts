import RootStackParamList from "@/Navigation/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { getTeamByTricode, getTeams } from "../DataManager/DataManager";
import { Datum, NHLTeam } from "../Models/NHLTeam";

const useIndexViewModel = () =>{
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const [isLoading, setIsLoading] = useState(false);
    const [currentTeams, setCurrentTeams] = useState<NHLTeam | undefined>();
    const isFocused = useIsFocused();
    const fetchedRef = useRef(false);

    
    const getTeamsforList = () =>{
      if ((isFocused && !fetchedRef.current) || currentTeams === undefined) {
        fetchedRef.current = true;
        (async () => {
          setIsLoading(true);
          let results = await getTeams();
          setCurrentTeams(results);
          setIsLoading(false);
        })();
      }
    }

    const getTeamInfo = async (team: Datum): Promise<void> => {
      setIsLoading(true);
      const tri = team.triCode || "";
      let results = await getTeamByTricode(tri as string);
      
      if (!results) {
        alert("No data found for " + (team.fullName || "team"));
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      navigation.navigate("Screens/TeamStatsScreen", {
        stats: results,
        title: team.fullName || undefined,
      });
    };

    async function buildTeamsList(): Promise<void> {
      setIsLoading(true);
      let results = await getTeams();
      setCurrentTeams(results);
      setIsLoading(false);
    }

    return{
      isLoading,
      currentTeams,
      isFocused,
      getTeamInfo,
      buildTeamsList,
      getTeamsforList
    }

}

export default useIndexViewModel;