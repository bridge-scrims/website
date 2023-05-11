import { NextApiRequest, NextApiResponse } from "next"

import ApiRouteWithSession from "@/lib/middleware/with-session"
import RateLimitedApiRoute from "@/lib/middleware/rate-limit"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy()
    return res.status(200).send("Logged out.")
}

export default RateLimitedApiRoute(ApiRouteWithSession(handler), { points: 1, duration: 1.5 })
