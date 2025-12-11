import React from 'react';
import { BarChart2, BrainCircuit, CheckCircle, Lock, Mail, Phone, UserPlus, XCircle, Zap, Bot } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Plan } from '@/stores/usePlanStore';
import { cn } from '@/lib/utils';
type Lead = { id: number; name: string; phone?: string; email?: string; type: string; status: string; };
type SeoCheck = { name: string; status: boolean };
type SeoData = { starter: { score: number; checks: SeoCheck[] }; growth: { score: number; checks: SeoCheck[] }; scale: { score: number; checks: SeoCheck[] } };
type Keyword = { month: string; rank: number; competitor: number };
type AiLog = { time: string; text: string };
const widgetVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    hover: { y: -5, scale: 1.02, transition: { duration: 0.3 } }
};
const WidgetCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div initial="initial" animate="animate" whileHover="hover" variants={widgetVariants}>
        <Card className={cn("shadow-soft rounded-2xl h-full", className)}>
            {children}
        </Card>
    </motion.div>
);
export const LeadsWidget = ({ plan, leads, onUpgrade }: { plan: Plan; leads?: Lead[]; onUpgrade: () => void; }) => {
    const isLocked = plan === 'starter';
    if (!leads) return <WidgetSkeleton />;
    return (
        <WidgetCard>
            <CardHeader>
                <CardTitle className="flex items-center"><UserPlus className="w-5 h-5 mr-3 text-primary" />Recent Leads</CardTitle>
                <CardDescription>New opportunities from your website and phone calls.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {leads.map(lead => (
                        <div key={lead.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${lead.type === 'Phone Call' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                    {lead.type === 'Phone Call' ? <Phone className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{isLocked ? `Lead from ${lead.name.substring(0, 1)}...` : lead.name}</p>
                                    <p className="text-sm text-muted-foreground">{isLocked ? `${lead.type} - (${lead.phone ? lead.phone.substring(0, 5) : '...'}***-****)` : `${lead.type} - ${lead.phone || lead.email}`}</p>
                                </div>
                            </div>
                            {isLocked ? (
                                <Button variant="outline" size="sm" className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus-visible:ring-primary h-11" onClick={onUpgrade} aria-label={`Unlock lead from ${lead.name}`}>
                                    <Lock className="w-4 h-4 mr-2" /> Unlock
                                </Button>
                            ) : (
                                <Select defaultValue={lead.status}>
                                    <SelectTrigger className="w-[120px] text-sm h-11 focus:ring-primary" aria-label={`Change status for lead ${lead.name}`}>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="Contacted">Contacted</SelectItem>
                                        <SelectItem value="Quote Sent">Quote Sent</SelectItem>
                                        <SelectItem value="Won">Won</SelectItem>
                                        <SelectItem value="Lost">Lost</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}
                </div>
                {isLocked && (
                    <div className="mt-6 text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-semibold text-blue-800">You have {leads.length} new leads waiting!</p>
                        <p className="text-sm text-blue-700 mt-1">Upgrade to the Growth Plan to see details and manage your pipeline.</p>
                        <Button size="sm" className="mt-3 focus-visible:ring-primary h-11 px-6" onClick={onUpgrade}>Upgrade Now</Button>
                    </div>
                )}
            </CardContent>
        </WidgetCard>
    );
};
export const SeoAuditWidget = ({ plan, seoData, onUpgrade }: { plan: Plan; seoData?: SeoData; onUpgrade: () => void; }) => {
    if (!seoData) return <WidgetSkeleton />;
    const data = seoData[plan];
    const scoreColor = data.score < 60 ? 'text-red-500' : (data.score < 80 ? 'text-yellow-500' : 'text-green-500');
    const strokeColor = data.score < 60 ? '#ef4444' : (data.score < 80 ? '#f59e0b' : '#22c55e');
    return (
        <WidgetCard>
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart2 className="w-5 h-5 mr-3 text-primary" />{plan === 'starter' ? 'One-Time SEO Audit' : 'Monthly SEO Report'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center mb-6" role="status" aria-label={`SEO score is ${data.score} out of 100`}>
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            <path className="stroke-gray-200" strokeWidth="3.8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: `0, 100` }} animate={{ strokeDasharray: `${data.score}, 100` }} transition={{ duration: 1.5, ease: "circOut" }} stroke={strokeColor} strokeWidth="3.8" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold ${scoreColor}`}>{data.score}</span>
                            <span className="text-sm text-muted-foreground">/ 100</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {data.checks.map((check, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-foreground">{check.name}</span>
                            {check.status ? <CheckCircle className="w-5 h-5 text-green-500" aria-label="Passed" /> : <XCircle className="w-5 h-5 text-red-500" aria-label="Failed" />}
                        </div>
                    ))}
                </div>
                 {plan === 'starter' && (
                    <Button className="w-full mt-6 h-11 focus-visible:ring-primary" onClick={onUpgrade}>Upgrade for Monthly Audits</Button>
                )}
            </CardContent>
        </WidgetCard>
    );
};
export const KeywordTrackerWidget = ({ keywords }: { keywords?: Keyword[] }) => {
    if (!keywords) return <WidgetSkeleton />;
    return (
    <WidgetCard>
        <CardHeader>
            <CardTitle className="flex items-center"><Zap className="w-5 h-5 mr-3 text-primary" />Keyword Rank Tracking</CardTitle>
            <CardDescription>Tracking: "roofing grants pass"</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-64" role="status" aria-label="Keyword ranking chart showing your rank versus top competitor over time.">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={keywords} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{fontSize: 12}} />
                        <YAxis reversed={true} domain={[1, 10]} tick={{fontSize: 12}} allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rank" name="Your Rank" stroke="#F38020" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="competitor" name="Top Competitor" stroke="#6366F1" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </WidgetCard>
)};
export const AiReceptionistWidget = ({ aiLogs }: { aiLogs?: AiLog[] }) => {
    if (!aiLogs) return <WidgetSkeleton />;
    const usage = 27;
    const total = 250;
    const usagePercentage = (usage / total) * 100;
    return (
    <WidgetCard>
        <CardHeader>
            <CardTitle className="flex items-center"><BrainCircuit className="w-5 h-5 mr-3 text-primary" />AI Receptionist Call Log</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {aiLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 bg-indigo-100 p-2 rounded-full">
                            <Bot className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground">{log.text}</p>
                            <p className="text-xs text-muted-foreground">{log.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <div id="ai-usage-description" className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-indigo-800">Monthly Usage</span>
                    <span>{usage} / {total} minutes</span>
                </div>
                <Progress value={usagePercentage} className="h-3 [&>*]:bg-indigo-500" aria-labelledby="ai-usage-description" />
            </div>
        </CardContent>
    </WidgetCard>
)};
export const WidgetSkeleton = () => (
    <Card className="shadow-soft rounded-2xl">
        <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </CardContent>
    </Card>
);