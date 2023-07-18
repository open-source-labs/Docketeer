// scrollPosition.ts
let scrollPosition = 0;

export const getScrollPosition = () => scrollPosition;
export const setScrollPosition = (position: number) =>
  (scrollPosition = position);
