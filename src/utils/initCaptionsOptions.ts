import { CaptionsYoutube } from "../shared/interfaces";

export const initCaptionsOptions = (captions: CaptionsYoutube[]) => {
  captions.forEach((cap) => {
    cap.options = {
      active: false,
      classes: [],
    };
  });
};
