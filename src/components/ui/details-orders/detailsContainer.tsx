import { FC, ReactNode } from 'react';
import styles from './details-container.module.css';

interface DetailsContainerProps {
  children: ReactNode;
  title: string;
}

const DetailsContainer: FC<DetailsContainerProps> = ({ children, title }) => (
  <div className={styles.container}>
    <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);

export { DetailsContainer };
