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
        public image: string) {
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
    new Product(1,"Jurassic World ", 14.99, 3.5, "Universal Pictures",["Action", "Adventure"],"http://localhost:8000/Jurassic World.jpg" ),
    new Product(2,"Ant-Man", 16.99, 5.0, "Marvel Studios",["Adventure", "Comedy" ], "http://localhost:8000/Ant-Man.jpg" ),
    new Product(3,"Mowgli", 24.99, 4.5, "Warner Bros.",["Action", "Adventure", "Fantasy"], "http://localhost:8000/Mowgli.jpg" ),
    new Product(4,"A Star Is Born ", 12.99, 3.5, "Warner Bros.",[ "Music", "Romance"], "http://localhost:8000/star.jpg" ),
    new Product(5,"Aquaman", 18.99, 5.0, " DC Entertainment",["Action", "Adventure"],"http://localhost:8000/aquaman.jpg" ),
    new Product(6,"Venom", 14.99, 4.0, "Marvel Entertainment",["Action"], "http://localhost:8000/venom.jpg" ),
    new Product(7,"Ralph", 12.99, 4.5, "Walt Disney Animation Studios",["Animation", "Comedy"], "http://localhost:8000/Ralph.jpg" ),
    new Product(8,"Christopher Robin", 10.99, 2.5, "Walt Disney Pictures",[ "Animation", "Adventure", "Comedy" ],"http://localhost:8000/Christopher.jpg" ),
    new Product(9,"Black Panther", 10.99, 3.5, "Walt Disney Studios",["Action", "Adventure"], "http://localhost:8000/Black.jpg" ),
];

const  comments: Comment[] = [
    new Comment(1, 1, '2018-10-2 12:15:35', 'Fiona', 4.5, 'Excellent'),
    new Comment(2, 2, '2018-11-2 12:16:35', 'John', 2.5, 'not good'),
    new Comment(3, 2, '2018-12-2 22:15:35', 'Jacob', 3.5, 'good'),
    new Comment(4, 1, '2018-09-2 12:20:35', 'Evan', 2.5, 'Bad'),
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