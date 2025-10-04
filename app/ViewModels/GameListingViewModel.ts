import { useIsFocused } from "@react-navigation/native";
import { useRef, useState } from "react";
import { getTodaysWatchInfo } from "../DataManager/DataManager";
import { Broadcast, NHLGameListing } from "../Models/NHLGameListing";

const useGameListingViewModel = () =>{
    const isFocused = useIsFocused();
    const [gameListings, setGameListings] = useState<NHLGameListing | null>(null);
    const fetchedRef = useRef(false);

    const getListings = () =>{
        if ((isFocused && !fetchedRef.current) || gameListings === null) {
            fetchedRef.current = true;
            (async () => {
                const data = await getTodaysWatchInfo(
                    new Date().toISOString().split("T")[0]
                );
                setGameListings(data);
            })();
        }
    }

    const formatShowTimes = (
        start: Date | undefined,
        end: Date | undefined
      ): string => {
        if (!start || !end) return "N/A";
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
    };
    
    const broadcastTapped = (showing: Broadcast) => {
        console.log(showing);
    };
    

    return {
        isFocused,
        gameListings,
        fetchedRef,
        getListings,
        formatShowTimes,
        broadcastTapped
    }
}

export default useGameListingViewModel;