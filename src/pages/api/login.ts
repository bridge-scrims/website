import { NextApiRequest, NextApiResponse } from 'next'

import ApiRouteWithSession from '@/lib/middleware/with-session';
import RateLimitedApiRoute from '@/lib/middleware/rate-limit';
import dbConnection from '@/lib/db/connection';
import { verifySession } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json(req.session || {})
    }else if (req.method === 'POST') {
        const data = new URLSearchParams(req.body)
        const code = data.get('code')
        if (!code) return res.status(400).json({ message: "No Linking Code" })
    
        const db = await dbConnection()
        const request = await db.linkingRequests.findOne({ where: { code } })
        if (!request) return res.status(400).json({ message: "Invalid Linking Code" })
    
        req.session.userId = request.userId
        const member = await verifySession(req.session, "Support")
        if (!member) return res.status(403).json({ message: "Insufficient Permissions" })
    
        await req.session.save()
        return res.status(200).json({ message: `Welcome ${member.user.tag}` })
    }
    return res.status(405).setHeader('Allow', 'GET, POST').json({ message: "Method Not Allowed" })
}

export default RateLimitedApiRoute(ApiRouteWithSession(handler), { points: 1, duration: 1.5 })