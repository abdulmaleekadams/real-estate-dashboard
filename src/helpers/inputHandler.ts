export const fieldIsNull = (data: string[]) => {
  const emptyInput = data.some(
    (field: string) =>
      field === null || field === undefined || field.trim() === ''
  );

  return emptyInput;
};

export const validateEmail = (email: string) => {
  const emailRegex: RegExp = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u');

  return emailRegex.test(email);
};
