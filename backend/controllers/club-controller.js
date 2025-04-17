
const Club = require("../models/clubSchema.js");

const getClubType = async (req, res) => {
    try {
        let club = await Club.findById(req.params.id);
        if (club) {
            club = await club.populate("name", "type")
            res.send(club);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const clubCreate = async (req,res) => {
    try{
        const club = new Club({
            name: req.body.name,
            type: req.body.type,
            school: req.body.adminID,
        });
        const result = await club.save();
        res.send(result);
    }catch(err){
        res.send(500).json(err);
    }
};

const clubDelete = async (req,res) => {
    try{
        const deleteClub = await Club.findByIdAndDelete(req.params.id);
        if(!deletedClub){
            return res.send({message: "Club not found"});
        }

        await Student.updateMany(
            {clubs: req.params.id},
            {$pull: {clubs: req.params.id}}
        );
    }catch(err){
        res.status(500).json(err)
    }
};

const getClub = async (req, res) => {
    try {
        let club = await Club.find({ school: req.params.id })
        
        if (club.length > 0) {
            res.send(club)
        } else {
            res.send({ message: "No clubs found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    clubCreate,
    clubDelete,
    getClub,
    getClubType,
}