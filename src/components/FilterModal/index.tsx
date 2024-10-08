import type { ReactElement } from 'react';

import styles from './styles.module.css';
import { TypesOptions } from '@/utils';

interface SortModalProps {
  isOpen: boolean;
  closeModal: () => void;
  filterBy: number;
  setFilterBy: (filterBy: number) => void;
}

export const FilterModal = ({ isOpen, closeModal, filterBy, setFilterBy }: SortModalProps): ReactElement => {
  return (
    <aside className={styles.modal} id={isOpen ? styles.open : styles.close}>
      <div className={styles.modalHeader}>
        <p>Filter by:</p>
      </div>
      <div className={styles.modalContent}>
        {TypesOptions.map((type) => (
          <div key={type.id} className={styles.radioGroup}>
            <input
              type="radio"
              id={type.name}
              name="filterBy"
              value={type.id}
              checked={filterBy === type.id}
              readOnly
              onClick={() => {
                setFilterBy(filterBy === type.id ? 0 : type.id)
                closeModal()
              }}
            />
            <label htmlFor={type.name} className={styles.radio} />
            <label htmlFor={type.name}>{type.name}</label>
          </div>
        ))}
      </div>
    </aside>
  )
}