import React, { useEffect, useState } from 'react';
import styles from './VisitCounter.module.css';

interface VisitCounterProps {
  path: string;
}

const VisitCounter: React.FC<VisitCounterProps> = ({ path }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const incrementCount = async () => {
      try {
        const response = await fetch(`/api/visit-counter${path}`, {
          method: 'POST',
        });
        const data = await response.json();
        setCount(data.total);
      } catch (error) {
        console.error('Error incrementing visit count:', error);
      }
    };

    incrementCount();
  }, [path]);

  if (count === null) return null;

  return (
    <div className={styles.visitCounter}>
      <span title="Visit Count" role="img" aria-label="visitors">
        👀
      </span>
      <span>{count} views</span>
    </div>
  );
};

export default VisitCounter;
