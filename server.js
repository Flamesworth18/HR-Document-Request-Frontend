let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/document-request-app'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/document-request-app/index.html');
})

app.listen(process.env.PORT || 8080);