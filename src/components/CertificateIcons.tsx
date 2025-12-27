import { motion } from 'framer-motion';
import styles from './CertificateIcons.module.css';

export interface CertificateIcon {
  name: string;
  imageUrl: string;
  credlyUrl: string;
}

interface CertificateIconsProps {
  certificates: CertificateIcon[];
}

export default function CertificateIcons({ certificates }: CertificateIconsProps) {
  return (
    <div className={styles['certificate-icons']}>
      {certificates.map((cert, index) => (
        <motion.a
          key={index}
          href={cert.credlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['cert-icon']}
          title={cert.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.15, y: -3 }}
        >
          <img src={cert.imageUrl} alt={cert.name} loading="eager" />
        </motion.a>
      ))}
    </div>
  );
}
