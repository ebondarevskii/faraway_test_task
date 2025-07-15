export interface Character {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  url: string;
}

export interface CharacterShort {
  uid: string;
  name: string;
}

export interface SearchCharacter {
  description: string;
  properties: Character;
  uid: string;
}

export interface CharacterApiResult {
  total_records: number;
  total_pages: number;
  results: CharacterShort[];
}

export interface SearchCharacterApiResult {
  result: SearchCharacter[];
}
