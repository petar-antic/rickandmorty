// Define types
export type AuthData = {
  email: string;
  password: string;
};

export type CharactersData = {
  data: {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  };
};

export type MultiCharactersData = {
  data: Character[];
};

export type SingleCharacterData = {
  data: Character;
};

export type SingleEpisodeData = {
  data: Episode;
};

export type SingleLocationData = {
  data: Location;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  characters: string[];
  created: string;
  url: string;
  episode: string;
  air_date: string;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};
