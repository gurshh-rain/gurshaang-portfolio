/**
 * Lightweight className helper. Filters out falsy values and joins strings.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
