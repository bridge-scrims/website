import { RateLimiterMemory, RateLimiterAbstract, RateLimiterRes } from "rate-limiter-flexible"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * See https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/#cf-connecting-ip
 * since we use Cloudflare as a reverse proxy.
 */
function getIP(request: NextApiRequest) {
    const cloudflare = (request.headers["cf-connecting-ip"] as string) || ""
    const standard = (request.headers["x-forwarded-for"] as string) || ""
    const requester = cloudflare || standard.split(",")[0]
    if (!requester && process.env.NODE_ENV === "production")
        console.warn("No Ip in request headers...", request.headers)
    return requester || "127.0.0.1"
}

export default function RateLimitedApiRoute(handler: NextApiHandler, config: Partial<RateLimiterAbstract>) {
    const rateLimiter = new RateLimiterMemory(config)
    async function handle(req: NextApiRequest, res: NextApiResponse, retryCount: number = 0): Promise<void> {
        await rateLimiter
            .consume(getIP(req))
            .then(() => handler(req, res))
            .catch((r: unknown) => {
                if (r instanceof RateLimiterRes) {
                    if (retryCount >= 5) return res.status(429).json({ message: "Too Many Requests" })
                    return sleep(r.msBeforeNext).then(() => {
                        if (!res.writableEnded) return handle(req, res, retryCount++)
                    })
                }
                if (r instanceof Error) throw r
                return r
            })
    }
    return ((req, res) => handle(req, res)) as NextApiHandler
}
