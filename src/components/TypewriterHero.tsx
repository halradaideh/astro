import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './TypewriterHero.module.css';

interface TypewriterHeroProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  children?: ReactNode;
}

export default function TypewriterHero({
  titles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  children,
}: TypewriterHeroProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentTitle.length) {
            setCurrentText(currentTitle.slice(0, currentText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next title
            setIsDeleting(false);
            setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentTitleIndex,
    titles,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={styles['typewriter-container']}
    >
      <h1 className={styles['typewriter-name']}>Hamdan Radaideh</h1>
      <div className={styles['typewriter-title']}>
        <span className={styles['typewriter-text']}>{currentText}</span>
        <span className={styles['typewriter-cursor']}>|</span>
      </div>
      {children}
    </motion.div>
  );
}
