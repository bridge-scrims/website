import { NextApiRequest, NextApiResponse } from 'next'
import { verifySessionOr401Response } from '@/lib/auth'
import dbConnection from '@/lib/db/connection'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const verified = await verifySessionOr401Response(req, res, 'Support')
    if (!verified) return;

    const conn = await dbConnection()
    return res.status(200).json(req.session)
}