require('dotenv').config();
const app=require('./src/app');
const connectDB=require('./src/config/database');


async function startServer() {
    try {
        await connectDB();
        const PORT=process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

startServer();
