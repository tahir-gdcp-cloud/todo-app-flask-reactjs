import { createBrowserRouter } from "react-router-dom";
import { LandingRoot } from "./landing/root";
import { HomePage } from "./landing/home/page";
import { DashboardRoot } from "./dashboard/root";
import { DashboardHomePage } from "./dashboard/page";
import { ContactForm } from '../components/contactForm';
import { FeedbackForm } from "@/components/ui/FeedbackForm";
import { BookmarkManager } from "@/components/ui/BookmarkManager";
import { HabitTracker } from "@/components/ui/HabitTracker";
import { StockMaster } from "@/components/ui/StockMaster";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingRoot />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [{ index: true, element: <DashboardHomePage /> }],
  },
  {
    path: "/contact",
    element: <ContactForm />,
    children: [{ index: true, element: <ContactForm /> }],
  },
   {
    path: "/feedback",
    element: <FeedbackForm />,
    children: [{ index: true, element: <FeedbackForm /> }],
  },
  {
    path: "/bookmarks",
    element: <BookmarkManager />,
    children: [{ index: true, element: <BookmarkManager /> }],
  },
  {
    path: "/habit-tracker",
    element: <HabitTracker />,
    children: [{ index: true, element: <HabitTracker /> }],
  },
   {
    path: "/stock-master",
    element: <StockMaster />,
    children: [{ index: true, element: <StockMaster /> }],
  },
]);
