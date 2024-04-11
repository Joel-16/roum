import { RequestHandler } from "express";

import { CustomError } from "../utils/response/custom-error/CustomError";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export const validationMiddleware = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
  ): RequestHandler => {
    return (req, res, next) => {
      validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message: any = errors.map((error: ValidationError) => {
            if(error.constraints){
              return {
                property: error.property,
                error: Object.values(error.constraints)
              }
            } else {
              return {
                property: error.property,
                error: error.children.map((error: ValidationError) => Object.values(error.constraints))
              }
            }
          });
          next(new CustomError(400, "validation error", message));
        return
        } else {
          next();
        }
      });
    };
  };

