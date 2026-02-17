import { SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown, { type User } from "@/components/shadcn-space/blocks/dashboard-shell-01/user-dropdown";
import NotificationDropdown from "@/components/shadcn-space/blocks/dashboard-shell-01/notification-dropdown";
import { BellRing, SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

type SiteHeaderProps = {
  user?: User | null;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <InputGroup className="hidden sm:flex">
          <InputGroupInput placeholder="Search" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center gap-3">
        <NotificationDropdown
          defaultOpen={false}
          align="center"
          trigger={
            <div className="rounded-full p-2 hover:bg-accent relative before:absolute before:bottom-0 before:left-1/2 before:z-10 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:top-1">
              <BellRing className="size-4" />
            </div>
          }
        />
        <UserDropdown
          user={user ?? null}
          defaultOpen={false}
          align="center"
        />
      </div>
    </div>
  );
}
