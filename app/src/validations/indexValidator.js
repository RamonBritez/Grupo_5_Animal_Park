const { validationResult } = require("express-validator")

function validate(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.mapped();
    console.log("---------------------------------\nERROR\n---------------------------------")
    console.log(extractedErrors)

    return res.status(422).json({ errors: extractedErrors })
}

module.exports = validate;