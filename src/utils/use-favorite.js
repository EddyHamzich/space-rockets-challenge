import { useContext } from "react";
import { UserContext } from "../components/user-context";

export const useFavorite = () => {
  const { userContext, setUserContext } = useContext(UserContext);
    
  // type itemType = ("Launches" | "LaunchPads" | "Rockets")

  const syncContextWithStorage = (itemType) => {
    let newContext = { ...userContext };
    newContext["favorite" + itemType] = JSON.parse(localStorage.getItem("favorite" + itemType));
    setUserContext(newContext);
  }

  const favoriteOnClick = (e, itemType, item) => {
    e.stopPropagation();
    e.preventDefault();

    let current = JSON.parse(localStorage.getItem("favorite" + itemType) || "[]");
    current.push(item);

    localStorage.setItem("favorite" + itemType, JSON.stringify(current));
    syncContextWithStorage(itemType);
  }

  const unfavoriteOnClick = (e, itemType, item) => {
    e.stopPropagation();
    e.preventDefault();

    let current = JSON.parse(localStorage.getItem("favorite" + itemType) || "[]");
    current = current.filter(x => {
      if(x.id) return x.id !== item.id;
      if(!x.id) return x.flight_number !== item.flight_number;
      else return x;
    });

    localStorage.setItem("favorite" + itemType, JSON.stringify(current));
    syncContextWithStorage(itemType);
  }

  return { favoriteOnClick, unfavoriteOnClick } 
} 
