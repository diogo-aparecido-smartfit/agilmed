export function formatFileName(fileName: string): string {
  return fileName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_\.]/g, "");
}
