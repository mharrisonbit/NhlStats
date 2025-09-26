import React from "react";
import { DimensionValue, View, ViewStyle } from "react-native";

type SeparatorProps = {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: ViewStyle;
  width?: DimensionValue; // Optional: 100%, or specific value
};

const Separator: React.FC<SeparatorProps> = ({
  color = "#E0E0E0",
  thickness = 1,
  marginVertical = 12,
  width = "100%",
  style,
}) => {
  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          marginVertical,
          width,
          alignSelf: "center",
        },
        style,
      ]}
    />
  );
};

export default Separator;
