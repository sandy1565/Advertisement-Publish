export interface PersonModel {
   person_id: number;
   firstName: string;
   middleName: string;
   lastName: string;
   country_id: string;
   state_id: string;
   city_id: string;
   block_id: string;
   address: string;
   floor_id: string;
   location_id: string;
   pincode: number;
   mobile_number1: string;
   mobile_number2: string;
   userName: string;
   gender: string;
   date_of_birth: Date;
}

export class Country {
   public country_id: number;
   public country_name: string;
   public country_code: string;
   public country_phone_code: number;
}


export class State {
   public state_id: number;
   public statename: string;
   public country_id: number;
}

export class Cities {
   public city_id: number;
   public cityname: string;
}

export class Block {
   public block_id: number;
   public blockname: string;
}

export class Location {
   public loaction_id: number;
   public location_name: string;
   public country_id: number;
   public state_id: number;
   public city_id: number;
   public username: string;
}

export class Floor {
   public floor_id: number;
   public floor_type: string;
}

export class Gender {
   public gender: string;
}