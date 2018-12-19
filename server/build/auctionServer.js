"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
        this.image = image;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, "Jurassic World ", 1.99, 3.5, "Universal Pictures", ["Action", "Adventure"], "http://localhost:8000/Jurassic World.jpg"),
    new Product(2, "Ant-Man", 3.99, 4.0, "Marvel Studios", ["Adventure", "Comedy"], "http://localhost:8000/Ant-Man.jpg"),
    new Product(3, "Mowgli", 1.99, 4.5, "Warner Bros.", ["Action", "Adventure", "Fantasy"], "http://localhost:8000/Mowgli.jpg"),
    new Product(4, "A Star Is Born ", 2.99, 3.5, "Warner Bros.", ["Music", "Romance"], "http://localhost:8000/star.jpg"),
    new Product(5, "Aquaman", 4.99, 5.0, " DC Entertainment", ["Action", "Adventure"], "http://localhost:8000/aquaman.jpg"),
    new Product(6, "Venom", 1.99, 4.0, "Marvel Entertainment", ["Action"], "http://localhost:8000/venom.jpg"),
    new Product(7, "Ralph Breaks the Internet", 2.99, 4.5, "Walt Disney Animation Studios", ["Animation", "Comedy"], "http://localhost:8000/Ralph.jpg"),
    new Product(8, "Christopher Robin", 4.99, 2.5, "Walt Disney Pictures", ["Animation", "Adventure", "Comedy"], "http://localhost:8000/Christopher.jpg"),
    new Product(9, "Black Panther", 1.99, 3.5, "Walt Disney Studios", ["Action", "Adventure"], "http://localhost:8000/Black.jpg"),
];
var comments = [
    new Comment(1, 1, '2018-10-2 12:15:35', 'Fiona', 4.5, 'Excellent'),
    new Comment(2, 2, '2018-11-2 12:16:35', 'John', 2.5, 'not good'),
    new Comment(3, 2, '2018-12-2 22:15:35', 'Jacob', 3.5, 'good'),
    new Comment(4, 1, '2018-09-2 12:20:35', 'Evan', 2.5, 'Bad'),
];
app.use(express.static('img'));
app.get('/', function (req, res) {
    res.send("Hello express");
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (JSON.stringify(params) === '{}') {
        return res.json(result);
    }
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category !== '-1' && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/products/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("server success");
});
