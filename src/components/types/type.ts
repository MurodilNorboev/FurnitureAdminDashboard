export interface Todo {
    title: string;
    desc: string;
    image: string;
    full_name: string;
    phone_number: string;
    _id: string;
    sana: string;
}
export interface AddDataForm { 
    title: any; 
    desc: string; 
    image: any; 
}

export interface ResponseType { 
    success: boolean; 
    message: string; 
    new_todo: any; 
    _id: string;
    response: any;
    data: any;
    title: any;
    desc: any;
    image: string;
}

