export function removeWhitespace(content: string): string {
  return content.replace(/[\n\r\t\s]+/g, "");
}
