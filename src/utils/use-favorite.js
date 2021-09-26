import { useContext } from "react";
import { UserContext } from "../components/user-context";

export const useFavorite = () => {
  const { userContext, setUserContext } = useContext(UserContext);
    
  // type itemType = ("Launches" | "LaunchPads")

  const favoriteOnClick = (e, itemType, item) => {
    e.stopPropagation();
    e.preventDefault();

    if(itemType === "Launches") { 
      let current = JSON.parse(localStorage.getItem("favoriteLaunches") || "[]");
      current.push(item);

      localStorage.setItem("favoriteLaunches", JSON.stringify(current));
      setUserContext({ ...userContext, favoriteLaunches: JSON.parse(localStorage.getItem("favoriteLaunches")) })
    }
    else if(itemType === "LaunchPads") { 
      let current = JSON.parse(localStorage.getItem("favorite" + itemType) || "[]");
      current.push(item);

      localStorage.setItem("favoriteLaunchPads", JSON.stringify(current));
      setUserContext({ ...userContext, favoriteLaunchPads: JSON.parse(localStorage.getItem("favoriteLaunchPads")) })
    }
  }

  const unfavoriteOnClick = (e, itemType, item) => {
    e.stopPropagation();
    e.preventDefault();

    if(itemType === "Launches") {
      let current = JSON.parse(localStorage.getItem("favoriteLaunches") || "[]");
      current = current.filter(x => x.flight_number !== item.flight_number);

      localStorage.setItem("favoriteLaunches", JSON.stringify(current));
      setUserContext({ ...userContext, favoriteLaunches: JSON.parse(localStorage.getItem("favoriteLaunches")) })
    }
    else if(itemType === "LaunchPads") {
      let current = JSON.parse(localStorage.getItem("favoriteLaunchPads") || "[]");
      current = current.filter(x => x.id !== item.id);

      localStorage.setItem("favoriteLaunchPads", JSON.stringify(current));
      setUserContext({ ...userContext, favoriteLaunchPads: JSON.parse(localStorage.getItem("favoriteLaunchPads")) })
    }
  }

  return { favoriteOnClick, unfavoriteOnClick } 
} 