interface LayerProps {
  title: string;
  items: Array<{
    name: string;
    description: string;
    color: string;
  }>;
  delay: number;
}

const Layer = ({ title, items }: Omit<LayerProps, 'delay'>) => (
  <div className="layer">
    <div className="layer-title">{title}</div>
    <div className="layer-content">
      {items.map((item) => (
        <div
          key={item.name}
          className="tech-item"
          style={{
            backgroundColor: `${item.color}15`,
            border: `1px solid ${item.color}40`,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="tech-header"
            style={{
              color: '#6366f1',
              borderBottom: `2px solid ${item.color}`,
              paddingBottom: '4px',
              fontWeight: '700',
            }}
          >
            {item.name}
          </div>
          <div className="tech-description">{item.description}</div>
        </div>
      ))}
    </div>
  </div>
);

export const TechStack = () => {
  const layers = [
    {
      title: 'Frontend',
      items: [
        {
          name: 'Astro',
          description: 'Zero-JS framework with islands',
          color: '#FF5D01',
        },
        {
          name: 'React',
          description: 'Interactive components',
          color: '#61DAFB',
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          name: 'MDX',
          description: 'Rich content authoring',
          color: '#1B1F24',
        },
        {
          name: 'TypeScript',
          description: 'Type-safe development',
          color: '#3178C6',
        },
      ],
    },
    {
      title: 'Deploy',
      items: [
        {
          name: 'GitHub Actions',
          description: 'CI/CD pipeline',
          color: '#2088FF',
        },
        {
          name: 'Cloudflare',
          description: 'Edge hosting & KV storage',
          color: '#F6821F',
        },
      ],
    },
  ];

  return (
    <div className="tech-stack">
      <style>{`
        .tech-stack {
          padding: 1.5rem;
          background: var(--code-bg);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          color: #000000;
        }

        .layer {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .layer-title {
          flex: 0 0 100px;
          font-weight: 600;
          color: #000000;
          font-size: 1rem;
          padding-top: 0.75rem;
        }

        .layer-content {
          flex: 1;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .tech-item {
          padding: 0.75rem;
          border-radius: 8px;
          min-width: 180px;
          flex: 1;
          position: relative;
          background-color: var(--bg);
        }

        :global(body.theme-loaded) .tech-item {
          transition: all 0.2s ease;
        }

        .tech-item:hover {
          transform: translateY(-2px);
        }

        .tech-header {
          font-weight: 700;
          margin-bottom: 0.25rem;
          font-size: 1rem;
          color: #6366f1;
        }

        .tech-description {
          color: #000000;
          font-size: 0.85rem;
          line-height: 1.4;
          font-weight: 500;
        }

        :global([data-theme='dark']) .tech-stack,
        :global([data-theme='dark']) .tech-description,
        :global([data-theme='dark']) .layer-title {
          color: #ffffff;
        }
        
        :global([data-theme='dark']) .tech-item .tech-header {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .layer {
            flex-direction: column;
            gap: 0.5rem;
          }

          .layer-title {
            flex: none;
            padding-top: 0;
          }

          .tech-item {
            min-width: 100%;
          }
        }
      `}</style>
      {layers.map((layer) => (
        <Layer key={layer.title} title={layer.title} items={layer.items} />
      ))}
    </div>
  );
};
