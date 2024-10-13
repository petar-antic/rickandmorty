import {
  Flex,
  Spinner,
  Text,
  Link as ChakraLink,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { useSingleLocationQuery, useMultipleCharactersQuery } from "../hooks";

const SingleLocation = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: locationData,
    isLoading,
    isError,
  } = useSingleLocationQuery(Number(id));

  const residentIds =
    locationData?.data.residents.map(resident => {
      const sliceAt = resident.lastIndexOf("/") + 1;
      return resident.slice(sliceAt);
    }) || [];

  const { data: residentsData, isLoading: isLoadingResidents } =
    useMultipleCharactersQuery(residentIds);

  if (isLoading || isLoadingResidents) {
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
          Failed to load location. Please try again later.
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
          {locationData?.data.name}
        </Text>
        <Text fontSize="lg" color="gray.400">
          Type: {locationData?.data.type}
        </Text>
        <Text fontSize="lg" color="gray.400">
          Dimension: {locationData?.data.dimension || "Unknown"}
        </Text>
      </Box>

      <Box width="100%">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Residents:
        </Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {residentsData?.data.map(resident => (
            <ChakraLink
              as={ReactRouterLink}
              to={`/characters/${resident.id}`}
              key={resident.id}
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
                  src={resident.image}
                  alt={resident.name}
                  borderRadius="md"
                  boxSize="50px"
                  mr={4}
                />
                <Box>
                  <Text fontWeight="bold" color="white">
                    {resident.name}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Status: {resident.status}
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

export default SingleLocation;
