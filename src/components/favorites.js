import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./user-context";
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
import { RocketItem } from "./rockets";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";

export default function Favorites() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { userContext } = useContext(UserContext);
  const [launches, setLaunches] = useState(userContext.favoriteLaunches);
  const [launchPads, setLaunchPads] = useState(userContext.favoriteLaunchPads);
  const [rockets, setRockets] = useState(userContext.favoriteRockets);

  const rocketsCost = rockets.reduce((a,x) => a + x.cost_per_launch, 0).toLocaleString()

  useEffect(() => {
    setLaunches(userContext.favoriteLaunches);
    setLaunchPads(userContext.favoriteLaunchPads);
    setRockets(userContext.favoriteRockets);
  }, [userContext])

  return (
    <>
      <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
        Favorites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent overflowY="scroll">
          <DrawerCloseButton />
          <DrawerHeader>Launches ({launches.length})</DrawerHeader>
          <DrawerBody>
            {launches.length > 0
              && launches.map((x,i) => <LaunchItem key={i} launch={x} inDrawer={true}></LaunchItem>)
            }
          </DrawerBody>
          <DrawerHeader>Launch Pads ({launchPads.length})</DrawerHeader>
          <DrawerBody>
            {launchPads.length > 0 
              && launchPads.map((x,i) => <LaunchPadItem key={i} launchPad={x} inDrawer={true}></LaunchPadItem>)
            }
          </DrawerBody>
          <DrawerHeader>Rockets (${rocketsCost})</DrawerHeader>
          <DrawerBody>
            {rockets.length > 0
              && rockets.map((x,i) => <RocketItem key={i} rocket={x} inDrawer={true}></RocketItem>)
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}