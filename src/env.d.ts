/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

declare namespace astroHTML.JSX {
  interface IntrinsicAttributes {
    'client:load'?: boolean;
    'client:idle'?: boolean;
    'client:visible'?: boolean;
    'client:media'?: string;
    'client:only'?: string;
  }
}
