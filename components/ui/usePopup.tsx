import { usePopupContext } from "./PopupProvider";

export const usePopup = () => {
  const { showPopup, hidePopup } = usePopupContext();
  return { showPopup, hidePopup };
};

export default usePopup;
