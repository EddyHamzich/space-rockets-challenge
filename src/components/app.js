import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import Rockets from "./rockets";
import Favorites from "./favorites";
import { UserContext } from "./user-context";

export default function App() {
  const [userContext, setUserContext] = useState({
    favoriteLaunches: JSON.parse(localStorage.getItem("favoriteLaunches") || "[]"),
    favoriteLaunchPads: JSON.parse(localStorage.getItem("favoriteLaunchPads") || "[]"),
    favoriteRockets: JSON.parse(localStorage.getItem("favoriteRockets") || "[]")
  })

  return (
    <div>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launches/:launchId" element={<Launch />} />
          <Route path="/launch-pads" element={<LaunchPads />} />
          <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
          <Route path="/rockets" element={<Rockets />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text as={Link} to={"/"} fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
        ¡SPACE·R0CKETS!
      </Text>
      <Favorites /> 
    </Flex>
  );
}
