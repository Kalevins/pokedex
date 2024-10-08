import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { fixId } from '@/utils';

import styles from './styles.module.css';

interface CardProps {
  id: number,
  name: string
}

export const Card = ({ id, name}: CardProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/details/${id}`)}>
      <div className={styles.id}>
        <small>{`#${fixId(id)}`}</small>
      </div>
      <div className={styles.image}>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name} />
      </div>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
    </div>
  )
}