import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/getdata", async (req, res) => {
  try {
    const response = await fetch(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => console.log("Proxy running on port 5000"));
export default app;
