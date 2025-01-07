import app from "./app.js";
const PORT = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running in: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error: Failed to start server", error);
  }
};

startServer();
