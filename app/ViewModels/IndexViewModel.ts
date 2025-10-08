import RootStackParamList from "@/Navigation/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import useNHLDataManager from "../DataManager/DataManager";
import { Datum, NHLTeam } from "../Models/NHLTeam";

const useIndexViewModel = () =>{
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const [currentTeams, setCurrentTeams] = useState<NHLTeam | undefined>();
    const isFocused = useIsFocused();
    const fetchedRef = useRef(false);
    const { isLoading, getTeams, getTeamByTricode } = useNHLDataManager();

    
    const getTeamsforList = () =>{
      if ((isFocused && !fetchedRef.current) || currentTeams === undefined) {
        fetchedRef.current = true;
        (async () => {
          let results = await getTeams();
          setCurrentTeams(results);
        })();
      }
    }

    const getTeamInfo = async (team: Datum): Promise<void> => {
      const tri = team.triCode || "";
      let results = await getTeamByTricode(tri as string);
      
      if (!results) {
        alert("No data found for " + (team.fullName || "team"));
        return;
      }

      navigation.navigate("Screens/TeamStatsScreen", {
        stats: results,
        title: team.fullName || undefined,
      });
    };

    async function buildTeamsList(): Promise<void> {
      let results = await getTeams();
      setCurrentTeams(results);
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