const { Book } = require("../../models");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      messages: "Books Successfully Retrieved",
      data: {
        books: books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getDetailBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!book) {
      return res.send({
        message: `Book with id ${id} is not found`,
      });
    }

    res.send({
      status: `Book With id ${id} Successfully Found`,
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addBook = async (req, res) => {
  const { files } = req;

  try {
    const createBook = await Book.create({
      title: req.body.title,
      publicationDate: req.body.publicationDate,
      pages: req.body.pages,
      author: req.body.author,
      isbn: req.body.isbn,
      about: req.body.about,
      bookFile: req.files.epubFile[0].filename,
      thumbnail: req.files.imageFile[0].filename,
    });

    console.log(req.files);

    const book = await Book.findOne({
      where: { id: createBook.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Book successfully added",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      return res.send({
        message: `Book with id ${id} is not found`,
      });
    }

    await Book.update(req.body, {
      where: { id },
    });

    const bookUpdated = await Book.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: `Book with id ${id} is successfully updated `,
      data: {
        book: bookUpdated,
      },
    });
  } catch (errr) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Book.findOne({
      where: { id },
      attributes: {
        exclude: [
          "title",
          "publicationDate",
          "pages",
          "author",
          "isbn",
          "about",
          "bookFile",
          "createdAt",
          "updatedAt",
          "thumbnail",
        ],
      },
    });

    if (!data) {
      return res.send({
        message: `Book with id ${id} is not found`,
      });
    }

    await Book.destroy({
      where: { id },
    });

    res.send({
      messages: "Book Successfully Deleted",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
