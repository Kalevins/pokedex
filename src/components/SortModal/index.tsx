import type { ReactElement } from 'react';

import styles from './styles.module.css';

interface SortModalProps {
  isOpen: boolean;
  closeModal: () => void;
  sortBy: 'id' | 'name';
  setSortBy: (sortBy: 'id' | 'name') => void;
}

export const SortModal = ({ isOpen, closeModal, sortBy, setSortBy }: SortModalProps): ReactElement => {
  return (
    <aside className={styles.modal} id={isOpen ? styles.open : styles.close}>
      <div className={styles.modalHeader}>
        <p>Sort by:</p>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="id"
            name="orderBy"
            value="id"
            checked={sortBy === 'id'}
            onChange={() => {
              setSortBy('id')
              closeModal()
            }}
          />
          <label htmlFor="id" className={styles.radio} />
          <label htmlFor="id">Number</label>
        </div>
        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="name"
            name="orderBy"
            value="name"
            checked={sortBy === 'name'}
            onChange={() => {
              setSortBy('name')
              closeModal()
            }}
          />
          <label htmlFor="name" className={styles.radio} />
          <label htmlFor="name">Name</label>
        </div>
      </div>
    </aside>
  )
}