import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./user-context";
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
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

  useEffect(() => {
    setLaunches(userContext.favoriteLaunches);
    setLaunchPads(userContext.favoriteLaunchPads);
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
          <DrawerHeader>Favorite Launches ({launches.length})</DrawerHeader>
          <DrawerBody>
            {launches.length > 0
              && launches.map((x,i) => <LaunchItem key={i} launch={x} inDrawer={true}></LaunchItem>)
            }
          </DrawerBody>
          <DrawerHeader>Favorite Launch Pads ({launchPads.length})</DrawerHeader>
          <DrawerBody>
            {launchPads.length > 0 
              && launchPads.map((x,i) => <LaunchPadItem key={i} launchPad={x} inDrawer={true}></LaunchPadItem>)
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}