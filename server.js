const express = require("express");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb.js");
const sequelize = require("./config/sqlite.js");

dotenv.config();
const app = express();

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");

app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async()=>{
    try{
        await connectMongoDB();
        await sequelize.sync();
        console.log("SQLite synced");

        app.listen(PORT, ()=>{
         console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch(err){
        console.error("Failed to start server: ", err.message);
        process.exit(1);
        };
    }
startServer()