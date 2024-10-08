import { gql } from '@apollo/client';

export const AllPokemonsQuery = (name?: boolean, id?: boolean, type?: boolean) => {
  return gql`
    query AllPokemons(
      $limit: Int,
      $orderById: order_by,
      $orderByName: order_by,
      $name: String,
      $id: Int
      $type: Int
    ) {
      pokemon_v2_pokemonspecies(
        limit: $limit,
        order_by: {
          id: $orderById,
          name: $orderByName
        },
        where: {
          ${name ? 'name: { _iregex: $name }' : ''}
          ${id ? 'id: { _eq: $id }' : ''}
          ${type ? 'pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {type_id: {_eq: $type}}}' : ''}
        }
      ) {
        name
        id
      }
    }
  `;
}

export const PokemonQuery = gql`
  query Pokemon(
    $_eq: Int
  ) {
    pokemon_v2_pokemon(
      where: {
        id: {
          _eq: $_eq
        }
      }
    ) {
      id
      name
      weight
      height
      pokemon_v2_pokemonmoves(limit: 2) {
        pokemon_v2_move {
          name
          id
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        id
        pokemon_v2_stat {
          id
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(limit: 1) {
          flavor_text
        }
        generation_id
      }
    }
  }
`;
