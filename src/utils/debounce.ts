/**
 * Creates a debounced version of the provided function that delays its execution
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @param {T} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds for debouncing.
 * @return {T} A new function that, when called, delays the execution of the original function
 * until after the delay duration has expired since the last invocation.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  }) as T; // Ensure the return type matches the input function type
}
