import React from "react";
import { Button } from "@chakra-ui/core";
import { Heart } from "react-feather";

export default function FavoriteButton({ isFavorite, unfavoriteOnClick, favoriteOnClick }) {
  return isFavorite
    ? <Button onClick={unfavoriteOnClick} marginBottom="8px" variantColor="teal">
        <Heart/>
      </Button>
    : <Button onClick={favoriteOnClick} marginBottom="8px">
        <Heart/>
      </Button>
}
