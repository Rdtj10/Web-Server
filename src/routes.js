/*Made by : Ridho Dimas Tri Prasetyo Jayadi*/
const {addBooks,getBooks,getBookById,updateBooks,deleteBooks} = require('./handler');
const routes = [{
    method : 'POST',
    path : '/books',
    handler : addBooks,
},{
    method : 'GET',
    path : '/books',
    handler : getBooks,
},{
    method : 'GET',
    path : '/books/{bookId}',
    handler : getBookById,
},{
    method : 'PUT',
    path : '/books/{bookId}',
    handler : updateBooks,
},{
    method : 'DELETE',
    path : '/books/{bookId}',
    handler : deleteBooks,
}];
module.exports = routes;