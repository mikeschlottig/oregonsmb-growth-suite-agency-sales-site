import React from 'react';
import { BarChart2, BrainCircuit, CheckCircle, Lock, Mail, Phone, UserPlus, XCircle, Zap, Bot } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
// Mock Data (passed as props or defined here for simplicity)
const mockLeads = [
    { id: 1, name: "Michael Davis", phone: "541-555-1234", type: "Phone Call", status: "New", timestamp: "4:52 PM" },
    { id: 2, name: "Jennifer Smith", email: "jen.smith@example.com", type: "Website Form", status: "New", timestamp: "2:15 PM" },
    { id: 3, name: "David Wilson", phone: "541-555-8765", type: "Phone Call", status: "Contacted", timestamp: "11:03 AM" },
    { id: 4, name: "Sarah Miller", email: "sarahm@example.com", type: "Website Form", status: "Quote Sent", timestamp: "Yesterday" },
];
const mockSeoData = {
    starter: { score: 45, checks: [{ name: "Mobile Friendly", status: false }, { name: "Page Speed (Desktop)", status: true }, { name: "Page Speed (Mobile)", status: false }, { name: "Secure (HTTPS)", status: true }, { name: "Meta Description", status: false }] },
    growth: { score: 82, checks: [{ name: "Mobile Friendly", status: true }, { name: "Page Speed (Desktop)", status: true }, { name: "Page Speed (Mobile)", status: true }, { name: "Secure (HTTPS)", status: true }, { name: "Meta Description", status: true }] }
};
const mockKeywordData = [
    { month: 'Jan', rank: 9, competitor: 3 }, { month: 'Feb', rank: 8, competitor: 3 }, { month: 'Mar', rank: 8, competitor: 2 },
    { month: 'Apr', rank: 6, competitor: 2 }, { month: 'May', rank: 5, competitor: 1 }, { month: 'Jun', rank: 4, competitor: 1 },
];
const mockAiLog = [
    { time: "4:52 PM", icon: Bot, text: "Call from (541) 555-1234. Answered by AI. Caller asked for a quote for a metal roof. AI collected details, sent info packet via SMS. Lead created in CRM." },
    { time: "2:15 PM", icon: Bot, text: "Call from (541) 555-1122. Answered by AI. Caller asked about business hours. AI provided hours from directory listing. No lead created." },
    { time: "11:03 AM", icon: Bot, text: "Missed call from unknown number. AI sent \"Sorry we missed you...\" SMS." },
    { time: "Yesterday", icon: Bot, text: "Call from (541) 555-9988. Answered by AI. Caller scheduled a consultation for Friday at 10 AM. Event added to calendar." }
];
// Leads Widget
export const LeadsWidget = ({ plan }: { plan: string }) => {
    const isLocked = plan === 'starter';
    return (
        <Card className="shadow-soft">
            <CardHeader>
                <CardTitle className="flex items-center"><UserPlus className="w-5 h-5 mr-3 text-primary" />Recent Leads</CardTitle>
                <CardDescription>New opportunities from your website and phone calls.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockLeads.map(lead => (
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
                                <Button variant="outline" size="sm" className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200">
                                    <Lock className="w-4 h-4 mr-2" /> Unlock
                                </Button>
                            ) : (
                                <Select defaultValue={lead.status}>
                                    <SelectTrigger className="w-[120px] text-sm">
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
                        <p className="font-semibold text-blue-800">You have {mockLeads.length} new leads waiting!</p>
                        <p className="text-sm text-blue-700 mt-1">Upgrade to the Growth Plan to see details and manage your pipeline.</p>
                        <Button size="sm" className="mt-3">Upgrade Now</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
// SEO Audit Widget
export const SeoAuditWidget = ({ plan }: { plan: string }) => {
    const data = plan === 'starter' ? mockSeoData.starter : mockSeoData.growth;
    const scoreColor = data.score < 60 ? 'text-red-500' : (data.score < 80 ? 'text-yellow-500' : 'text-green-500');
    const strokeColor = data.score < 60 ? '#ef4444' : (data.score < 80 ? '#f59e0b' : '#22c55e');
    return (
        <Card className="shadow-soft">
            <CardHeader>
                <CardTitle className="flex items-center"><BarChart2 className="w-5 h-5 mr-3 text-primary" />{plan === 'starter' ? 'One-Time SEO Audit' : 'Monthly SEO Report'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            <path className="stroke-gray-200" strokeWidth="3.8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path stroke={strokeColor} strokeWidth="3.8" fill="none" strokeDasharray={`${data.score}, 100`} strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
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
                            {check.status ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                    ))}
                </div>
                 {plan === 'starter' && (
                    <Button className="w-full mt-6">Upgrade for Monthly Audits</Button>
                )}
            </CardContent>
        </Card>
    );
};
// Keyword Tracker Widget
export const KeywordTrackerWidget = () => (
    <Card className="shadow-soft">
        <CardHeader>
            <CardTitle className="flex items-center"><Zap className="w-5 h-5 mr-3 text-primary" />Keyword Rank Tracking</CardTitle>
            <CardDescription>Tracking: "roofing grants pass"</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockKeywordData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
    </Card>
);
// AI Receptionist Widget
export const AiReceptionistWidget = () => (
    <Card className="shadow-soft">
        <CardHeader>
            <CardTitle className="flex items-center"><BrainCircuit className="w-5 h-5 mr-3 text-primary" />AI Receptionist Call Log</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {mockAiLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 bg-indigo-100 p-2 rounded-full">
                            <log.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground">{log.text}</p>
                            <p className="text-xs text-muted-foreground">{log.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-indigo-800">Monthly Usage</span>
                    <span>27 / 250 minutes</span>
                </div>
                <Progress value={(27/250)*100} className="h-3 [&>*]:bg-indigo-500" />
            </div>
        </CardContent>
    </Card>
);
export const WidgetSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </CardContent>
    </Card>
);