export interface Certificate {
  name: string;
  imageUrl: string;
  credlyUrl: string;
}

export const certificates: Certificate[] = [
  {
    name: 'Google Cloud Professional Cloud Architect',
    imageUrl:
      'https://images.credly.com/size/680x680/images/71c579e0-51fd-4247-b493-d2fa8167157a/image.png',
    credlyUrl: 'https://www.credly.com/badges/28faf0f7-c4bd-4982-8993-85ebb22b4017',
  },
  {
    name: 'Certified Kubernetes Administrator',
    imageUrl:
      'https://images.credly.com/size/680x680/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
    credlyUrl: 'https://www.credly.com/badges/e3e549f9-0cc9-466a-92da-e5e06243a8e6',
  },
  {
    name: 'GitHub Actions',
    imageUrl:
      'https://images.credly.com/size/680x680/images/89efc3e7-842b-4790-b09b-9ea5efc71ec3/image.png',
    credlyUrl: 'https://www.credly.com/badges/312ac168-3bd2-4ff1-a7bc-e64e64ddedcb',
  },
  {
    name: 'GIAC Advisory Board',
    imageUrl:
      'https://images.credly.com/size/680x680/images/efd77bd2-ab34-4323-b427-47b3e7136029/image.png',
    credlyUrl: 'https://www.credly.com/badges/acc24d28-6a66-4a92-8fac-863b8992ae49',
  },
  {
    name: 'GIAC Security Essentials (GSEC)',
    imageUrl:
      'https://images.credly.com/size/680x680/images/8e6bde54-8a33-4ec0-9d70-90fcde581bcf/image.png',
    credlyUrl: 'https://www.credly.com/badges/acc24d28-6a66-4a92-8fac-863b8992ae49',
  },
];
