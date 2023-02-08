const TagsRegistraion = require("../models/TagsRegistraion");
const asyncHandler = require("express-async-handler");

const Add_Tags=asyncHandler(async (req, res) => {

    const {Class,tag} = req.body;
    const userExists = await TagsRegistraion.findOne({Class});

    if(userExists) {
        const saveTags = userExists.tags.push(tag)
        const result = await userExists.save();
        res.status(201).json(result);
    } 
   
    //   const user =await  TagsRegistraion.create(req.body)
    //   if(user) {
    //     res.status(201).json(user);
    //   } else {
    //     res.status(400)
    //       throw new Error("Error Occured") 
    //   }
    
})

module.exports = Add_Tags