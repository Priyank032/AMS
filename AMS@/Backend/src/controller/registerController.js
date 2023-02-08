const CompanyRegistration = require("../models/companyresgistration");
const AdminRegistration = require("../models/AdminModel");
const asyncHandler = require("express-async-handler");


const registerUser=asyncHandler(async (req, res) => {

    const {email} = req.body;
    const userExists = await CompanyRegistration.findOne({email});

    if(userExists) {
        res.status(400)
        throw new Error("User already Exists");
    } 
   
      const user =await  CompanyRegistration.create(req.body)
      if(user) {
        res.status(201).json(user);
      } else {
        res.status(400)
          throw new Error("Error Occured") 
      }
    
})

// const registerAdmin=asyncHandler(async (req, res) => {

//   const {email} = req.body;
//   const userExists = await AdminRegistration.findOne({email});

//   if(userExists) {
//       res.status(400)
//       throw new Error("User already Exists");
//   } 
 
//     const user =await  AdminRegistration.create(req.body)
//     if(user) {
//       res.status(201).json(user);
//     } else {
//       res.status(400)
//         throw new Error("Error Occured") 
//     }
  
// })


const allUsers = asyncHandler(async (req, res) => {
  // const { AdminId } = req.body;
  //console.log(institutionId);

  const AllUsersData = await CompanyRegistration.find();
  // const createUser = await user.save()
  // res.status(201).send(teachersData);
  if (!AllUsersData) {
      res.status(400);
      throw new Error();
  } else {
      res.status(201).send(AllUsersData);
  }
});


const getUserById = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  const userData = await CompanyRegistration.findById(_id);
  // const createUser = await user.save()
  // res.status(201).send(teachersData);
  if (!userData) {
      res.status(400);
      throw new Error("Data not Found");
  } else {
      res.status(201).send(userData);
  }
});


const updateUser = asyncHandler(async (req, res) => {

  const _id = req.params.id;
  //console.log(req.params.name);
  const updateUserData = await CompanyRegistration.findByIdAndUpdate(_id, req.body, {
      new: true
  });
  if (!updateUserData) {
      res.status(400);
      throw new Error("Data not updated ");
  } else {
      res.status(201).send(updateUserData);
  }
})

const deleteUser = asyncHandler(async (req, res) => {


  const _id = req.params.id;
  try {
      const deleteUserData = await CompanyRegistration.findByIdAndDelete(_id);
      res.status(201).send(deleteUserData);
  } catch (error) {
      res.status(400);
      throw new Error("Data not deleted ");
  }

})

module.exports={registerUser,allUsers,getUserById,updateUser,deleteUser};