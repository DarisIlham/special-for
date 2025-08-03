import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Available routes:");
  console.log("- GET    /api/wishes");
  console.log("- POST   /api/wishes");
  console.log("- PUT    /api/wishes/:id");
  console.log("- DELETE /api/wishes/:id");
});