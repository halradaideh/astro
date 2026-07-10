export function certificateFallbackLabel(name: string): string {
  const words = name.split(' ').filter((word) => /[A-Za-z0-9]/.test(word[0]));
  const acronym = words.find((word) => /^[A-Z0-9]{2,6}$/.test(word));
  if (acronym) return acronym;
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}
