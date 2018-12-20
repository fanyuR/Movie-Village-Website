import * as express from 'express';

const app = express();


export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>,
        public image: string,
        public imageDeatil: string) {
    }
}

export class Comment {
    constructor(public id: number,
                public productId: number,
                public timestamp: string,
                public user: string,
                public rating: number,
                public content: string) { }
}


const products: Product[] = [
    new Product(1,"Jurassic World ", 14.99, 3.5, "Universal Pictures",["Action", "Adventure"],"http://localhost:8000/Jurassic World.jpg", "http://localhost:8000/imgdetail/jurassic-world.jpg" ),
    new Product(2,"Ant-Man", 16.99, 2.5, "Marvel Studios",["Adventure", "Comedy" ], "http://localhost:8000/Ant-Man.jpg","http://localhost:8000/imgdetail/ant-man.jpg" ),
    new Product(3,"Mowgli", 24.99, 4.5, "Warner Bros.",["Action", "Adventure", "Fantasy"], "http://localhost:8000/Mowgli.jpg","http://localhost:8000/imgdetail/mowgli.jpg" ),
    new Product(4,"A Star Is Born ", 12.99, 3.5, "Warner Bros.",[ "Music", "Romance"], "http://localhost:8000/star.jpg","http://localhost:8000/imgdetail/a-star-is-born.jpg" ),
    new Product(5,"Aquaman", 18.99, 5.0, " DC Entertainment",["Action", "Adventure"],"http://localhost:8000/aquaman.jpg","http://localhost:8000/imgdetail/aquaman2.jpg" ),
    new Product(6,"Venom", 14.99, 4.0, "Marvel Entertainment",["Action"], "http://localhost:8000/venom.jpg" ,"http://localhost:8000/imgdetail/Venom.jpg"),
    new Product(7,"Ralph", 12.99, 3.5, "Walt Disney Animation Studios",["Animation", "Comedy"], "http://localhost:8000/Ralph.jpg" ,"http://localhost:8000/imgdetail/Ralph.jpg"),
    new Product(8,"Christopher Robin", 10.99, 4.0, "Walt Disney Pictures",[ "Animation", "Adventure", "Comedy" ],"http://localhost:8000/Christopher.jpg","http://localhost:8000/imgdetail/ChristopherRobin.jpg" ),
    new Product(9,"Black Panther", 10.99, 3.5, "Walt Disney Studios",["Action", "Adventure"], "http://localhost:8000/Black.jpg","http://localhost:8000/imgdetail/Black Panther.jpg" ),
];

const  comments: Comment[] = [
    new Comment(1, 1, '2018-10-23 12:15:32', 'Fiona', 3.5, 'Great CGI, Terrible plot!'),
    new Comment(2, 2, '2018-11-2 12:16:34', 'Daniel', 2.5, 'not good'),
    new Comment(3, 1, '2018-10-16 22:15:45', 'Jacob', 3.0, 'Not my favorite in the Jurassic Series'),
    new Comment(4, 1, '2018-09-2 12:20:15', 'Evan', 4.0, 'I like Owen and Claire and Blue the dinosaur'),
    new Comment(5, 3, '2018-10-2 17:27:32', 'Grace', 4.5, 'Totally loved it!'),
    new Comment(6, 4, '2018-11-20 15:20:35', 'Dylan', 3.5, 'A very long film'),
    new Comment(7, 5, '2018-10-17 16:15:45', 'Olivia', 5.0, 'This movie is really entertaining!'),
    new Comment(8, 5, '2018-09-12 07:13:25', 'Ryan', 5.0, 'Most Beautifully visualized!'),
    new Comment(9, 5, '2018-09-2 22:24:37', 'Hudson', 5.0, 'A Hero Fantasy Film'),
    new Comment(10, 6, '2018-08-26 08:45:28', 'Austin', 4.0, 'Absolutely Amazing'),
    new Comment(11, 7, '2018-12-20 23:25:29', 'Naomi', 4.0, 'Surprised me, a great movie!'),
    new Comment(12, 7, '2018-12-12 16:25:16', 'Bryson', 3.0, 'Too much brand advertisement, lack of story'),
    new Comment(13, 7, '2018-11-27 18:46:37', 'Charlotte', 3.5, 'Not as good as the first Movie'),
    new Comment(14, 8, '2018-09-28 19:26:28', 'Miles', 4.0, 'A True family movie, because it is for everyone in your family'),
    new Comment(15, 9, '2018-10-15 14:34:27', 'Aaron', 3.5, 'Wakand forever'),
    new Comment(16, 3, '2018-05-11 17:40:46', 'Caroline', 5.0, 'Never been so excited to watch Jungle Book.'),

];

app.use( express.static('img'));

app.get('/', (req, res) => {
    res.send("Hello express");
});

app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;


    if(JSON.stringify(params) === '{}'){
        return res.json(result);
    }

    if(params.title){
        result = result.filter((p) => p.title.indexOf(params.title) !== -1);
    }

    if(params.price && result.length > 0){
        result = result.filter((p) => p.price <= parseInt(params.price));
    }

    if(params.category !== '-1' && result.length > 0){
        result = result.filter((p) => p.categories.indexOf(params.category) !== -1 );
    }


    res.json(result);
});

app.get('/api/products/:id', (req, res) => {
    res.json(products.find((product) => product.id == req.params.id));
});

app.get('/api/products/:id/comments', (req, res) => {
    res.json(comments.filter((comment: Comment) => comment.productId == req.params.id));
});


const server = app.listen(8000, "localhost", () => {
    console.log("server success");
});