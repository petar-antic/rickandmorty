import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiServices from "../services";
import { CharactersData } from "../types";

export const useCharactersInfiniteQuery = (
  filter: string = "",
  pageUrl: string = "/character"
) =>
  useInfiniteQuery<CharactersData>({
    queryKey: ["characters", filter],
    queryFn: ({ pageParam = pageUrl }) =>
      apiServices.getCharacters(pageParam as string, filter),
    getNextPageParam: lastPage => lastPage.data.info.next,
    initialPageParam: pageUrl,
  });

export const useSingleCharacterQuery = (id: number) =>
  useQuery({
    queryKey: ["singleCharacter", id],
    queryFn: () => apiServices.getSingleCharacter(id),
  });

export const useSingleEpisodeQuery = (id: number) =>
  useQuery({
    queryKey: ["singleEpisode", id],
    queryFn: () => apiServices.getSingleEpisode(id),
  });

export const useSingleLocationQuery = (id: number) =>
  useQuery({
    queryKey: ["singleLocation", id],
    queryFn: () => apiServices.getSingleLocation(id),
  });

export const useMultipleCharactersQuery = (ids: string[]) => {
  return useQuery({
    queryKey: ["multipleCharacters", ids],
    queryFn: () => apiServices.getMultipleCharacters(ids),
    enabled: ids.length > 0,
  });
};
