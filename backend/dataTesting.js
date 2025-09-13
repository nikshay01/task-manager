import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());             // ✅ Enable CORS
app.use(express.json());     // ✅ Parse JSON body

// DB Setup
const uri =
  "mongodb+srv://realUser:vestige5586@task-manager.84cf9tg.mongodb.net/?retryWrites=true&w=majority&appName=task-manager";
const client = new MongoClient(uri);
let tasksCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("tasks");
    tasksCollection = db.collection("tasks");
    console.log("✅ Connected to MongoDB");

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }

  collectData();
}

connectDB();

function collectData() {
  try {
    app.get("/monthdata", (req, res) => {
      res.send("ha");
    });

    app.post("/monthdata", async (req, res) => {
      console.log("🚨 POST /monthdata hit");
      console.log("Request body:", req.body);
       
      const indicator = req.body.indicator;

      if (indicator === "monthData") {
        const data = await tasksCollection.findOne({});
        if (!data || !data.M1) {
          return res.status(404).json({ error: "No M1 data found" });
        }

        let M1Data = [];
        let weekKeys = Object.keys(data.M1);
        // console.log(weekKeys);
        weekKeys.forEach((wk) => {
          const dayKeys = Object.keys(data.M1[wk]);
          // console.log(dayKeys);
          dayKeys.forEach((dk) => {
            M1Data.push(data.M1[wk][dk].PROGRESS);
            // console.log(M1Data);
          });
        });
        M1Data.forEach(element => {
          console.log(element);
          console.log('next');
        });
        for (let index = 0; index < M1Data.length; index++) {
          const element = M1Data[index];
          if (index%7==0) {
            console.log('\n');
            console.log(`data for week${(index/7)+(1)}: `);
          }
          console.log(`data for day ${index+1}:`,element);
          
        }
        console.log("✅ Collected M1Data:", M1Data);

        return res.json({ M1Data });
      } else {
        return res.status(400).json({ error: "Invalid indicator" });
      }
    });
  } catch (error) {
    // console.log("❌ Server data fetching error:", error);
  }
}
