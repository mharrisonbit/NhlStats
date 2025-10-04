import { ParamListBase, RouteProp } from "@react-navigation/native";
import { PostionCode } from "../Models/Enums";
import { Goalie, Skater } from "../Models/NHLTeamStats";

const usePlayerStatsViewModel = (route:RouteProp<ParamListBase>) =>{

    const params = (route as any).params as
    | { skater?: Skater; goalie?: Goalie; title?: string }
    | undefined;

    const skater = params?.skater ?? null;
    const goalie = params?.goalie ?? null;
    const positionName = skater
      ? PostionCode[skater.positionCode as keyof typeof PostionCode]
      : null;
  
    const imageUri = skater?.headshot || goalie?.headshot || "";

    return {
        goalie,
        skater,
        positionName,
        imageUri,
    }
}

export default usePlayerStatsViewModel;