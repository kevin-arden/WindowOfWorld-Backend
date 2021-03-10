const express = require("express");
const router = express.Router();
const { authenticated, isAdmin, checkAuth } = require("../middleware/auth");

//users
const { getUsers, getSingleUser, deleteUser } = require("../controllers/users");

//auth
const { register } = require("../controllers/register");

const { login } = require("../controllers/login");

const { uploadFile } = require("../middleware/upload");


//books
const {
  getBooks,
  getDetailBook,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/books");

const {
  getAllTransactions,
  getTransaction,
  editTransaction,
  addTransaction,
} = require("../controllers/transactions");

//users
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getSingleUser);

//books
router.get("/books", getBooks);
router.get("/book/:id", getDetailBook);
router.post(
  "/book/",
  authenticated,
  isAdmin,
  uploadFile("imageFile","epubFile"),
  addBook
);
router.patch("/book/:id", authenticated, isAdmin, editBook);
router.delete("/book/:id", authenticated, isAdmin, deleteBook);

router.post("/register", register);

router.post("/login", login);

router.get("/check-auth", authenticated, checkAuth)

router.get("/transactions", authenticated, getAllTransactions);
router.get("/transaction/:id", authenticated, getTransaction);
router.patch("/transaction/:id", authenticated, isAdmin, editTransaction);
router.post("/transaction", uploadFile("imageFile"), addTransaction);

module.exports = router;
