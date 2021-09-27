import React, { useContext } from "react";
import { UserContext } from "./user-context";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";

import { useFavorite } from "../utils/use-favorite";
import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoriteButton from "./favorite-button";

const PAGE_SIZE = 12;

export default function Rockets() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "v4/rockets",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Rockets" }]} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data && data
          .flat()
          .map((rocket) => (
            <RocketItem
              rocket={rocket}
              key={rocket.id}
              inDrawer={false}
            />
          ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function RocketItem({ rocket, inDrawer }) {
  const { userContext } = useContext(UserContext);
  const isFavorite = userContext.favoriteRockets.some(x => rocket.id === x.id);
  const { favoriteOnClick, unfavoriteOnClick } = useFavorite();

  return (
    <Box
      boxShadow={inDrawer ? "none" : "md"}
      borderWidth={inDrawer ? "0" : "1px"}
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      {!inDrawer && 
        <Image
          src={
            rocket.flickr_images[1]?.replace("_o.jpg", "_z.jpg")
          }
          alt={`${rocket.mission_name} rocket`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />
      }
      <Box p={inDrawer ? 1 : 6}>
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xl"
            textTransform="uppercase"
          >
            <Badge fontSize="xl">{rocket.name}</Badge>
            <br/> 
            <Text fontSize="xl">${rocket.cost_per_launch.toLocaleString()}</Text>
          </Box>
        </Box>
        <Flex marginBottom="8px">
          <Text fontSize="sm">
            First Flight: {formatDate(rocket.first_flight)}
          </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(rocket.first_flight)}
          </Text>
        </Flex>
        <FavoriteButton
          isFavorite={isFavorite}
          unfavoriteOnClick={(e) => unfavoriteOnClick(e, "Rockets", rocket)}
          favoriteOnClick={(e) => favoriteOnClick(e, "Rockets", rocket)}
        />
      </Box>
    </Box>
  );
}
