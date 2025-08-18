import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface TabPanelProps {
  readonly tabId: string;
  readonly activeTab: string;
  readonly children: JSX.Element | JSX.Element[];
  readonly className?: string;
}

export function TabPanel({
  tabId,
  activeTab,
  children,
  className,
}: TabPanelProps): JSX.Element {
  const isActive = tabId === activeTab;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      aria-hidden={!isActive}
      className={cn("focus:outline-none", !isActive && "hidden", className)}
    >
      {children}
    </div>
  );
}
