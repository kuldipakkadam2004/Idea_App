const joi = require("joi");

const ideaSchema = joi.object({
    idea_name : joi.string().required().messages({
        "any.required" : "idea_name is required",
        "string.empty" : "idea_name cannot be empty",
    }),
    author_name : joi.string().min(1).required().messages({
        "any.required" : "author_name is required",
        "string.empty" : "author_name cannot be empty",
        "string.min" : "author_name must be at least 1 characters "
    }),
    idea_description : joi.string().required().messages({
        "any.required" : "idea_description is required",
        "string.empty" : "idea_description cannot be empty"
    })
})
//we can also send original messages instead of custom messages like below : 
//idea_description : joi.string().min(5).required();
module.exports = {
    ideaSchema
}