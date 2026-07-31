import { loadFont as loadDisplayFont } from "@remotion/google-fonts/BlackHanSans";
import { loadFont as loadBodyFont } from "@remotion/google-fonts/NotoSansKR";

export const { fontFamily: displayFont } = loadDisplayFont("normal", {
  weights: ["400"],
  subsets: ["korean"],
});

export const { fontFamily: bodyFont } = loadBodyFont("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["korean"],
});
