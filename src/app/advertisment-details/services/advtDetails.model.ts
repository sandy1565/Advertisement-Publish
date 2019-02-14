export class AdvtModel {
  public key: number;
  public advt_id: number;
  public client_id: number;
  public advt_details: string;
  public from_date: Date;
  public to_date: Date;
  public publish_date: Date;
  public record_date: Date;
  public age_from: number;
  public age_to: number;
  public userName: string;
}

export class ClientModel {
  public client_id: number;
  public clientName: string;
  public userName: string;
}
