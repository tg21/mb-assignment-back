import {addEmployee, deleteEmployee, updateEmployee} from '../db/employeeOperations';
import {employee} from '../db/schema';

import connection from '../db/conn';

describe('test Employee Crud Operations', ()=> {

    it("should add employee record and return true",async ()=>{
        const empCount = 1;
        //loop used to populate db with sample data
        for(let i =0;i<empCount;i++){
            const emp : employee = {
                address: "Sample Address"+(i+1),
                city: "Delhi"+(i+1),
                dob: new Date(1990,12,12),
                empId: 'EMP'+(i+1),
                firstName: 'Bruce'+(i+1),
                lastName: 'Wayne'+(i+1),
                mobile: '+911234567891'
            }
            const result = await addEmployee(emp);
            expect((result.response || result.details=='DUPLICATE')).toBeTruthy();
        }
        
    })

    // return
    it("should return false because of duplicate emp id",async ()=>{
        const emp : employee = {
            address: "Sample Address",
            city: "Delhi",
            dob: new Date(1990,12,12),
            empId: 'EMP1',
            firstName: 'Clark',
            lastName: 'Kent',
            mobile: '+911234567891'
        }
        const result = await addEmployee(emp);
        expect(result.response).toBeFalsy();
        expect(result.details).toBe('DUPLICATE');
    })


    it("should find and update employee record and return true",async ()=>{
        const oldEmpId = 'EMP1';
        const emp : employee = {
            address: "Sample Address",
            city: "Delhi",
            dob: new Date(1990,11,12),
            empId: 'EMP2',
            firstName: 'Clark',
            lastName: 'Kent',
            mobile: '+9199999999'
        }
        const result = await updateEmployee(oldEmpId,emp);
        expect(result.response).toBeTruthy();
    })



    it("should delete employee record and return true",async ()=>{
        const empId = 'EMP2';

        const result = await deleteEmployee(empId);
        expect(result.response).toBeTruthy();
    })

    afterAll(()=>{connection.close();});
    
})