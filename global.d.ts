// global.d.ts
declare global {
  interface Window {
    transitionToPage: (href: string) => void;
  }
}
export {};
