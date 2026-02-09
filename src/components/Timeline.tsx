import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Timeline.module.css';

interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  description: string[];
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles['timeline-container']}>
      {items.map((item, index) => (
        <TimelineItemComponent key={index} item={item} index={index} totalItems={items.length} />
      ))}
    </div>
  );
}

function TimelineItemComponent({
  item,
  index,
  totalItems,
}: {
  item: TimelineItem;
  index: number;
  totalItems: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={styles['timeline-item']}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles['timeline-marker']}>
        <motion.div
          className={styles['timeline-dot']}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
        >
          {item.icon && <span className={styles['timeline-icon']}>{item.icon}</span>}
        </motion.div>
        {index !== totalItems - 1 && <div className={styles['timeline-line']} />}
      </div>
      <motion.div
        className={styles['timeline-content']}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles['timeline-date']}>{item.date}</div>
        <h3 className={styles['timeline-title']}>{item.title}</h3>
        {item.company && <div className={styles['timeline-company']}>{item.company}</div>}
        <ul className={styles['timeline-description']}>
          {item.description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
