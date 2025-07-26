import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import SideNav from "./ui/dashboard/sidenav";
import MobileLayout from "./ui/dashboard/mobile-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          {/* Mobile Layout - Only visible on mobile */}
          <div className="md:hidden">
            <MobileLayout />
          </div>

          {/* Desktop Sidebar - Only visible on desktop */}
          <div className="hidden md:block w-64">
            <SideNav />
          </div>

          {/* Main content */}
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
