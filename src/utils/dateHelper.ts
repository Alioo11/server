import moment from "moment";

type DATE_DIFF = (st: string, ed: string, Ex?: Array<String>) => any;

export const diffDat: DATE_DIFF = (startDate, endDate, exclude) => {
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

    return presentDays - absenceAmount;
  } catch (error) {
    return error;
  }
};
