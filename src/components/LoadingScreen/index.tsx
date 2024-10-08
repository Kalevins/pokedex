import type { ReactElement } from 'react';

import styles from './styles.module.css';

export const LoadingScreen = (): ReactElement => {
  return (
    <main className={styles.main}>
      <div className={styles.spinner} />
    </main>
  )
}