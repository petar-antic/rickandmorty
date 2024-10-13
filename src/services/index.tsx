import axiosInstance from "../config/axiosInstance";
import {
  CharactersData,
  MultiCharactersData,
  SingleCharacterData,
  SingleEpisodeData,
  SingleLocationData,
} from "../types/";

const apiServices = {
  getCharacters: (url: string, filter: string) => {
    const paramsObject = filter ? { params: { name: filter } } : {};
    return axiosInstance.get<null, CharactersData>(url, paramsObject);
  },
  getSingleCharacter: (id: number) =>
    axiosInstance.get<null, SingleCharacterData>(`/character/${id}`),
  getSingleEpisode: (id: number) =>
    axiosInstance.get<null, SingleEpisodeData>(`/episode/${id}`),
  getSingleLocation: (id: number) =>
    axiosInstance.get<null, SingleLocationData>(`/location/${id}`),
  getMultipleCharacters: (ids: string[]) =>
    axiosInstance.get<null, MultiCharactersData>(`/character/${ids.join(",")}`),
};

export default apiServices;
