const Voter = require('../model/voterSchema');
//<----------API to fetch all data------------>
const fetchAllVoters = async (req, res, next) => {
   try {
      const voters = await Voter.find();
      if (!voters) {
      return res.status(404).json({ message: "no data exist yet" });
   }
   return res.status(200).json({ voters });
}
catch(err)
{
   console.log(err);
}
};
//<-------function to create voter-------->
const addVoter = async (req, res, next) => {
   const { name, father, mother, spouse, age, phone, profession, email, address} = req.body;
   //const imageUrl = req.file.path;
   try {
      const voter = await new Voter({name, father, mother, spouse, age, phone, profession, email, address});
      const createdVoter = await voter.save();
      if (createdVoter) {
         return res.status(201).json({ message: "Created successfully" });
      }
   }
   catch (err) {
      console.log(err);
   }
   //return res.status(201).json({message:"successfully created"});
};
//<-------------function to fetch a single voter details------->
const getVoter = async (req, res, next) => {
   const _id = req.params.id;
   try {
      const voter = await Voter.findById(_id);
      if (!voter) {
         return res.status(404).json({ message: "voter doesn't exist" });
      }
      return res.status(200).json({ voter });
   }
   catch (err) {
      console.log(err);
   }
};
//<-------------------function to update-------------->
const updateVoter = async (req, res, next) => {
   const _id = req.params.id;
   const { name, father, mother, spouse, age, phone, profession, email, address } = req.body;
   let voter;
   //const imageUrl = req.file.path;
   try {
      voter = await Voter.findByIdAndUpdate(_id, { name, father, mother, spouse, age, phone, profession, email, address });
      const updatevoter = await voter.save();
      if (!updatevoter) {
         return res.status(404).json({ message: "Unable to add" });
      }
      return res.status(201).json({ updatevoter });
   }
   catch (err) {
      console.log(err);
   }
};
//<----------function to delete voter---------->
const deleteVoter = async (req, res, next) => {
   const _id = req.params.id;
   let voter;
   try {
      const voter = await Voter.findByIdAndDelete( _id );
      const deletedVoter = await voter.save();
      if (deletedVoter) {
         return res.status(404).json({ message: "Unable to delete" });
      }
   }
   catch (err) {
      console.log(err);
   }
   return res.status(200).json({message:"Voter deleted succesfully"});
};
exports.fetchAllVoters = fetchAllVoters;
exports.addVoter = addVoter;
exports.getVoter = getVoter;
exports.updateVoter = updateVoter;
exports.deleteVoter = deleteVoter;
