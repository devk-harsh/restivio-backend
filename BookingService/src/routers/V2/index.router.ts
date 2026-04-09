import express from "express";

const v2Router = express.Router();

v2Router.get('/ping', (req,res,next)=>{
    res.send("v2 is active.");
});

export default v2Router;