import finder from "../assets/svg/finder.app.svg";
import books from "../assets/svg/books.app.svg";
import calendar from "../assets/svg/calendar.app.svg";

export interface Icons {
  icon: string | undefined;
  label: string;
}

export const AllIcons = [
  { icon: finder, label: "Finder" },
  { icon: books, label: "Books" },
  { icon: calendar, label: "Calender" },
];
