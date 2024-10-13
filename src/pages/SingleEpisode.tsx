import {
  Flex,
  Spinner,
  Text,
  Link as ChakraLink,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSingleEpisodeQuery, useMultipleCharactersQuery } from "../hooks";
import { useParams, Link as ReactRouterLink } from "react-router-dom";

const SingleEpisode = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSingleEpisodeQuery(Number(id));

  const characterIds =
    data?.data.characters.map((character: string) => {
      const sliceAt = character.lastIndexOf("/") + 1;
      return character.slice(sliceAt);
    }) || [];

  const { data: charactersData, isLoading: isLoadingCharacters } =
    useMultipleCharactersQuery(characterIds);

  if (isLoading || isLoadingCharacters) {
    return (
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="black"
        color="white"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="black"
        color="white"
      >
        <Text fontSize="xl" color="red.500">
          Failed to load episode. Please try again later.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      p={6}
      bg="black"
      color="white"
      minH="100vh"
    >
      <Box textAlign="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {data?.data.name}
        </Text>
        <Text fontSize="lg" color="gray.400">
          Air Date: {data?.data.air_date}
        </Text>
        <Text fontSize="lg" color="gray.400">
          Episode Code: {data?.data.episode}
        </Text>
      </Box>

      <Box width="100%">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Characters in this episode:
        </Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {charactersData?.data.map(character => (
            <ChakraLink
              as={ReactRouterLink}
              to={`/characters/${character.id}`}
              key={character.id}
              _hover={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Box
                p={4}
                bg="gray.800"
                borderRadius="md"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
                display="flex"
                alignItems="center"
              >
                <Box
                  as="img"
                  src={character.image}
                  alt={character.name}
                  borderRadius="md"
                  boxSize="50px"
                  mr={4}
                />
                <Box flex="1">
                  <Text fontWeight="bold" color="white">
                    {character.name}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Status: {character.status}
                  </Text>
                </Box>
              </Box>
            </ChakraLink>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default SingleEpisode;
