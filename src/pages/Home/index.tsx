import { useState } from 'react';
import { useQuery } from '@apollo/client';
import type { ReactElement } from 'react';

import { Card, FilterModal, LoadingScreen, SortModal } from '@/components';
import { AllPokemonsQuery, AllPokemonsQueryResponse, AllPokemonsQueryVariables } from '@/services';
import { useLocalStorage } from '@/hooks';

import { IconFavorite, IconFavoriteFilled, IconPokeball, IconSearch, IconSort, IconTag, IconTextFormat } from '@/assets/icons';
import styles from './styles.module.css';

type OrderBy = 'id' | 'name';
type Modals = '' | 'sort' | 'filter';

export function Home(): ReactElement {
  const [orderBy, setOrderBy] = useState<OrderBy>('name');
  const [filterBy, setFilterBy] = useState<number>(0);
  const [openModal, setOpenModal] = useState<Modals>("");
  const [search, setSearch] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isFavorites, setIsFavorites] = useState<boolean>(false);
  const [favorites] = useLocalStorage('favorites');
  const { loading, error, data } = useQuery<AllPokemonsQueryResponse, AllPokemonsQueryVariables>(AllPokemonsQuery(orderBy === 'name' && !!searchFilter , orderBy === 'id' && !!searchFilter, filterBy !== 0), {
    variables: {
      limit: 151,
      orderById: orderBy === 'id' ? 'asc' : undefined,
      orderByName: orderBy === 'name' ? 'asc' : undefined,
      id: orderBy === 'id' ? Number(searchFilter) : undefined,
      name: orderBy === 'name' ? searchFilter : undefined,
      type: filterBy !== 0 ? filterBy : undefined,
    },
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === '') {
      setSearch('')
      setSearchFilter('')
    }

    if (orderBy === 'id') {
      const value = event.target.value.replace(/\D/g, '')
      setSearch(value)
      setSearchFilter(value)
    }

    if (orderBy === 'name') {
      const value = event.target.value.replace(/[^a-zA-Z]/g, '')
      setSearch(value)
      if(value.length > 2) setSearchFilter(value)
    }
  }

  if (error) return <div>Error! {error.message}</div>

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <IconPokeball />
          <h1 className={styles.title}>Pokédex</h1>
        </div>
        <div className={styles.filters}>
          <label className={styles.search}>
            <IconSearch />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => handleSearch(event)}
            />
          </label>
          <button
            className={styles.button}
            id={isFavorites ? styles.open : ""}
            onClick={() => setIsFavorites(!isFavorites)}
          >
            {isFavorites ? <IconFavoriteFilled /> : <IconFavorite />}
          </button>
          <button
            className={styles.button}
            id={openModal === 'filter' ? styles.open : ""}
            onClick={() => {
              setOpenModal(openModal === 'filter' ? "" : "filter")
            }}
          >
            <IconSort />
          </button>
          <button
            className={styles.button}
            id={openModal === 'sort' ? styles.open : ""}
            onClick={() => {
              setOpenModal(openModal === 'sort' ? "" : "sort")
            }}
          >
            {orderBy === 'id' && <IconTag />}
            {orderBy === 'name' && <IconTextFormat />}
          </button>
          <SortModal isOpen={openModal === 'sort'} closeModal={() => setOpenModal("")} sortBy={orderBy} setSortBy={setOrderBy} />
          <FilterModal isOpen={openModal === 'filter'} closeModal={() => setOpenModal("")} filterBy={filterBy} setFilterBy={setFilterBy} />
        </div>
      </header>
      <section className={styles.content}>
        {loading ? (
          <LoadingScreen />
        ) : (
          data?.pokemon_v2_pokemonspecies
            .filter((pokemon) => !isFavorites || favorites.includes(pokemon.id))
            .map((pokemon) => (
              <div key={pokemon.id} id={`pokemon-${pokemon.id}`}>
                <Card id={pokemon.id} name={pokemon.name} />
              </div>
            ))
        )}
      </section>
    </main>
  )
}
