import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"

const app = express();
const port = 8080;

// enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true,
}));

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all saved cats
app.get("/", async (req, res) => {
    try {
        const collectionRef = collection(db, "Cats");
        const collectionSnap = await getDocs(collectionRef);
        const docs = [];
        collectionSnap.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        res.send(docs);
    } catch (error) {
        console.error("Error fetching cats: ", error);
        res.status(500).send("Error fetching cats");
    }
});

// save a cat
app.post("/", async (req, res) => {
	const catRef = collection(db, "Cats");
	const catBody = req.body
	try {
		await addDoc(catRef, catBody)
	} catch (e) {
		console.error(e)
		res.status(500);
	}
	console.log("saved cat")
	res.status(200).send("Succesfully saved cat")
})

// delete a cat
app.delete("/:id", async (req, res) => {
    const catId = req.params.id; // get the cat ID from the URL
    try {
        const catRef = doc(db, "Cats", catId); 
        await deleteDoc(catRef); 
        res.status(200).send("Cat successfully deleted");
    } catch (error) {
        console.error("Error deleting cat: ", error);
        res.status(500).send("Error deleting cat");
    }
});

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()
