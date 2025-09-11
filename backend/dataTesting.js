import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 5000;

// DB things
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
let tasksCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("taskDB");
    tasksCollection = db.collection("tasks");
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }

  async function nnn() {
    await tasksCollection.deleteMany({});
  }
  collectData();
//   console.log(dayKeys,weekKeys);
}
connectDB();
async function collectData() {
  try {
    let data = await tasksCollection.findOne({});
    // console.log(data.W1.D1);
    let M1Data=[]
    let weekKeys = Object.keys(data.M1);
    let dayKeys;
    weekKeys.shift();
    weekKeys.forEach((wk) => {
    //   console.log(data.M1[wk]);
      dayKeys = Object.keys(data.M1[wk])
      dayKeys.forEach((dk)=>{
       M1Data.push(data.M1[wk][dk].PROGRESS)
    })
    console.log('\n');
    });
    app.post('/monthdata',(req,res)=>{
      
    })
    console.log(M1Data);
    console.log(weekKeys,dayKeys);
    // app.post('/month_data')
  } catch (error) {
    console.log("server data fetching error: ", error);
  }
}

app.listen(PORT, () => {
  console.log("server is live at port:", PORT);
});
