const   express                 = require("express"),
        app                     = express();
        mongoose                = require("mongoose");
        indexRoutes             = require("./routes/index");
        studentRoutes           = require("./routes/student");
        militaryRoutes          = require("./routes/military");
        teacherRoutes           = require("./routes/teacher");
        firstResponderRoutes    = require("./routes/firstresponder");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/student", studentRoutes);
app.use("/military", militaryRoutes);
app.use("/teacher", teacherRoutes);
app.use("/firstresponder", firstResponderRoutes);

mongoose.connect("mongodb://localhost/rainieroutdoor");

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("Server initialized...");
});
