import {addManager, getManager} from '../db/authOperations';
import {manager} from '../db/schema';

import connection from '../db/conn';
import { signInRequestModel } from '../models/authModels';


describe("test Authentication operations",()=>{

    it("should add a new manager (signUp) and return true", async ()=>{
        const newManager:manager = {
            address : "221B Baker's Street",
            company : "Mind Bowser",
            dob: new Date(2000,5,15),
            firstName : "Tushar",
            lastName : "Gautam",
            email : "man@ger.com",
            password: "Manager@123",
        }

        const result = await addManager(newManager);
        expect((result.response || result.details == 'DUPLICATE')).toBeTruthy();
    })

    it("should find manager based on email and password", async ()=>{
        const signInRequest: signInRequestModel = {
            email : "man@ger.com",
            password: "Manager@123",
        }

        const result = await getManager(signInRequest);
        expect(result.authenticated).toBeTruthy();
        expect(result.firstName).toBe('Tushar');
    })


    it("should not find manager based on email and password", async ()=>{
        const signInRequest: signInRequestModel = {
            email : "man@ger_not_added.com",
            password: "Manager@123",
        }

        const result = await getManager(signInRequest);
        expect(result.authenticated).toBe(false);
        // expect(result.firstName).toBe('Tushar');
    })


    afterAll(()=>{
        connection.close();
    })

})