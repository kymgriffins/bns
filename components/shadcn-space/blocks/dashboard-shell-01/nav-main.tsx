"use client"

import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { NavItem } from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavMain({ items, isCollapsed = false }: { items: NavItem[]; isCollapsed?: boolean }) {
  const pathname = usePathname();
  
  // Recursive render function
  const renderItem = (item: NavItem) => {
    // Section label - hide when collapsed
    if (item.isSection && item.label) {
      return (
        <SidebarGroup key={item.label} className={cn("p-0 pt-5 first:pt-0", isCollapsed && "hidden")}>
          <SidebarGroupLabel className="p-0 text-xs font-medium uppercase text-sidebar-foreground">
            {item.label}
          </SidebarGroupLabel>
        </SidebarGroup>
      );
    }
    const hasChildren = !!item.children?.length;
    // Item with children → collapsible
    if (hasChildren && item.title) {
      return (
        <SidebarGroup key={item.title} className={cn("p-0", isCollapsed && "hidden")}>
          <SidebarMenu>
            <Collapsible>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="rounded-xl text-sm px-3 py-2 h-9"
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 collapsible/button-[aria-expanded='true']:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="me-0 pe-0">
                    {item.children!.map(renderItemSub)}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      );
    }
    // Item without children
    if (item.title) {
      return (
        <SidebarGroup key={item.title} className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={isCollapsed ? item.title : undefined}
                className={cn(
                  "rounded-lg text-sm px-3 py-2 h-9 justify-center",
                  isCollapsed && "w-10 px-0",
                  pathname === item.href ? "bg-primary hover:bg-primary dark:bg-blue-500 text-white dark:hover:bg-blue-500 hover:text-white" : ""
                )}
              >
                <a href={item.href} className={cn("flex items-center gap-2", isCollapsed && "justify-center w-full")}>
                  {item.icon && <item.icon className={isCollapsed ? "h-5 w-5" : ""} />}
                  {!isCollapsed && <span>{item.title}</span>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      );
    }
    return null;
  };
  // Recursive render function for sub-items
  const renderItemSub = (item: NavItem) => {
    const hasChildren = !!item.children?.length;
    if (hasChildren && item.title) {
      return (
        <SidebarMenuSubItem key={item.title}>
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuSubButton className="rounded-xl text-sm px-3 py-2 h-9">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 data-[state=open]:rotate-90" />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="me-0 pe-0">
                {item.children!.map(renderItemSub)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuSubItem>
      );
    }
    if (item.title) {
      return (
        <SidebarMenuSubItem key={item.title} className="w-full">
          <SidebarMenuSubButton asChild className="w-full">
            <a href={item.href}>{item.title}</a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    }
    return null;
  };

  return <>{items.map(renderItem)}</>;
}
