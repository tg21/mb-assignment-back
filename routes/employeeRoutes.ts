import express from 'express';
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from '../db/employeeOperations';

const router = express.Router();


router.post('/create',async (req,res)=>{
    res.send(await addEmployee(req.body));
})

router.post('/edit',async (req,res)=>{
    res.send(await updateEmployee(req.body.empId,req.body.employee));
})

router.post('/delete',async (req,res)=>{
    res.send(await deleteEmployee(req.body.empId));
})

router.get('/getEmployees/:pageNumber',async (req,res)=>{
    res.send(await getEmployees(Number(req.params.pageNumber)));
})

router.get('/',(req,res)=>{
    res.send('<h1>Employee Routes</h1>');
})

export default router;