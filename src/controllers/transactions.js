const { Transaction, User } = require("../../models");

exports.addTransaction = async (req, res) => {
  const { files } = req;

  try {
    const data = await Transaction.create({
      usersId: req.body.usersId,
      accountNumber: req.body.accountNumber,
      transferProof: files.imageFile[0].filename,
      remainingActive: 0,
      userStatus: 0,
      paymentStatus: "Pending",
    });

    
    const transaction = await Transaction.findOne({
      where: { id: data.id },
      attributes: {
        exclude: ["usersId", "createdAt", "updatedAt"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "Success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
      response: files,
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transaction2 = await Transaction.findOne({
      where: { id },
    });

    if (!transaction2) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    await Transaction.update(
      {

        remainingActive: req.body.remainingActive,
        userStatus: req.body.userStatus,
        paymentStatus: req.body.paymentStatus,
      },
      {
        where: { id },
      }
    );

    const transaction = await Transaction.findOne({
      where: { id },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["usersId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      messages: "Transaction Successfully Edited",
      data: {
        transaction,
      },
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["usersId", "createdAt", "updatedAt"],
      },
    });

    if (!transaction) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    res.send({
      messages: "Transaction Successfully Retrieved",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["email", "password", "role", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["usersId", "createdAt", "updatedAt"],
      },
    });

    if (!transactions) {
      return res.status(400).send({
        status: "Server Error",
        error: {
          message: "Data Transaction Not Found",
        },
      });
    }

    res.send({
      messages: "Transaction Successfully Retrieved",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
