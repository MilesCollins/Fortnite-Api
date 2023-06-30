import Player from "../models/player.js";



export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
      } catch (err) {}
}

export const createPlayer = async (req, res) => {   
    const player = new Player({
        name: req.body.name,
        //todo: add .toLowerCase() so that it handles typos, change database values to be lowercase,
        server: req.body.server,
        earnings: req.body.earnings,
      });
      try {
        const newPlayer = await player.save();
        res.status(201).json(newPlayer);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

export const getPlayer = async (req, res) => {
    try{
        const id = req.params.id
        const player = await Player.find({ name: id })
        if(player != null){
          res.json(player)
        } else {
          res.status(404).json({message: 'cannot find player'})
        }
       } catch (err) {
      console.error(err)
       }
};

export const deletePlayer = async (req, res) => { 
    try{
        const id = req.params.id
        
       await Player.deleteOne({ name: id })
        res.json('Deleted player')    
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
};

export const updatePlayer =  async (req, res) => {
     // finds the player. The purpose of the 2 lines of code below is 
  // to create a variable called id, and have that set to a part of the url
  // then, create a new variable called player, that finds the player with
  // the name from the url
  const id = req.params.id
  const player = await Player.find({ name: id })

  // findOneAndUpdate finds the first focument that matches a filter
  // applies an update, and returns the document 
  const filter = { name: id };
  const update = { earnings: req.body.earnings, server: req.body.server };
  const updatedPlayer = await Player.findOneAndUpdate(filter, update, {
    new: true
  });
  res.json(updatedPlayer)
};