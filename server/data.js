const fs = require('fs');
function readData(callback) {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Lỗi khi đọc tệp db.json:', err);
            callback(err, null);
            return;
        }
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
    });
}
module.exports = { readData };