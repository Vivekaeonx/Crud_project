const usermodel = require("../model/user.model");
const uservalidator = require("../validations/user_validation");



exports.AddUser = async (req, res) => {
  try {

    const { error, value } = uservalidator.createUser(req.body);      //  JOI validation error hadnling

    if (error) {
      return res.status(400).json({
        error: true,
        message: "Invalid data",
        data: error.details.map(err => err.message.replace(/"/g, ""))
      });
    }
    usermodel.AddUser(value, (err, result) => {           // DB Error Handling
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {        // can't enter the data already inserted
          return res.status(400).json({
            error: true,
            message: "Invalid data",
            data: [
              {
                message: "Rollno already exists"
              }
            ]
          });
        }
        return res.status(400).json({
          error: true,
          message: "Database error",
          data: [
            {
              message: err.message
            }
          ]
        });
      }
      return res.status(201).json({
        error: false,
        message: "User created successfully"
      });
    });

  } catch (err) {                           // If unexpected error occurs
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
};

    
exports.updateUser = async (req, res) => {                    //Update JOI + db error Handling
  try {

// const userid = req.params.id; // get id from URL
// req.body.id = userid;          // add id to the existing body object
// console.log(req.body);
const userid = req.params.id;
const data = { ...req.body, id: userid };
const { error, value } = uservalidator.updateUser(data);


console.log("jioiiii-->",value)

    if (error) {
      return res.status(400).json({
        error: true,
        message: "Invalid data",
        data: error.details.map(err => err.message.replace(/"/g, ""))
      });
    }

    usermodel.putUser(userid, value, (err, result) => {          // DB error handling
         if (err) {                                                 
        return res.status(400).json({
          error: true,
          message: "Database error",
          data: [{ message: err.message }]
        });
      }

      
      if (result.affectedRows === 0) {                    // No data found
        return res.status(404).json({
          error: true,
          message: "Data does not exist"
        });
      }
      if (result.changedRows === 0) {                   // Data already same
        return res.status(200).json({
          error: false,
          message: "Data already updated"
        });
      }
      return res.status(200).json({
        error: false,
        message: "User updated successfully"
      });
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    });
  }
};


exports.get = (req, res) => {
  const id = req.params.id;

  // Joi validation
  const { error, value } = uservalidator.getUser({id});
  if (error) {
    return res.status(400).json({
      error: true,
      message: "Invalid data",
      data: error.details.map(err =>err.message.replace(/"/g, "")
      )
    });
  }

  // DB call
  usermodel.getUserId(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Error in fetching the data"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Data doesn't exist"
      });
    }

    return res.status(200).json({
      error: false,
      data: result
    });
  });
  };




exports.createUser = (req, res) => {
  const { s_name, s_rollno, s_std, s_dob, gender, adress } = req.body;
    const data ={
        s_name,
        s_rollno,
        s_std,
        s_dob,
        gender,
        adress
    }
  usermodel.AddUser(data, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          error: true,
          message: "Invalid Data",
          data: [
            {
              field: "s_rollno",
              message: "Rollno already exist",
            },
          ],
        });
    }
      return res.status(400).json({
        error: true,
        message: "Database error",
        data: [
          {
            message: err.message,
          },
        ],
      });
    }
    res.json({message:"Data inserted successfully..."});
  });
};




exports.Dell = (req, res) => {
  const id = req.params.id;

  const { error, value } = uservalidator.deleteUser({id});
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Invalid data",
        data: error.details.map(err => err.message.replace(/"/g, ""))
      });
    }

  usermodel.DellUser(id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.json({
        error: false,
        message: "Data Already deleted",
      });
    }
    res.json({
      error: false,
      message: "Data deleted sucessfully",
    });
  });
};
