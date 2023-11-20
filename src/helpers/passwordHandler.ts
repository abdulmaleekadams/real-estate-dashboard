import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export const compareHashedPassword = async (password : string, hashedPassword: string) => {
  const passwordVerified = await bcrypt.compare(password, hashedPassword);

  return passwordVerified;
};

export const validatePasswordPattern = (passwordStr : string) => {
  // Password must be at least 6 characters and contain at least one symbol, one capital letter, and one number.
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  return passwordRegex.test(passwordStr);
};
