import { useEffect, useRef } from 'react';
import styles from './ProjectsCarousel.module.css';

interface Project {
  id?: string;
  title: string;
  category: string;
  description: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (project: Project) => {
    // Generate ID from title if not provided
    const projectId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.location.href = `/projects#${projectId}`;
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack} ref={trackRef}>
        {/* Render projects twice for infinite loop effect */}
        {[...projects, ...projects].map((project, index) => (
          <div
            key={index}
            className={styles.projectCard}
            onClick={() => handleCardClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(project);
              }
            }}
          >
            <div className={styles.category}>{project.category}</div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
