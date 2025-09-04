import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
// DB things
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
let tasksCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("taskDB");
    tasksCollection = db.collection("taskName");
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }

  async function nnn() {
    await tasksCollection.deleteMany({});
  }
  // nnn();
  frontendData();
}
function frontendData() {
  try {
    app.get("/receive/tasks/names", async (req, res) => {
      const frontData = await tasksCollection.findOne({ name: "TaskNames" });
      console.log("frontData:", frontData);
      res.send(frontData.progress);
      console.log("data sent to: http://localhost:3000/receive/tasks/names");
    });
  } catch (error) {
    console.log("frontend data sending error:  ", error);
  }
}

connectDB();
app.get("/", (req, res) => {
  res.send("hlo");
  frontendData();
  console.log("frontend data function executed");
});
// app.get("/receive/tasks/names",(req,res)=>{
//   // frontendData();
// })
app.post("/", async (req, res) => {
  console.log("recieved");
  console.log("data: ", req.body);
  let data = req.body;
  try {
    let dataSearch = await tasksCollection.findOne({ name: "TaskNames" });
    console.log("datasearch matchcount", dataSearch);
    if (dataSearch) {
      UpdateData(dataSearch, data);
    } else {
      CreateData(data);
    }
  } catch (e) {
    console.log("error in data collection: ", e);
  }

  res.json({ success: true, message: "Data received", received: req.body });
});

app.listen(PORT, () => console.log("server live at:", PORT));

const UpdateData = async (data, d2) => {
  console.log("dataUpdate function executed");

  let MAX = 0;
  const keys = Object.keys(data.progress);
  keys.forEach((k) => {
    let num = parseInt(k.substring(4));
    if (num > MAX) MAX = num;
  });
  const nextKey = `task${MAX + 1}`;

  try {
    await tasksCollection.updateOne(
      { name: "TaskNames" },
      { $set: { [`progress.${nextKey}`]: d2.taskName } }
    );
    // UpdateData();
  } catch (error) {
    console.log("cannot update: ", error);
  }
};

const CreateData = async (data) => {
  console.log("dataCreate function  executed");

  try {
    await tasksCollection.insertOne(data).then(console.log("data sent to db"));
  } catch (error) {
    console.log("cannot insert", error);
  }
};
