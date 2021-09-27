import React from "react";
import { motion } from "framer-motion";
import { Badge, Flex, Box, Text, Stack, Link } from "@chakra-ui/core";
import { ArrowRight } from "react-feather";
import { Link as BrowserLink } from "react-router-dom";

export default function Home() {

  const MotionBadge = motion(Badge);
  const anim = {
    scale: [0.9, 0.9, 0.9, 1.1, 0.9, 0.9, 0.9]
  }
  const tr = {
    duration: 2,
    repeat: Infinity
  }

  return (
    <Stack m="6" spacing="6">
      <PageLink url="/launches">
        Browse SpaceX Launches
      </PageLink>
      <PageLink url="/launch-pads">
        Browse SpaceX Launch Pads
      </PageLink>
      <PageLink url="/rockets">
        Browse SpaceX Rockets
        <MotionBadge variantColor="blue" p={1} ml={2} animate={anim} transition={tr}>New</MotionBadge>
      </PageLink>
    </Stack>
  );
}

function PageLink({ url, children, ...rest }) {
  const MotionLink = motion(Link);

  const anim = {
    translateY: [500, 0],
    opacity: [0, 0, 0, 0, 0, 0, 0, 1]
  }
  const tr = {
    duration: 0.3,
  }

  return (
    <MotionLink
      as={BrowserLink}
      to={url}
      opacity={0}
      animate={anim}
      transition={tr}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </MotionLink>
  );
}
