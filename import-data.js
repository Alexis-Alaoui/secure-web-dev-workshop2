require("dotenv").config()
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI).then(()=>{importation(),console.log("connected")})
//console.connect est une promesse en javascript/ le then execute la fonction une fois la connexion établie
//await simplifie l'écriture (fonction async)
const { Schema } = mongoose;
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

const Locations = new Schema({
    filmType: String,
    filmProducerName: String,
    endDate:  Date,
    filmName: String,
    district: Number,
    geolocation: {
        coordinates: [
            Number
        ],
        type: {type :String}
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,

});
const Location = mongoose.model("Location",Locations)

async function importation() {
    for (let i = 0; i < filmingLocations.length; i++) {
        let dico = {};
        dico = {
            filmType: filmingLocations[i].fields.type_tournage,
            filmProducerName: filmingLocations[i].fields.nom_producteur,
            endDate: filmingLocations[i].fields.date_fin,
            filmName: filmingLocations[i].fields.nom_tournage,
            district: filmingLocations[i].fields.ardt_lieu,
            geolocation: {
                coordinates: [
                    filmingLocations[i].fields.coordinates
                ],
                type: filmingLocations[i].fields.type
            },
            sourceLocationId: filmingLocations[i].fields.id_lieu,
            filmDirectorName: filmingLocations[i].fields.nom_realisateur,
            address: filmingLocations[i].fields.adresse_lieu,
            startDate: filmingLocations[i].fields.date_debut,
            year: filmingLocations[i].fields.annee_tournage,

        }
        const myloc = new Location(dico)
        await myloc.save()

    }

}
async function locationByID(idToFind) {
    Location.findById(idToFind).then(film => console.log(film));
    Location.findById(idToFind).then(film => console.log("Location by ID : ", film));
}

async function locationsByName(filmName) {
    Location.find({filmName: filmName}).then(films => console.log("Results : ", films));
    Location.find({filmName: filmName}).then(films => console.log("Locations by Name : ", films));
}

async function deleteByID(id) {
    Location.findOneAndDelete({_id: id}).then(console.log("Retirer"));
    try {
        Location.findOneAndDelete({_id: id}).then(console.log("Retirer"));
    } catch (e) {
        console.log("destroyed or not existing");
    }

}

function addLocation(location) {
    try {
        location.save();
    } catch (e) {
        console.log("wrong");

    }
}

function updateLocation(id, update) {
    try {
        Location.updateOne({id: id}, update).then(console.log("Instance updated"));
    } catch (e) {
        console.log("wrong");
    }
}





//locationByID('633f22080537240f97e0fcfc');
//locationsByName("Une jeune fille qui va bien");
//deleteByID('633f22080537240f97e0fcfc');