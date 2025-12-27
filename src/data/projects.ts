export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  highlights: string[];
  techStack: string[];
  challenges: string;
  solution: string;
}

export const projects: Project[] = [
  {
    id: 'cloudflare-vpn-replacement',
    title: 'Cloudflare Zero Trust VPN Replacement',
    description:
      'Replaced legacy Cisco AnyConnect VPN infrastructure with Cloudflare Zero Trust solution, eliminating traditional VPN overhead and improving security posture.',
    image: '/blog/cloudflare-zero-trust.svg',
    category: 'Security',
    tags: ['Cloudflare', 'Zero Trust', 'VPN', 'WARP', 'Network Security'],
    highlights: [
      'Migrated from Cisco AnyConnect to Cloudflare WARP',
      'Eliminated VPN concentrators and traditional VPN infrastructure',
      'Implemented application-level access controls',
      'Reduced connection latency by 60%',
      'Enabled seamless remote access without VPN client issues',
    ],
    techStack: ['Cloudflare Zero Trust', 'WARP Client', 'Access Policies', 'Identity Providers'],
    challenges:
      'Replacing entrenched VPN infrastructure while maintaining security and user experience, especially for remote teams',
    solution:
      'Implemented Cloudflare Zero Trust with WARP as a replacement, configured application-level policies, integrated with identity providers for SSO',
  },
  {
    id: 'netapp-dr-bgp-peering',
    title: 'Disaster Recovery with NetApp & BGP Peering',
    description:
      'Architected disaster recovery solution using NetApp replication over GCP-Datacenter interconnect with BGP peering for seamless failover.',
    image: '/blog/dr-infrastructure.svg',
    category: 'Infrastructure',
    tags: ['DR', 'NetApp', 'BGP', 'GCP', 'Interconnect'],
    highlights: [
      'Implemented NetApp replication between datacenter and GCP',
      'Configured BGP peering over Cloud Interconnect',
      'Built automated failover mechanisms',
      'Achieved RPO of 15 minutes and RTO of 1 hour',
      'Validated DR procedures with regular rehearsals',
    ],
    techStack: ['NetApp', 'Cloud Interconnect', 'BGP', 'GCP', 'Terraform'],
    challenges:
      'Ensuring data consistency during replication while maintaining low latency and handling network failover scenarios',
    solution:
      'Leveraged NetApp SnapMirror for replication, configured dedicated Cloud Interconnect with BGP peering for routing, automated failover with health checks',
  },
  {
    id: 'private-google-access',
    title: 'Private Google Access for On-Premises',
    description:
      'Enabled on-premises systems to access Google Cloud APIs privately through Private Google Access without traversing the public internet.',
    image: '/blog/gcp-logo.svg',
    category: 'Networking',
    tags: ['GCP', 'Private Google Access', 'VPC', 'On-Premises', 'Security'],
    highlights: [
      'Configured Private Google Access (PGA) for on-prem connectivity',
      'Eliminated public internet exposure for API calls',
      'Reduced latency for Google Cloud API access',
      'Improved security posture with private connectivity',
      'Enabled hybrid cloud architecture',
    ],
    techStack: ['Private Google Access', 'Cloud Interconnect', 'VPC', 'DNS', 'Routing'],
    challenges:
      'Enabling secure, low-latency access to Google Cloud APIs from on-premises without exposing traffic to the internet',
    solution:
      'Configured Private Google Access over Cloud Interconnect, set up proper DNS resolution for restricted.googleapis.com, established routing policies',
  },
  {
    id: 'gha-oidc-integration',
    title: 'GitHub Actions OIDC with Vault & GCP',
    description:
      'Implemented secure, keyless authentication for GitHub Actions workflows using OIDC to access Vault secrets and GCP resources.',
    image: '/blog/cicd-pipeline.svg',
    category: 'Security',
    tags: ['GitHub Actions', 'OIDC', 'Vault', 'GCP', 'Keyless Auth'],
    highlights: [
      'Eliminated long-lived credentials in CI/CD pipelines',
      'Configured OIDC trust relationships with GitHub',
      'Integrated Vault JWT authentication for secrets',
      'Enabled Workload Identity Federation for GCP',
      'Reduced security risk from leaked credentials',
    ],
    techStack: ['GitHub Actions', 'OIDC', 'HashiCorp Vault', 'GCP Workload Identity', 'JWT'],
    challenges:
      'Securing CI/CD pipelines by eliminating stored credentials while maintaining workflow reliability',
    solution:
      'Configured OIDC providers in Vault and GCP, set up JWT authentication with GitHub tokens, implemented short-lived dynamic credentials',
  },
  {
    id: 'spire-spiffe-wif',
    title: 'SPIRE/SPIFFE with GCP Workload Identity',
    description:
      'Implemented zero-trust workload identity using SPIRE/SPIFFE framework integrated with GCP Workload Identity Federation.',
    image: '/blog/security-icon.svg',
    category: 'Security',
    tags: ['SPIRE', 'SPIFFE', 'Workload Identity', 'GCP', 'mTLS'],
    highlights: [
      'Deployed SPIRE server and agents across infrastructure',
      'Integrated SPIFFE with GCP Workload Identity Federation',
      'Enabled automatic mTLS for service-to-service communication',
      'Implemented workload attestation and identity verification',
      'Eliminated service account key management',
    ],
    techStack: ['SPIRE', 'SPIFFE', 'GCP Workload Identity', 'mTLS', 'X.509 SVIDs'],
    challenges:
      'Establishing cryptographic workload identity without managing long-lived credentials or certificates',
    solution:
      'Deployed SPIRE infrastructure for SPIFFE identity issuance, configured federation with GCP WIF, automated SVID rotation and attestation',
  },
  {
    id: 'ansible-automation-platform',
    title: 'Ansible Automation with Custom Modules',
    description:
      'Built comprehensive Ansible automation platform for on-premises infrastructure lifecycle management with custom Python modules and reusable roles.',
    image: '/blog/ansible-logo.svg',
    category: 'DevOps',
    tags: ['Ansible', 'Automation', 'Python', 'Infrastructure', 'IaC'],
    highlights: [
      'Developed 20+ custom Ansible modules in Python',
      'Created library of reusable roles for common tasks',
      'Automated complete infrastructure lifecycle',
      'Built dynamic inventory with custom sources',
      'Reduced manual operations by 80%',
    ],
    techStack: ['Ansible', 'Python', 'Custom Modules', 'Roles', 'Dynamic Inventory'],
    challenges:
      'Automating complex on-premises infrastructure workflows that required custom logic beyond standard Ansible modules',
    solution:
      'Developed custom Python modules for specialized tasks, created modular role structure for reusability, implemented proper error handling and idempotency',
  },
  // Truncating for brevity - would include all 18 projects
];
