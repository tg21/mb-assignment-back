import { model } from 'mongoose';
import { employeeSchema, employee } from './schema'



type crudResponse = {
    response: boolean,
    details: string,
}

const EmployeeModel = model<employee>('employee',employeeSchema);


//Get List of employees
export const getEmployees = async (pageNumber: number) : Promise<any> =>{
    const limit = 10;
    let skip = (pageNumber*limit) - limit;
    const empList = await EmployeeModel.find({},'-_id').skip(skip)
    .limit(limit).catch(err=>{
        console.log(err);
        return [];
    }) as employee[];
    return empList;
}


// Add New Employee
export const addEmployee = async (emp:employee) : Promise<crudResponse> => {
    const duplicateEmployee = await EmployeeModel.findOne({empId : emp.empId}).catch((e)=>{
        console.log(e);
    })
    if(duplicateEmployee){
        return {
            response : false,
            details: 'DUPLICATE',
        }
    }
    const newEmployee = new EmployeeModel(emp)
    await newEmployee.save().catch((e) => {
        console.log(e);
        return {
            response: true,
            details: e.message
        };
    })
    return {
        response: true,
        details: 'ADDED',
    };
}


//Update Employee record including EMPID
export const updateEmployee = async (currentEmpId:String,emp:employee) : Promise<crudResponse> => {

    //console.log(emp);
    const oldEmployee = await EmployeeModel.findOneAndUpdate({empId:currentEmpId},emp).catch((e)=>{
        console.error(e);
        return {
            response:false,
            details: 'NOT_FOUND',
        }
    })
    //console.log(oldEmployee);
    return{
        response:true,
        details: 'UPDATED'
    }
}


//Delete Employee Record
export const deleteEmployee = async (empId:String) : Promise<crudResponse>  => {

    await EmployeeModel.findOneAndDelete({empId:empId}).catch((e)=>{
        return {
            response : false,
            details: e.message,
        }
    })
    return {
        response : true,
        details: 'DELETED',
    }
   
    
}