import { Hono } from "hono";
import { Env } from './core-utils';
// Mock Data
const mockLeads = [
    { id: 1, name: "Michael Davis", phone: "541-555-1234", type: "Phone Call", status: "New", timestamp: "4:52 PM" },
    { id: 2, name: "Jennifer Smith", email: "jen.smith@example.com", type: "Website Form", status: "New", timestamp: "2:15 PM" },
    { id: 3, name: "David Wilson", phone: "541-555-8765", type: "Phone Call", status: "Contacted", timestamp: "11:03 AM" },
    { id: 4, name: "Sarah Miller", email: "sarahm@example.com", type: "Website Form", status: "Quote Sent", timestamp: "Yesterday" },
];
const mockSeoData = {
    starter: { score: 45, checks: [{ name: "Mobile Friendly", status: false }, { name: "Page Speed (Desktop)", status: true }, { name: "Page Speed (Mobile)", status: false }, { name: "Secure (HTTPS)", status: true }, { name: "Meta Description", status: false }] },
    growth: { score: 82, checks: [{ name: "Mobile Friendly", status: true }, { name: "Page Speed (Desktop)", status: true }, { name: "Page Speed (Mobile)", status: true }, { name: "Secure (HTTPS)", status: true }, { name: "Meta Description", status: true }] },
    scale: { score: 82, checks: [{ name: "Mobile Friendly", status: true }, { name: "Page Speed (Desktop)", status: true }, { name: "Page Speed (Mobile)", status: true }, { name: "Secure (HTTPS)", status: true }, { name: "Meta Description", status: true }] }
};
const mockKeywordData = [
    { month: 'Jan', rank: 9, competitor: 3 }, { month: 'Feb', rank: 8, competitor: 3 }, { month: 'Mar', rank: 8, competitor: 2 },
    { month: 'Apr', rank: 6, competitor: 2 }, { month: 'May', rank: 5, competitor: 1 }, { month: 'Jun', rank: 4, competitor: 1 },
];
const mockAiLog = [
    { time: "4:52 PM", text: "Call from (541) 555-1234. Answered by AI. Caller asked for a quote for a metal roof. AI collected details, sent info packet via SMS. Lead created in CRM." },
    { time: "2:15 PM", text: "Call from (541) 555-1122. Answered by AI. Caller asked about business hours. AI provided hours from directory listing. No lead created." },
    { time: "11:03 AM", text: "Missed call from unknown number. AI sent \"Sorry we missed you...\" SMS." },
    { time: "Yesterday", text: "Call from (541) 555-9988. Answered by AI. Caller scheduled a consultation for Friday at 10 AM. Event added to calendar." }
];
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    app.get('/api/leads', (c) => {
        return c.json({ success: true, data: mockLeads });
    });
    app.get('/api/seo', (c) => {
        return c.json({ success: true, data: mockSeoData });
    });
    app.get('/api/keywords', (c) => {
        return c.json({ success: true, data: mockKeywordData });
    });
    app.get('/api/ai-logs', (c) => {
        return c.json({ success: true, data: mockAiLog });
    });
}