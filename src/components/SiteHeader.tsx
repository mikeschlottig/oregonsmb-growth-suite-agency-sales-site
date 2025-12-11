import React, { useState, useEffect } from 'react';
import { Building, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
type SiteHeaderProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};
export function SiteHeader({ activeTab, onTabChange }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { id: 'home', label: 'Find a Pro' },
    { id: 'for-business', label: 'For Business' },
    { id: 'pricing', label: 'Pricing' },
  ];
  const NavLink = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => {
        onTabChange(id);
        setIsMobileMenuOpen(false);
      }}
      className={cn(
        'text-base font-medium transition-colors hover:text-primary',
        activeTab === id ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {label}
    </button>
  );
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 backdrop-blur-lg' : 'bg-background'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onTabChange('home')}
          >
            <Building className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold">OregonSMB</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.id} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden sm:inline-flex"
              onClick={() => onTabChange('dashboard')}
            >
              Sign In
            </Button>
            <Button
              className="btn-gradient hidden sm:inline-flex"
              onClick={() => onTabChange('dashboard')}
            >
              Dashboard
            </Button>
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-8">
                       <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            onTabChange('home');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Building className="h-7 w-7 text-primary" />
                          <span className="font-display text-xl font-bold">OregonSMB</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <nav className="flex flex-col space-y-6">
                      {navLinks.map((link) => (
                        <NavLink key={link.id} {...link} />
                      ))}
                    </nav>
                    <div className="mt-auto space-y-4">
                       <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            onTabChange('dashboard');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          className="btn-gradient w-full"
                          onClick={() => {
                            onTabChange('dashboard');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Dashboard
                        </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}