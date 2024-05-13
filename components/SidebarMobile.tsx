"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SidebarItemsNav from "./SidebarItemsNav";
import { LinkItemsNav } from "@/constants/data";

const SidebarMobile = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-9">
              {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2> */}
              <div className="space-y-1">
                <SidebarItemsNav items={LinkItemsNav} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SidebarMobile