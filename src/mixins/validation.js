const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
export const email = val => !val || emailPattern.test(val) || 'Not a valid email address';
export const required = val => !!val || 'Field is required';

export const mobile = val => !!val && val.toString().length==8 || '8 digits only';

export const notreqmobile = val => !val || val.toString().length==8 || '8 digits only';






