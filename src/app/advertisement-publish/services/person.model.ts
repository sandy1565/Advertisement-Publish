export class PersonModel{
    public firstName :string;
    public middleName :string;
    public lastName :string;
    public block_id :number;
    public address :string; 
    public floor_id :number;
    public location_id :number;
    public pincode :number;
    public mobile_number1:string;
    public mobile_number2:string;
    public username :string; 
    public PersonModel :string; 
    public date_of_birth :Date; 
}

export class Gender {
    public gender: string;
 }

export class Block{
    public block_id:number;
    public block_name:string;
}

export class Location{
    public loaction_id:number;
    public location_name:string;
}

export class Floor{
 public floor_id:number;
 public floor_type: string; 
}