import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

enum RequestSections {
  Body = "body",
  Parameters = "params",
}

interface ValidationSchema {
  section: RequestSections;
  schema: Schema;
}

function validator(validationSchema: ValidationSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { schema, section } = validationSchema;
    const value = request[section];
    const { error } = schema.validate(value);
    if (error) {
      return response.sendStatus(400);
    }
    return next();
  };
}

export { RequestSections, ValidationSchema, validator };
