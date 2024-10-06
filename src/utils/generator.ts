export function generateCode(identifierLength: number = 3): string {
  const fixedChar = 'P';
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // MM
  const day = now.getDate().toString().padStart(2, '0'); // DD
  const uniqueIdentifier = generateUniqueIdentifier(identifierLength); // Generate custom unique identifier

  return `${fixedChar}-${month}${day}-${uniqueIdentifier}`;
}
export function generateUniqueIdentifier(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
