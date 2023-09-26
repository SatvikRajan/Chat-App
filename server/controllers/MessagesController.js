const Messages = require("../model/MessageModel");

module.exports.addMessage = async (req,res,next) =>{
    try{
        const { from,to,message } = req.body;
        const data = await Messages.create({
            message:{text:message},
            users:{from,to},
            sender: from
        });
        if(data) return res.json({msg: "Message added succesfully"});
        return res.json({msg: "Failed to add message"})
    }
    catch(ex){
        next(ex)
    }
}
module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Messages.find({
        $or: [
            { "users.from": from, "users.to": to },
            { "users.from": to, "users.to": from },
          ],
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
        console.error("Error fetching messages:", ex);
      next(ex);
    }
  };
  