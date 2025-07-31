require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db");
const seedDB = require("./seed");
const postRoutes = require("./routes/post");
const methodOverride = require("method-override");

connectDB();
//Already Blogs are seeded if changes are there in Blogs can change in seed.js
//seedDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.render("index", { titleTag: "Homepage" });
});
app.use(postRoutes);
app.post('/blog/:id/comment', (req, res) => {
    const { user, comment } = req.body;
    const postId = req.params.id;
    if (!user || !comment) {
        return res.status(400).send('Username and comment are required.');
    }
    const newComment = new Comment({ user, comment, postId });
    newComment.save()
        .then(() => {
            res.redirect(`/blog/${postId}`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error saving comment.');
        });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server running at http://localhost:4000/" );
});
