var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
        
    //var booksUri = 'http://192.168.0.15:802/api/books/';
    //var bookUri = 'http://192.168.0.15:802/api/book/';
    var booksUri = '/api/books/';
    var bookUri = '/api/book/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    self.detail = ko.observable();
    self.getBookDetail = function (item) {
        ajaxHelper(bookUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    }

    //var authorsUri = 'http://192.168.0.15:802/api/authors/';
    var authorsUri = '/api/authors/';
    
    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(bookUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }

    getAuthors();


    // Fetch the initial data.
    getAllBooks();
};

ko.applyBindings(new ViewModel());