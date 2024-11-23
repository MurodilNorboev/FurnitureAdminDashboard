export interface AddDataForm { 
    title: string; 
    desc: string; 
    image: string; 
}
export interface ResponseType { 
    success: boolean; 
    message: string; 
    new_todo: any; 
}