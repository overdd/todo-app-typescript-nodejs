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

export function parseDate(dateString: string): Date {
  let formattedDate: Date;
  try {
    formattedDate = new Date(dateString);
    if (formattedDate.getTimezoneOffset() === 0) {
      return formattedDate;
    }
    formattedDate.setHours(0, 0, 0, 0);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth();
    const year = formattedDate.getFullYear();
    formattedDate = new Date(`${day}.${month}.${year}`);
  } catch (error) {
    console.log("Not a valid Date input");
    formattedDate = new Date("01.01.1970");
  }
  return formattedDate;
}
