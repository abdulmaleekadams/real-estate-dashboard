export const validateFormDetails = (formDetails?: any, formDetailStructure?: Array<any>) => {
  const hasError = formDetailStructure?.some(({ name, pattern }) => {
    const value = formDetails[name];

    if (pattern && typeof value === 'string') {
      // Handle pattern validation for fields with a pattern
      return !pattern.test(value.trim());
    } else if (typeof value === 'string') {
      // Handle general string validation (empty or whitespace)
      return value.trim() === '';
    } else {
      // Handle validation for other types (e.g., number)
      return value === null || value === undefined;
    }
  });

  const hasNull = Object.values(formDetails).some((value) => {
    if (typeof value === 'string') {
      // Handle general string validation (empty or whitespace)
      return value.trim() === '';
    } else {
      return value === null || value === undefined;
    }
  });

  const errorExist = hasError === false && hasNull === false ? false : true;

  return errorExist;
};
