// utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T; // Ensure the return type matches the input function type
}
