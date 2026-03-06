const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
 

mongoose.connect("mongodb+srv://hanumanraj07:12345@cluster0.ngznyap.mongodb.net/Assignment02?appName=Cluster0")
.then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });

}) 
.catch((error) => {
    console.log("MongoDB connection failed :- ", error);
});

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    timestamps: false
});

const User = mongoose.model("User", userSchema);

 

app.get("/", (req, res) => {
    res.send("Express server is running on port 3000");
});

 

app.get("/users", async (req, res) => {

    try {

        const data = await User.find({});
        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching users",
            error
        });

    }

});

 

app.get("/users/:id", async (req, res) => {

    try {

        const data = await User.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching user",
            error
        });

    }

});

 

app.post("/addUser", async (req, res) => {

    try {

        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            message: "User added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding user",
            error
        });

    }

});

 

app.post("/addUsers", async (req, res) => {

    try {

        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                message: "Request body must be an array"
            });
        }

        await User.insertMany(req.body);

        res.status(201).json({
            message: "Users added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding users",
            error
        });

    }

});

 

app.put("/users/:id", async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating user",
            error
        });

    }

});

app.patch("/users/:id", async (req, res) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User partially updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating user",
            error
        });

    }
});

 

app.delete("/users/:id", async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting user",
            error
        });

    }

});