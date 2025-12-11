import React, { useState, useEffect, Suspense } from 'react';
import { Search, UserPlus, Zap, BrainCircuit, Building } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PricingCard } from '@/components/PricingCard';
import {
  LeadsWidget,
  SeoAuditWidget,
  KeywordTrackerWidget,
  AiReceptionistWidget,
  WidgetSkeleton,
} from '@/components/DashboardWidgets';
type Plan = 'starter' | 'growth' | 'scale';
type Page = 'marketing' | 'dashboard';
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};
export function HomePage() {
  const [page, setPage] = useState<Page>('marketing');
  const [activeMarketingTab, setActiveMarketingTab] = useState('home');
  const [plan, setPlan] = useState<Plan>('growth');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedPlan = localStorage.getItem('oregonSMBPlan') as Plan;
    if (savedPlan) {
      setPlan(savedPlan);
    }
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);
  const handleSetPlan = (newPlan: Plan) => {
    setPlan(newPlan);
    localStorage.setItem('oregonSMBPlan', newPlan);
    setPage('dashboard');
    toast.success(`Switched to ${newPlan.charAt(0).toUpperCase() + newPlan.slice(1)} Plan!`, {
      description: 'Your dashboard has been updated.',
    });
  };
  const handleTabChange = (tab: string) => {
    if (tab === 'dashboard') {
      setPage('dashboard');
    } else {
      setPage('marketing');
      setActiveMarketingTab(tab);
    }
  };
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
  const MarketingPage = () => (
    <Tabs value={activeMarketingTab} onValueChange={setActiveMarketingTab} className="w-full">
      <TabsContent value="home" className="mt-0">
        <div className="relative bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-display font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Find a Trusted Local Pro in</span>{' '}
                    <span className="block text-primary xl:inline">Southern Oregon</span>
                  </h1>
                  <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    From roofers to real estate, connect with the best local service businesses right here.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="w-full max-w-lg lg:max-w-md">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="text" placeholder="What service do you need?" className="w-full pl-12 pr-4 py-3 h-14 text-lg rounded-xl" />
                      </div>
                      <Button size="lg" className="mt-3 w-full h-14 text-lg btn-gradient">Search</Button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" alt="Business professionals" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="for-business">
        <div className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-4">Your All-in-One Command Center for Local Growth</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">Stop juggling messy spreadsheets and missed calls. The OregonSMB Growth Suite provides everything you need to succeed online.</p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { icon: UserPlus, title: 'Get Discovered', text: "Get a premium, featured listing on Oregon's fastest-growing directory. Stand out from the competition and drive more traffic.", color: 'blue' },
                { icon: Zap, title: 'Convert Leads', text: 'Automatically capture every lead with our simple CRM. Use email & SMS automation to follow up instantly so you never miss an opportunity.', color: 'green' },
                { icon: BrainCircuit, title: 'Automate & Grow', text: 'Put your growth on autopilot with our AI Receptionist and automated SEO tools. Focus on your work while we grow your business.', color: 'indigo' }
              ].map(item => (
                <Card key={item.title} className="bg-background p-8 rounded-2xl shadow-soft hover:-translate-y-2 transition-transform duration-300">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${item.color}-100 rounded-full mb-4`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </Card>
              ))}
            </div>
            <div className="mt-12">
              <Button size="lg" className="text-xl px-8 py-6 btn-gradient" onClick={() => setActiveMarketingTab('pricing')}>
                See Plans & Pricing
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="pricing">
        <div className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-4">Simple, Transparent Pricing</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Pick the plan that's right for you. No hidden fees, cancel anytime.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              <PricingCard plan="Starter" price="0" features={["Directory Listing", "Lead Capture (Locked)", "1-Time SEO Audit"]} cta="Claim Your Listing" onSelect={() => handleSetPlan('starter')} />
              <PricingCard plan="Growth" price="49" features={["Featured Directory Listing", "Unlock All Leads & CRM", "Email & SMS Automation", "Monthly SEO Audits", "Track 10 Keywords"]} cta="Start 7-Day Free Trial" popular={true} onSelect={() => handleSetPlan('growth')} />
              <PricingCard plan="Scale" price="99" features={["Everything in Growth", "AI Receptionist (250 mins)", "Priority Support", "Advanced Analytics"]} cta="Start 7-Day Free Trial" onSelect={() => handleSetPlan('scale')} />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
  const Dashboard = () => (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your {planName} Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Current Plan:</span>
              <Select value={plan} onValueChange={(value: Plan) => handleSetPlan(value)}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Change Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Suspense fallback={<WidgetSkeleton />}>
                {isLoading ? <WidgetSkeleton /> : <LeadsWidget plan={plan} />}
              </Suspense>
              {plan !== 'starter' && (
                <Suspense fallback={<WidgetSkeleton />}>
                  {isLoading ? <WidgetSkeleton /> : <KeywordTrackerWidget />}
                </Suspense>
              )}
            </div>
            <div className="space-y-8">
              <Suspense fallback={<WidgetSkeleton />}>
                {isLoading ? <WidgetSkeleton /> : <SeoAuditWidget plan={plan} />}
              </Suspense>
              {plan === 'scale' && (
                <Suspense fallback={<WidgetSkeleton />}>
                  {isLoading ? <WidgetSkeleton /> : <AiReceptionistWidget />}
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-background font-sans">
      <SiteHeader activeTab={page === 'marketing' ? activeMarketingTab : 'dashboard'} onTabChange={handleTabChange} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {page === 'marketing' ? <MarketingPage /> : <Dashboard />}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <Toaster richColors closeButton />
    </div>
  );
}