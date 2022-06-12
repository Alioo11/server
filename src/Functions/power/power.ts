import moment from "moment";
import { getFamilies } from "../../db/models/family/family.model";

import { Bill } from "../../db/interfaces/bill.interface";
import { Family } from "../../db/interfaces/family.interface";

import { diffDate, isDateInBetween, commonDate } from "../../utils/dateHelper";

export const calculatePower = async (bill: Bill) => {
  const { date_from, date_to } = bill;

  const families = await getFamilies({ skip: 0, limit: 1000 });

  const formatedFamily = families
    .map((family: any) => {
      const { start, end } = commonDate(date_from, date_to, family.date_from, family.date_to);

      const haveCommonDaysWithBill = !start || !end;

      const diff = haveCommonDaysWithBill ? 0 : diffDate(start, end, family.absent_days);

      return {
        ...family._doc,
        payableDates: diff,
        payFactor: diff * family._doc.members_count,
        payable_date_from: start || null,
        payable_date_to: end || null,
      };
    })
    .filter((item) => item.payableDates !== 0);

  const mainFactor = Math.ceil(bill.main_price / formatedFamily.map((item) => item.payableDates).reduce((acc, current) => acc + current));

  const payment = formatedFamily.map((item) => {
    return {
      date_from: new Date(item.payable_date_from),
      date_to: new Date(item.payable_date_to),
      family: item._id,
      bill: bill._id,
      amount_paid: item.payableDates * mainFactor,
      is_paid: false,
    };
  });

  return payment;
};
