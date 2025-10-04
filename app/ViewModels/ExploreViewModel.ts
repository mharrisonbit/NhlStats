import usePopup from "@/components/ui/usePopup";
import { useIsFocused } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { getGlossaryInfo } from "../DataManager/DataManager";
import { NHLGlossary } from "../Models/NHLGlossary";

const useExploreViewModel = () =>{
    
    const [searchText, onChangeText] = useState("");
    const [glossary, setGlossary] = useState<NHLGlossary | null>(null);
    const fetchedRef = useRef(false);
    const { showPopup } = usePopup();
    const scrollViewRef = useRef<ScrollView>(null);
    const isFocused = useIsFocused();


    const getData = () => {
        if (isFocused && !fetchedRef.current && !glossary) {
            fetchedRef.current = true;
            (async () => {
            const data = await getGlossaryInfo();
            if (data) setGlossary(data);
            })();
        }
    }

    const searchGlossary = (query: string) => {
        if (!glossary || !query.trim()) {
          alert("Please enter a search term.");
          return;
        }
        const lowerQuery = query.toLowerCase();
        const results = glossary?.data?.filter(
          (item: any) =>
            item.fullName.toLowerCase().includes(lowerQuery) ||
            item.abbreviation.toLowerCase().includes(lowerQuery) ||
            item.definition.toLowerCase().includes(lowerQuery)
        );
        if (results?.length === 0) {
          alert("No results found.");
        } else {
          const result = results[0];
          let foundItemIndex = glossary?.data?.findIndex(
            (i: any) => i.id === result.id
          );
          if (foundItemIndex !== -1 && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: foundItemIndex * 28, // Assuming each item is approximately 40px tall
              animated: true,
            });
          }
          showPopup({
            title: `${result.abbreviation} • ${result.fullName}`,
            message: result.definition,
            buttons: [{ text: "Close" }],
          });
          onChangeText("");
        }
      };

      return {
        searchGlossary,
        onChangeText,
        showPopup,
        getData,
        glossary,
        isFocused,
        scrollViewRef,
        searchText,
      };

    }

    export default useExploreViewModel;