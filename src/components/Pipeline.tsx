import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stages = [
  {
    title: 'Git Push',
    icon: '📝',
    description: 'Code changes\npushed to GitHub',
    details: [
      'Triggers CI/CD pipeline',
      'Branch protection rules',
      'Pull request validation',
      'Concurrency checks',
    ],
    color: '#2088FF',
    underlineColor: '#2088FF',
  },
  {
    title: 'Validation',
    icon: '🔍',
    description: 'Code quality and\ntype safety',
    details: [
      'ESLint checks',
      'Prettier formatting',
      'TypeScript validation',
      'Dependency verification',
    ],
    color: '#6366f1',
    underlineColor: '#6366f1',
  },
  {
    title: 'Build & Test',
    icon: '🔨',
    description: 'Project compilation\nand testing',
    details: ['Node.js setup', 'Dependency installation', 'Astro site build', 'Build verification'],
    color: '#FF5D01',
    underlineColor: '#FF5D01',
  },
  {
    title: 'Deploy',
    icon: '🚀',
    description: 'Cloudflare Pages\ndeployment',
    details: [
      'Pages deployment',
      'KV namespace setup',
      'Environment config',
      'Status verification',
    ],
    color: '#F6821F',
    underlineColor: '#F6821F',
  },
];

export const Pipeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="pipeline"
    >
      <div className="pipeline-container">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            className="pipeline-stage"
            initial={{ x: 20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{
              backgroundColor: `${stage.color}08`,
              border: `1px solid ${stage.color}20`,
              boxShadow: 'none',
            }}
          >
            <div className="stage-content">
              <div className="stage-header">
                <div className="stage-icon">{stage.icon}</div>
                <h3
                  style={{
                    color: stage.color,
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {stage.title}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: stage.underlineColor,
                      opacity: 0.8,
                    }}
                  />
                </h3>
              </div>
              <p>{stage.description}</p>
              <ul className="stage-details">
                {stage.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
            {index < stages.length - 1 && (
              <div className="arrow-container">
                <div className="arrow-line" style={{ backgroundColor: stage.color }}></div>
                <div className="arrow-head" style={{ color: stage.color }}>
                  ▶
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <style>{`
        .pipeline {
          width: 100%;
          margin: 1.5rem 0;
          padding: 0;
        }
        
        .pipeline-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
          width: 100%;
        }
        
        .pipeline-stage {
          padding: 1rem;
          border-radius: 12px;
          position: relative;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        .stage-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stage-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        
        .stage-text {
          flex: 1;
        }
        
        .pipeline-stage:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .stage-icon {
          font-size: 1.25rem;
        }
        
        .pipeline-stage h3 {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          flex: 1;
        }
        
        .pipeline-stage p {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .stage-details {
          margin: 0;
          padding-left: 1.25rem;
          list-style-type: disc;
          font-size: 0.8rem;
        }

        .stage-details li {
          margin: 0.25rem 0;
          opacity: 0.8;
        }

        .arrow-container {
          position: absolute;
          top: 50%;
          right: -1rem;
          transform: translateY(-50%);
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .arrow-line {
          width: 0.75rem;
          height: 2px;
          opacity: 0.6;
        }

        .arrow-head {
          font-size: 0.8rem;
          line-height: 1;
          position: absolute;
          right: -0.25rem;
          opacity: 0.8;
        }

        @media (max-width: 1024px) {
          .pipeline-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .arrow-container {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .pipeline-container {
            grid-template-columns: 1fr;
          }
          
          .pipeline-stage {
            padding: 0.75rem;
          }
          
          .stage-icon {
            font-size: 1.1rem;
          }
          
          .pipeline-stage h3 {
            font-size: 0.95rem;
          }
          
          .stage-details {
            padding-left: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};
