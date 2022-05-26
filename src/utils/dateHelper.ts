import moment from "moment";

type DATE_DIFF = (st: any, ed: any, Ex?: Array<Date>) => any;
type commonDate = (billStartDate: Date, billEndDate: Date, FamilyStartDate: Date, familyEndDate: Date) => any;

export const diffDate: DATE_DIFF = (startDate, endDate, exclude) => {
  try {
    const start = moment(new Date(startDate));
    const end = moment(new Date(endDate));
    const diff = start.diff(end);

    const absentDates = exclude?.filter((dateItem: any) => {
      const formatedDate = moment(new Date(dateItem));
      return formatedDate.isAfter(start) && formatedDate.isBefore(end);
    });

    const absenceAmount = absentDates?.length || 0;

    const presentDays = Math.abs(diff / 1000 / 60 / 60 / 24);

    return Math.round(presentDays - absenceAmount);
  } catch (error) {
    return error;
  }
};

export const isDateInBetween = (from: any, to: any, date: any) => {
  const datefrom = moment(new Date(from));
  const dateTo = moment(new Date(to));
  const targetDate = moment(new Date(date));
  return targetDate.isAfter(datefrom) && targetDate.isBefore(dateTo);
};

export const commonDate: commonDate = (billStartDate, billEndDate, FamilyStartDate, familyEndDate) => {
  const billSt = moment(new Date(billStartDate));
  const billEd = moment(new Date(billEndDate));
  const familySt = moment(new Date(FamilyStartDate));
  const familyEd = familyEndDate ? moment(new Date(familyEndDate)) : moment(new Date());

  const commonStartDate = billSt.isAfter(familySt) ? billSt : familySt;
  const commonEndDate = billEd.isBefore(familyEd) ? billEd : familyEd;

  if (commonStartDate.isAfter(commonEndDate)) {
    return {};
  } else {
    return {
      //? subtracted one day from start Date
      start: commonStartDate.subtract(1, "day").format(),
      end: commonEndDate.format(),
    };
  }
};

// const from = new Date("March 1 , 2022");
// const to = new Date("March 13 , 2022");

// const DDfrom = new Date("March 15 , 2022");
// const DDend = new Date("March 30 , 2022");

// const res = commonDate(from, to, DDfrom, DDend);

// console.log(res);

// console.log(diffDate(res.start, res.end));
