import express from 'express';
import { addManager, getManager } from '../db/authOperations';

const router = express.Router();

router.post('/signUp',async (req,res)=>{
    res.send(await addManager(req.body));
})

router.post('/signIn',async (req,res)=>{
    res.send(await getManager(req.body));
})

router.get('/',(req,res)=>{
    res.send('<h1>Log In Here</h1>');
})

export default router;