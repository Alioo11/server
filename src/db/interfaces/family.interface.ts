export interface Family {
  _id?: string;
  unit_name: number;
  family_name: number;
  date_from: Date;
  date_to: Date;
  absent_days: Array<Date> | [];
  members_count: Number;
}
