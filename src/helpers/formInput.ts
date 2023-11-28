export const AgentsFormDetails = [
  {
    name: 'firstname',
    placeholder: 'First name',
    labelName: 'First name',
    type: 'text',
    errorMessage: '',
  },
  {
    name: 'lastname',
    placeholder: 'Last name',
    labelName: 'Last name',
    type: 'text',
    errorMessage: '',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    labelName: 'Phone',
    type: 'text',
    pattern: /^\d{10}$/, // Example regex for a 10-digit phone number
    errorMessage: 'Please enter a valid 10-digit phone number.',
  },
  {
    name: 'dob',
    placeholder: 'DD-MM-YYYY',
    labelName: 'Date of birth',
    type: 'text',
    pattern: /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
    errorMessage: 'Invalid date format. Please use DD-MM-YYYY.',
  },
  {
    name: 'email',
    placeholder: 'Email',
    labelName: 'Email',
    type: 'text',
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    name: 'properties',
    placeholder: 'Number of Properties',
    labelName: 'Properties',
    type: 'text',
    pattern: /^\d+$/, // Only allow positive integers
    errorMessage: 'Number of properties must be a valid positive integer.',
  },
];
