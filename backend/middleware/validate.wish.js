import { body, validationResult } from "express-validator";

const validateWish = [
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description must be a non-empty string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateWish;