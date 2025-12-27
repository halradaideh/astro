import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SkillBars.module.css';

interface Skill {
  name: string;
  level: number;
  color?: string;
}

interface SkillBarsProps {
  skills: Skill[];
}

export default function SkillBars({ skills }: SkillBarsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [animatedValues, setAnimatedValues] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    if (inView) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = skill.level;
            return newValues;
          });
        }, index * 100);
      });
    }
  }, [inView, skills]);

  return (
    <div ref={ref} className={styles['skill-bars-container']}>
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className={styles['skill-item']}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={styles['skill-header']}>
            <span className={styles['skill-name']}>{skill.name}</span>
            <span className={styles['skill-percentage']}>{animatedValues[index]}%</span>
          </div>
          <div className={styles['skill-bar-background']}>
            <motion.div
              className={styles['skill-bar-fill']}
              style={{
                backgroundColor: skill.color || 'var(--accent-color)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${animatedValues[index]}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
