export function kebabToPascalCase(input: string) {
  return input
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}
