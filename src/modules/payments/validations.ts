import joi from "joi";
import { RequestSections, ValidationSchema } from "../../utils/validation";

const productIdValidationSchema: ValidationSchema = {
  section: RequestSections.Body,
  schema: joi.object({
    productId: joi.string().required(),
  }),
};

export { productIdValidationSchema };
