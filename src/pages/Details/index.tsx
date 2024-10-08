import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import type { ReactElement } from 'react';

import { LoadingScreen } from '@/components';
import { PokemonQueryResponse, PokemonQueryVariables, PokemonQuery } from '@/services';
import { fixHeight, fixId, fixWeight, StatsOptions } from '@/utils';

import { IconArrowBack, IconChevronLeft, IconChevronRight, IconFavorite, IconFavoriteFilled, IconPokeball, IconStraighten, IconWeight } from '@/assets/icons';
import styles from './styles.module.css';
import { useLocalStorage } from '@/hooks';

export function Details(): ReactElement {
  const {id} = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useLocalStorage('favorites');
  const { loading, error, data } = useQuery<PokemonQueryResponse, PokemonQueryVariables>(PokemonQuery, {
    variables: {
      _eq: Number(id),
    },
  })

  const handleNavigation = (id: number) => {
    if(id < 1) return;
    navigate(`/details/${id}`);
  }

  const handleFavorite = (id: number) => {
    const index = favorites.indexOf(id)
    if (index === -1) {
      favorites.push(id)
    } else {
      favorites.splice(index, 1)
    }
    setFavorites([...favorites])
  }

  if (error) return <div>Error! {error.message}</div>

  const color = `var(--color-type-${data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name})`;

  if (!data || loading) return (
    <main className={styles.main}>
      <div className={styles.backgroundContainer} style={{ backgroundColor: color}}>
        <IconPokeball />
        <div className={styles.background} />
      </div>
      <LoadingScreen />
    </main>
  )

  return (
    <main className={styles.main}>
      <div className={styles.backgroundContainer} style={{ backgroundColor: color}}>
        <IconPokeball />
        <div className={styles.background} />
      </div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <button onClick={() => navigate('/')}>
            <IconArrowBack />
          </button>
          <h1 className={styles.title}>{data?.pokemon_v2_pokemon[0].name}</h1>
          <button onClick={() => handleFavorite(data.pokemon_v2_pokemon[0].id)}>
            {favorites.includes(data.pokemon_v2_pokemon[0].id) ? <IconFavoriteFilled /> : <IconFavorite />}
          </button>
        </div>
        <div className={styles.id}>
          <p>{`#${fixId(data?.pokemon_v2_pokemon[0].id)}`}</p>
        </div>
      </header>
      <section className={styles.content}>
        <div className={styles.pokemon}>
          <div className={styles.image}>
            <button onClick={() => handleNavigation(data.pokemon_v2_pokemon[0].id - 1)}>
              <IconChevronLeft />
            </button>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokemon_v2_pokemon[0].id}.png`} alt={data.pokemon_v2_pokemon[0].name} />
            <button onClick={() => handleNavigation(data.pokemon_v2_pokemon[0].id + 1)}>
              <IconChevronRight />
            </button>
          </div>
          <div className={styles.types}>
            {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((type, index) => (
              <p key={index} className={styles.type} style={{ backgroundColor: `var(--color-type-${type.pokemon_v2_type.name})`}}>{type.pokemon_v2_type.name}</p>
            ))}
          </div>
        </div>
        <div className={styles.about}>
          <div className={styles.subtitle} style={{ color: color}}>
            <h2>About</h2>
            <small>Generation {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.generation_id}</small>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <p><IconWeight />{fixWeight(data?.pokemon_v2_pokemon[0].weight)}</p>
              <small>Weight</small>
            </div>
            <div className={styles.metric}>
              <p><IconStraighten />{fixHeight(data?.pokemon_v2_pokemon[0].height)}</p>
              <small>Height</small>
            </div>
            <div className={styles.metric}>
              <div>
                {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves.map((move, index) => (
                  <p key={index}>{move.pokemon_v2_move.name}</p>
                ))}
              </div>
              <small>Moves</small>
            </div>
          </div>
          <p className={styles.description}>{data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text}</p>
        </div>
        <div className={styles.stats}>
          <h2 className={styles.subtitle} style={{ color: color}}>
            Base Stats
          </h2>
          <div className={styles.statsList}>
            {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <p className={styles.name} style={{color: color}}>{StatsOptions.find((option) => option.id === stat.pokemon_v2_stat.id)?.abbreviation}</p>
                <i className={styles.separator} />
                <div className={styles.barContainer}>
                  <p className={styles.value}>{fixId(stat.base_stat)}</p>
                  <div className={styles.bar}>
                    <div className={styles.background} style={{ backgroundColor: color}} />
                    <div className={styles.progress} style={{ width: `${stat.base_stat * 100 / 250}%`, backgroundColor: color}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
