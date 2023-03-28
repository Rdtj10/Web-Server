/*Made by : Ridho Dimas Tri Prasetyo Jayadi*/
const {nanoid} = require('nanoid');
const books = require('./books');

//Input Buku
const addBooks = (request, h) => {
    const {name, year, author,summary, publisher, pageCount, readPage, reading} = request.payload;
    if (name === undefined) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const id = nanoid(16);
    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = {
        id,name, year, author,summary, publisher, pageCount, readPage,finished,reading,insertedAt,updatedAt,
    };
    books.push(newBook);
    const succeeded = books.filter((book)=>book.id === id).length > 0;
    if (succeeded) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data:{
                bookId : id,
            }
        });
        response.code(201);
        return response;
    }
};

 //Tampilkan buku
const getBooks = (request, h) => {
    const {name,reading,finished} = request.query;
    //Name
    if (name) {
        const search = name.toLowerCase();
        const index = books.filter((book) => book.name.toLowerCase().includes(search)).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          }));
        const response = h.response(
          {
            status: 'success',
            data:
            {
              books: index,
            },
          },
        );
        response.code(200);
        return response;
      }
    
      //Read
      if (reading) {
        const index = books.filter((book) => book.reading === (reading === '1')).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          }));
        const response = h.response(
          {
            status: 'success',
            data:
            {
              books: index,
            },
          },
        );
        response.code(200);
        return response;
      }
    
      //Finished
      if (finished) {
        const index = books.filter((book) => book.finished === (finished === '1')).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          }));
        const response = h.response(
          {
            status: 'success',
            data:
            {
              books: index,
            },
          },
        );
        response.code(200);
        return response;
      }

    const response = h.response({
        status : 'success',
        data:{
            books : books.map((book) => ({
                id : book.id,
                name : book.name,
                publisher : book.publisher,
            }))
        }
    });
    response.code(200);
    return response;
};

//Cari buku
const getBookById = (request, h) => {
    const {bookId} = request.params;
    const book = books.filter((n) => n.id === bookId)[0];
    if(book !== undefined) {
        const response = h.response({ 
            status : 'success',
            data:{
                book,
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status : 'fail',
        message : 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

//Update buku
const updateBooks = (request,h) => {
    const {bookId} = request.params;
    const {name, year, author,summary, publisher, pageCount, readPage} = request.payload;
    if (name === undefined) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books[index] = {
        ...books[index],
        name, year, author,summary, publisher, pageCount, readPage,updatedAt,
        };
    
        const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

//Hapus buku
const deleteBooks = (request, h) => {
    const {bookId} = request.params;
 
    const index = books.findIndex((n) => n.id === bookId);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {getBooks,addBooks,getBookById,updateBooks,deleteBooks};