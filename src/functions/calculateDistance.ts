export default function calculatePoints(guess: string, answer: string) {
  // Convert the hex strings to RGB objects
  const rgb1 = hexToRgb(guess);
  const rgb2 = hexToRgb(answer);

  // Calculate the Euclidean distance between the RGB values
  const distance = Math.sqrt(
    Math.pow(rgb2.r - rgb1.r, 2) +
      Math.pow(rgb2.g - rgb1.g, 2) +
      Math.pow(rgb2.b - rgb1.b, 2)
  );

  return distance;
}

/**
 * Converts a hex color string to an RGB object.
 * @param hex The hex color string (e.g., "#RRGGBB").
 * @returns An object with 'r', 'g', and 'b' properties representing the RGB values.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the '#' symbol if present
  hex = hex.replace(/^#/, "");

  // Parse the hex color
  const bigint = parseInt(hex, 16);

  // Extract RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
