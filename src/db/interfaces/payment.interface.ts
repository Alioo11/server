export interface Payment {
  _id?: String;
  family: String;
  bill: String;
  amount_paid: number;
  is_paid: Boolean | false;
}
