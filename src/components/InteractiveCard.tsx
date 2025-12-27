import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './InteractiveCard.module.css';

interface InteractiveCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function InteractiveCard({
  title,
  description,
  className = '',
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles['interactive-card']} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles['card-background']}
        animate={{
          background: isHovered
            ? 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-color-dark) 100%)'
            : 'var(--card-bg)',
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className={styles['card-content']}
        animate={{
          y: isHovered ? -5 : 0,
        }}
      >
        <h3 className={styles['card-title']}>{title}</h3>
        <motion.p
          className={styles['card-description']}
          animate={{
            color: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'var(--text-muted)',
          }}
        >
          {description}
        </motion.p>
      </motion.div>
      <motion.div
        className={styles['card-shine']}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
