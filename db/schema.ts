import { Schema } from "mongoose"

interface manager{
    email : String,
    firstName :String,
    lastName: String,
    password:String,
    address:String,
    dob : Date,
    company: String,
}

const managerSchema = new Schema<manager>({
    email : {type : String, required: true},
    firstName : {type : String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    dob: {type: Date, required: true},
    company: {type: String, required: true},
});


interface employee{
    empId : String,
    firstName: String,
    lastName: String,
    address: String,
    dob : Date,
    mobile: String,
    city: String
}
const employeeSchema = new Schema<employee>({
    empId : {type : String, required: true},
    firstName: {type : String, required: true},
    lastName: {type : String, required: true},
    address: {type : String, required: true},
    dob : {type : Date, required: true},
    mobile: {type : String, required: true},
    city: {type : String, required: true},
})

export { managerSchema, employeeSchema , manager, employee}