export enum billTypes {
  water = "water",
  power = "power",
  gas = "gas",
}

export interface Bill {
  _id?: string;
  date_from: Date;
  date_to: Date;
  issue_date: Date;
  dead_line_date: Date;
  is_paid: boolean | false;
  type: billTypes;
  bill_id: String | "???";
  main_price: Number;
  tax: Number | 0;
  previus_debt_price: Number | 0;
  consumtion_amount: Number | 0;
  discount: Number | 0;
}
