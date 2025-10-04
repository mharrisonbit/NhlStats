import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ImageStyle,
  Modal,
  Pressable,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ModalImageProps {
  imageUri: string;
  thumbnailStyle?: ImageStyle;
  modalImageStyle?: ImageStyle;
  modalBackgroundStyle?: ViewStyle;
  thumbnailSize?: number;
  modalSize?: number;
}

export default function ModalImage({
  imageUri,
  thumbnailStyle,
  modalImageStyle,
  modalBackgroundStyle,
  thumbnailSize = 100,
  modalSize = 300,
}: ModalImageProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const defaultThumbnailStyle: ImageStyle = {
    width: thumbnailSize,
    height: thumbnailSize,
  };

  const defaultModalImageStyle: ImageStyle = {
    width: modalSize,
    height: modalSize,
  };

  const defaultModalBackgroundStyle: ViewStyle = {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: imageUri }}
          style={[defaultThumbnailStyle, thumbnailStyle]}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={[defaultModalBackgroundStyle, modalBackgroundStyle]}
        >
          <Image
            source={{ uri: imageUri }}
            style={[defaultModalImageStyle, modalImageStyle]}
            contentFit="contain"
          />
        </Pressable>
      </Modal>
    </>
  );
}
