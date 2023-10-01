const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const hostname = 'localhost';
const data = require('./data');
const cors = require('cors');

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
    res.send('Hình ảnh đã được tải lên thành công');
});

//router
// Middleware để cấu hình CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));
//end

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream('./public/index.html').pipe(res);
});

app.get('/seller', (req, res) => {
    const productData = req.body;
    data.readData((err, data) => {
        if (err) {
            console.error('Lỗi khi đọc dữ liệu từ data.js:', err);
            res.status(500).send('Lỗi khi đọc dữ liệu từ data.js');
            return;
        }

        res.send(data.seller);
    });
});
app.post('/seller', (req, res) => {
    const productData = req.body;
    fs.readFile('db.json', 'utf8', (err, dbData) => {
        if (err) {
            console.error('Lỗi khi đọc tệp db.json:', err);
            return;
        }
        const dbJson = JSON.parse(dbData);
        dbJson.seller.push(productData);
        fs.writeFile('db.json', JSON.stringify(dbJson), 'utf8', (err) => {
            if (err) {
                console.error('Lỗi khi ghi dữ liệu vào tệp db.json:', err);
                return;
            }
            console.log('Dữ liệu đã được cập nhật trong db.json');
        });
    });
    res.send('Dữ liệu đã được nhận và xử lý');
});

app.get('/products', upload.single('image'), (req, res) => {
    const productData = req.body;
    data.readData((err, data) => {
        if (err) {
            console.error('Lỗi khi đọc dữ liệu từ data.js:', err);
            res.status(500).send('Lỗi khi đọc dữ liệu từ data.js');
            return;
        }
        res.send(data.products);
    });
});
app.post('/products', (req, res) => {
    const productData = req.body;
    fs.readFile('db.json', 'utf8', (err, dbData) => {
        if (err) {
            console.error('Lỗi khi đọc tệp db.json:', err);
            return;
        }
        const dbJson = JSON.parse(dbData);
        dbJson.products.push(productData);
        fs.writeFile('db.json', JSON.stringify(dbJson), 'utf8', (err) => {
            if (err) {
                console.error('Lỗi khi ghi dữ liệu vào tệp db.json:', err);
                return;
            }
            console.log('Dữ liệu đã được cập nhật trong db.json');
        });
    });
    res.send('Dữ liệu đã được nhận và xử lý');
});

app.use((req, res, next) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.createReadStream('./public/page-not-found.html').pipe(res);
});
//end router

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
