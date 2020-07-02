import {
  mdiCardsHeart,
  mdiCardsDiamond,
  mdiCardsSpade,
  mdiCardsClub,
} from "@mdi/js";

export function getIconFromText(family) {
  switch (family) {
    case "hearts":
      return {
        icon: mdiCardsHeart,
        color: "red",
      };
    case "diamonds":
      return {
        icon: mdiCardsDiamond,
        color: "red",
      };
    case "clovers":
      return {
        icon: mdiCardsClub,
        color: "black",
      };
    case "spades":
      return {
        icon: mdiCardsSpade,
        color: "black",
      };
  }
}
