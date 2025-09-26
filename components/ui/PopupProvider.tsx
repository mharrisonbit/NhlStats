import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Popup from "./Popup";

type PopupButton = {
  text: string;
  onPress?: () => void;
  style?: object;
};

type ShowPopupOptions = {
  title?: string;
  message?: string;
  buttons?: PopupButton[];
};

type PopupContextValue = {
  showPopup: (opts: ShowPopupOptions) => void;
  hidePopup: () => void;
};

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [buttons, setButtons] = useState<PopupButton[]>([]);

  const showPopup = useCallback((opts: ShowPopupOptions) => {
    setTitle(opts.title);
    setMessage(opts.message);
    setButtons(
      opts.buttons || [{ text: "OK", onPress: () => setVisible(false) }]
    );
    setVisible(true);
  }, []);

  const hidePopup = useCallback(() => {
    setVisible(false);
  }, []);

  const value = useMemo(
    () => ({ showPopup, hidePopup }),
    [showPopup, hidePopup]
  );

  return (
    <PopupContext.Provider value={value}>
      {children}
      <Popup
        visible={visible}
        title={title}
        message={message}
        buttons={buttons.map((b) => ({
          ...b,
          onPress: () => {
            b.onPress?.();
            hidePopup();
          },
        }))}
        onRequestClose={hidePopup}
      />
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const ctx = useContext(PopupContext);
  if (!ctx)
    throw new Error("usePopupContext must be used within PopupProvider");
  return ctx;
};

export default PopupContext;
