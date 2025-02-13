import mongoose from "mongoose";

const personajeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        required:true,
    },
    elixirCost:{
        type: Number,
        required:true,
    },
    iconUrl:{
        type: String,
        required:true,
    }
});

const Personaje = mongoose.model("Personaje", personajeSchema);

export default Personaje;
