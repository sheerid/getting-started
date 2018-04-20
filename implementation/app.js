const   bodyParser      = require("body-parser"),
        flash           = require("connect-flash"),
        express         = require("express"),
        fileUpload      = require("express-fileupload"),
        app             = express();

var indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("Server initialized...");
});
