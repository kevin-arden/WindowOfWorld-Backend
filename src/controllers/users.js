const { User } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      messages: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      messages: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({
      where: { id },
      attributes: {
        exclude: [
          "email",
          "fullName",
          "password",
          "role",
          "gender",
          "mobilePhone",
          "address",
          "profilePicture",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    if (!data)
      return res.status(400).send({
        message: "Email not found",
      });

    await User.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
