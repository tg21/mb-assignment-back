import { model } from 'mongoose';
import {managerSchema, manager} from './schema'
import { signInRequestModel, signInResponseModel } from '../models/authModels';

type crudResponse = {
    response: boolean,
    details: string,
}

    
const ManagerModel = model<manager>('manager',managerSchema);

//sign Up
export const addManager = async (man:manager) : Promise<crudResponse> => {
    const duplicateManager = await ManagerModel.findOne({email : man.email}).catch((e)=>{
        console.log(e);
        return {
            response : false,
            details: e.message,
        }
    })
    if(duplicateManager){
        return {
            response : false,
            details: 'DUPLICATE',
        }
    }
    const newManager = new ManagerModel(man)
    await newManager.save().catch((e) => {
        //console.log(e);
        return {
            response: false,
            details: e.message
        };
    })
    return {
        response: true,
        details: 'ADDED',
    };
}

//Sign In
export const getManager = async (authRequest:signInRequestModel) : Promise<signInResponseModel> => {
    const man = await ManagerModel.findOne(authRequest).catch((e)=>{
        return {
            authenticated : false,
            details: e.message,
        }
    }) as manager;

    if(man != null){
        return {
            authenticated : true,
            details: '',
            firstName : man.firstName,
            lastName : man.lastName
        }
    }else{
        return {
            authenticated : false,
            details: 'NOT_FOUND',
            firstName : null,
            lastName : null,
        }
    }
    // console.log(man);
    
}