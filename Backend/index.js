import express from "express";
import conectarDB from "./basededatos.js";
import dotenv from "dotenv";
import cors from "cors";
import Personaje from "./SchemaPersonaje.js";
import res from "express/lib/response.js";
import axios from "axios";


const API_URL="https://api.clashroyale.com/v1/cards";
const API_KEY = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA3NmVhZDgzLTgyYWQtNDZlNi04OGViLTJjNzQ1YzZjMGIzMyIsImlhdCI6MTczOTI2ODU3Niwic3ViIjoiZGV2ZWxvcGVyLzAyY2ExM2Q5LWUxYjQtOWMyNS01YTAzLWUwMDkyN2E5YjY5ZSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5MC4xNjYuMTAuNTIiXSwidHlwZSI6ImNsaWVudCJ9XX0.fmI32h18k5HWXM5bcvZNO5alizr7GAC9-bYLVvyytl8xcvJRzSW4caUOo7NDbLtOp7vjh8160wZHwSelHmdMFw"

dotenv.config({ path: "Mongo.env" });
conectarDB();

const app = express();
app.use(express.json());
app.use(cors());

//Mensaje de confirmacion
app.get("/", (req, res) => {
  res.send("La api funciona");
});

//Endpoint para obtener personajes
app.get("/Personajes", async (req, res) => {
    try {
      const personajes = await Personaje.find();
      res.json(personajes);
    } catch (error) {
      console.error("Error al obtener los personajes:", error);
      res.status(500).json({ error: "Error al obtener los personajes" });
    }
    });
  
//ENpoint para introducir datos en la base de datos para hacer pruebas    
app.post("/Personajes", async (req, res) => {
  try {
    const nuevoPersonaje = new Personaje(req.body);
    await nuevoPersonaje.save();
    res.status(201).json(nuevoPersonaje);
  } catch (error) {
    res.status(500).send("Error al agregar el Personaje");
  }
});

//Enpoint para obtener Personajes
app.get("/personajes/cartas", async(req, res)=>{
  const response = await axios.get(API_URL, {
    headers: {Authorization: API_KEY},
  });

  const personajes = response.data.items;

  res.json({ personajes });
})

// Inico de servidor
const Puerto = process.env.PORT || 3000;
app.listen(Puerto, () => {
  console.log(`Api en http://localhost:3000`);
});
