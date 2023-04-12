import { NextApiRequest, NextApiResponse } from 'next'
import { verifySessionOr401Response } from '@/lib/auth'
import dbConnection from '@/lib/db/connection'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const verified = await verifySessionOr401Response(req, res, 'Support')
    if (!verified) return;

    const db = await dbConnection()
    if (!db) return res.status(503).json({ message: "Service currently unavailable" })

    return res.status(200).json(req.session)
}