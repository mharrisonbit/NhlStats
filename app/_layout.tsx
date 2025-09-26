import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { PopupProvider } from "@/components/ui/PopupProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PopupProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Screen
            name="Screens/TeamStatsScreen"
            options={({ route }: any) => ({
              title: route?.params?.title ?? "Team Stats",
              headerBackTitle: "Back",
            })}
          />
          <Stack.Screen
            name="Screens/PlayerStatsScreen"
            options={({ route }: any) => ({
              title: route?.params?.title ?? "Player Stats",
              headerBackTitle: "Back",
            })}
          />
        </Stack>
        <StatusBar style="auto" />
      </PopupProvider>
    </ThemeProvider>
  );
}
