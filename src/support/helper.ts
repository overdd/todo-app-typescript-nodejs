export function parseNumber(input: string): number {
  try {
    const result = Number(input);
    if (Number.isNaN(result)) {
        console.log(`Not a number: ${input}`);
        return NaN;
    } else {
        return result;
    }
  } catch (error) {
    console.log(`Error parsing number: ${input}`);
    return NaN;    
  }
}
