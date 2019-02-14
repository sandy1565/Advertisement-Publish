export class Form {
  public key: number;
  public first_name: string;
  public last_name: string;
  // public block:string;
  public address: string;
  public block_id: number;
  public loaction_id: number;
  public floor_id: number;
  public pincode: number;
  public mobile_number1: string;
  public mobile_number2: string;
}
export class Block {
  public block_id: number;
  public block_name: string;
}

export class Location {
  public loaction_id: number;
  public location_name: string;
}

export class Floor {
  public floor_id: number;
  public floor_type: string;
}
