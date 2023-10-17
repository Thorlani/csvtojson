const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const csvtojson = require("csvtojson");
const cors = require("cors");
const multer = require("multer");

const PORT = process.env.PORT || 7000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use("/", express.static("public"));

// const csvFilePath = "input.csv";
// csvtojson()
// .fromFile(csvFilePath)
// .then((json) => {
//     console.log(json);
// });

const upload = multer({ dest: "files/" });

app.post("/upload-csv", upload.any(), function (req, res) {
  csvtojson()
    .fromFile(req.files[0].path)
    .then((json) => {
      res.send(JSON.stringify(json));
    });
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
