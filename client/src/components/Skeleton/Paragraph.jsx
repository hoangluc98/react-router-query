import styles from './index.module.css';

const Paragraph = () => {
  return (
    <div>
      <div className={styles.text} style={{ width: '30%' }}></div>
      <div className={styles.text} style={{ width: '30%' }}></div>
      <div className={styles.text} style={{ width: '60%' }}></div>
      <div className={styles.text} style={{ width: '80%' }}></div>
      <div className={styles.text} style={{ width: '80%' }}></div>
      <div className={styles.text} style={{ width: '80%' }}></div>
    </div>
  );
};

export default Paragraph;
