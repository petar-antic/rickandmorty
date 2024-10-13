import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  Link as ChakraLink,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSingleCharacterQuery } from "../hooks";
import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

const SingleCharacter = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSingleCharacterQuery(Number(id));

  const sliceAt = (data?.data.location.url.lastIndexOf("/") ?? 0) + 1;
  const locationNumber = data?.data.location.url.slice(sliceAt);

  if (isLoading) {
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
          Failed to load character. Please try again later.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      bg="black"
      color="white"
      p={6}
      minH="100vh"
    >
      <Flex direction={{ base: "column", md: "row" }} mb={6} align="center">
        <Image
          src={data?.data.image}
          alt={data?.data.name}
          borderRadius="lg"
          objectFit="cover"
          width={{ base: "100%", md: "300px" }}
          height="300px"
          mb={{ base: 4, md: 0 }}
          mr={{ md: 6 }}
        />
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {data?.data.name}
          </Text>
          <Text>Status: {data?.data.status}</Text>
          <Text>Species: {data?.data.species}</Text>
          <Text>Gender: {data?.data.gender}</Text>

          <ChakraLink
            as={ReactRouterLink}
            to={`/location/${locationNumber}`}
            _hover={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Box
              mt={4}
              p={4}
              bg="gray.800"
              borderRadius="md"
              boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Text fontWeight="bold" color="white">
                Location: {data?.data.location.name}
              </Text>
            </Box>
          </ChakraLink>
        </Box>
      </Flex>

      <Box width="100%">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Appeared in Episodes:
        </Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {data?.data.episode.map(singleEpisode => {
            const sliceAt = singleEpisode.lastIndexOf("/") + 1;
            const episodeNumber = singleEpisode.slice(sliceAt);

            return (
              <ChakraLink
                as={ReactRouterLink}
                to={`/episodes/${episodeNumber}`}
                key={episodeNumber}
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
                >
                  <Text fontWeight="bold" color="white">
                    Episode {episodeNumber}
                  </Text>
                </Box>
              </ChakraLink>
            );
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default SingleCharacter;
