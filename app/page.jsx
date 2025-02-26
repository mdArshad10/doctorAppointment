import Image from "next/image";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
  },
  {
    title: "Appointment",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Doctors",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Pathology Result",
    url: "#",
    icon: Search,
  },
  {
    title: "Chats",
    url: "#",
    icon: Settings,
  },
];

export default function HomePage() {
  return <h1>This is for text</h1>;
}
