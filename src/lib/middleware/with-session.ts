import { NextApiHandler } from "next"
import { getSession } from "../auth"

export default function ApiRouteWithSession(handler: NextApiHandler): NextApiHandler {
    return async (req, res) => {
        req.session = await getSession(req, res)
        return handler(req, res)
    }
}
