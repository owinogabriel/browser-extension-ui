// The 'clsx' library is a tiny utility for conditionally joining CSS class names together.
// 'ClassValue'  type provided by 'clsx' to defining
// possible inputs the function can accept (e.g., strings, objects, arrays).
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
