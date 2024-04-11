export type ErrorResponse = {
  errorMessage: string;
  errorsValidation: ErrorValidation[] | string[] | any;
};

export type ErrorValidation = { [key: string]: string };
