export type Order_by = 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last';

export interface AllPokemonsQueryResponse {
  pokemon_v2_pokemonspecies: {
    id: number;
    name: string;
  }[];
}

export interface AllPokemonsQueryVariables {
  limit?: number;
  orderById?: Order_by;
  orderByName?: Order_by;
  name?: string;
  id?: number;
  type?: number;
}

export interface PokemonQueryResponse {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
    weight: number;
    height: number;
    pokemon_v2_pokemonmoves: {
      pokemon_v2_move: {
        name: string;
        id: number;
      }
    }[];
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        name: string;
        id: number;
      }
    }[];
    pokemon_v2_pokemonstats: {
      base_stat: number;
      id: number;
      pokemon_v2_stat: {
        id: number;
      }
    }[];
    pokemon_v2_pokemonspecy: {
      pokemon_v2_pokemonspeciesflavortexts: {
        flavor_text: string;
      }[];
      generation_id: number;
    };
  }[];
}

export interface PokemonQueryVariables {
  _eq: number;
}