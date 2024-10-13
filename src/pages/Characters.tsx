import {
  Flex,
  Image,
  Spinner,
  Text,
  SimpleGrid,
  Box,
  Badge,
  Link as ChakraLink,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from "@chakra-ui/react";
import { useCharactersInfiniteQuery } from "../hooks";
import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const Characters = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const { data, isFetching, isError, fetchNextPage, hasNextPage } =
    useCharactersInfiniteQuery(searchedName);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      setSearchedName(value);
    }, 800),
    []
  );

  useEffect(() => {
    debouncedSetFilter(inputValue);
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [inputValue, debouncedSetFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex direction="column" align="center" p={4} gap={10}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} boxSize={4} />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search characters..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputGroup>
      {isFetching && (
        <Flex
          minH="100vh"
          align="center"
          justify="center"
          bg="black"
          color="white"
        >
          <Spinner size="xl" />
        </Flex>
      )}
      {isError && (
        <Flex
          minH="100vh"
          align="center"
          justify="center"
          bg="black"
          color="white"
        >
          <Text fontSize="xl" color="red.500">
            Failed to load characters. Please try again later.
          </Text>
        </Flex>
      )}
      {data && (
        <InfiniteScroll
          dataLength={
            data?.pages.reduce(
              (total, page) => total + page.data.results.length,
              0
            ) ?? 0
          }
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner size="lg" mt={6} />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.9}
        >
          <SimpleGrid columns={[2, 3, 4, 6]} spacing={6}>
            {data?.pages.map(page =>
              page.data.results.map(character => (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/characters/${character.id}`}
                  key={character.id}
                  _hover={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <Box
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{
                      transform: "scale(1.03)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Flex justify="center" mt={4}>
                      <Image
                        borderRadius="full"
                        boxSize="150px"
                        src={character.image}
                        alt={character.name}
                        objectFit="cover"
                      />
                    </Flex>

                    <Box p={4} textAlign="center">
                      <Text
                        fontWeight="bold"
                        fontSize="xl"
                        color="white"
                        mb={2}
                      >
                        {character.name}
                      </Text>

                      <Badge
                        colorScheme={
                          character.status === "Alive"
                            ? "green"
                            : character.status === "Dead"
                            ? "red"
                            : "gray"
                        }
                        fontSize="md"
                        borderRadius="full"
                        px={2}
                      >
                        {character.status}
                      </Badge>

                      <Text color="gray.300" mt={2}>
                        {character.species}
                      </Text>
                      <Text color="gray.300">{character.gender}</Text>
                    </Box>
                  </Box>
                </ChakraLink>
              ))
            )}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </Flex>
  );
};

export default Characters;
