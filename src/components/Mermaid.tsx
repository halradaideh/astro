import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import styles from './Mermaid.module.css';

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detect initial theme
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    setCurrentTheme(theme as 'light' | 'dark');

    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent) => {
      setCurrentTheme(e.detail.theme);
    };

    document.addEventListener('theme-changed', handleThemeChange as EventListener);

    return () => {
      document.removeEventListener('theme-changed', handleThemeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart) return;

      // Initialize mermaid with theme
      mermaid.initialize({
        startOnLoad: false,
        theme: currentTheme === 'dark' ? 'base' : 'default',
        securityLevel: 'loose',
        themeVariables:
          currentTheme === 'dark'
            ? {
                darkMode: true,
                background: '#1e293b',
                primaryColor: '#334155',
                secondaryColor: '#475569',
                tertiaryColor: '#1e293b',
                primaryBorderColor: '#64748b',
                secondaryBorderColor: '#64748b',
                tertiaryBorderColor: '#64748b',
                primaryTextColor: '#f1f5f9',
                secondaryTextColor: '#f1f5f9',
                tertiaryTextColor: '#f1f5f9',
                lineColor: '#94a3b8',
                textColor: '#f1f5f9',
                mainBkg: '#334155',
                secondBkg: '#475569',
                tertiaryBkg: '#1e293b',
                nodeBorder: '#64748b',
                clusterBkg: '#1e293b',
                clusterBorder: '#64748b',
                defaultLinkColor: '#94a3b8',
                titleColor: '#f1f5f9',
                edgeLabelBackground: '#1e293b',
                nodeTextColor: '#f1f5f9',
                fillType0: '#334155',
                fillType1: '#475569',
                fillType2: '#1e293b',
                fillType3: '#334155',
                fillType4: '#475569',
                fillType5: '#1e293b',
                fillType6: '#334155',
                fillType7: '#475569',
              }
            : {},
      });

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        let { svg } = await mermaid.render(id, chart);

        // Post-process SVG for dark mode to replace light backgrounds
        if (currentTheme === 'dark') {
          // Replace common light fill colors with dark ones (both attributes and inline styles)
          svg = svg
            // Attribute replacements
            .replace(/fill="#fff3cd"/g, 'fill="#334155"') // Yellow backgrounds
            .replace(/fill="#e7f3ff"/g, 'fill="#334155"') // Light blue backgrounds
            .replace(/fill="#d4edda"/g, 'fill="#334155"') // Light green backgrounds
            .replace(/fill="#f8f9fa"/g, 'fill="#334155"') // Light gray backgrounds
            .replace(/fill="#ffffff"/g, 'fill="#334155"') // White backgrounds
            .replace(/fill="white"/g, 'fill="#334155"')
            .replace(/fill="#ffffde"/g, 'fill="#334155"') // Light yellow
            .replace(/fill="#ffffed"/g, 'fill="#334155"') // Very light yellow
            .replace(/fill="#ECECFF"/g, 'fill="#334155"') // Very light blue/lavender
            .replace(/fill="#ececff"/g, 'fill="#334155"') // Very light blue (lowercase)
            .replace(/fill="#e0e0ff"/g, 'fill="#334155"') // Light blue
            .replace(/fill="#ccccff"/g, 'fill="#334155"') // Light blue
            .replace(/fill="#b3b3ff"/g, 'fill="#334155"') // Light blue
            // Inline style replacements (with and without !important)
            .replace(/fill:\s*#fff3cd\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#e7f3ff\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#d4edda\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#ECECFF\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#ececff\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#ffffff\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*white\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:\s*#fff\s*!important/g, 'fill:#334155 !important')
            .replace(/fill:white/g, 'fill:#334155')
            .replace(/fill:#fff;/g, 'fill:#334155;')
            .replace(/fill:#ffffff/g, 'fill:#334155')
            .replace(/fill:#e7f3ff/g, 'fill:#334155')
            .replace(/fill:#ECECFF/g, 'fill:#334155')
            .replace(/fill:#ececff/g, 'fill:#334155');
        }

        setSvg(svg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    renderDiagram();
  }, [chart, currentTheme]);

  return (
    <div
      ref={containerRef}
      className={styles.mermaidContainer}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
