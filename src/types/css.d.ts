declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}
