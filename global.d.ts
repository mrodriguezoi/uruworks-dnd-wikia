// global.d.ts
declare global {
  interface Window {
    transitionToPage: (event: MouseEvent | SubmitEvent, href: string) => void;
  }
}
export {};
