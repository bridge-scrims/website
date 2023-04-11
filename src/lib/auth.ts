import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, Redirect } from "next";
import { IronSession, getIronSession, IronSessionOptions } from "iron-session";
import { IncomingMessage, ServerResponse } from "http";
import { getHostMember } from "./DiscordBot";
import { GuildMember } from "discord.js";

if (!process.env.SESSION_SECRET) throw new TypeError("SESSION_SECRET env var must be defined!")

export const SESSION_REFRESH_AFTER = 10*24*60*60
export const IRON_SESSION_OPTIONS: IronSessionOptions = {
    cookieName: "iron-session",
    password: process.env.SESSION_SECRET,
    ttl: 40*24*60*60,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    }
}

export type PositionLevel = keyof typeof POSITION_ROLES
export const POSITION_ROLES = {
    Staff: "759949547882545154",
    Support: "834247683484024893"
}

declare module "iron-session" {
    interface IronSessionData {
        refresh: number,
        userId: string
    }
}

export async function verifySession(session: IronSession, positionLevel?: PositionLevel): Promise<GuildMember | false> {
    if (!session.userId) return false;
    const member = await getHostMember(session.userId)
    if (!member) return false;
    return verifyMember(member, positionLevel) ? member : false;
}

export function verifyMember(member: GuildMember, positionLevel: PositionLevel = "Support") {
    const roles = Array.from(member.roles.cache.keys())
    const hasLevel = Object.entries(POSITION_ROLES).find(([_, v]) => roles.includes(v))?.[0]
    return getPositionLevelValue(hasLevel) >= getPositionLevelValue(positionLevel);
}

export function getPositionLevelValue(pos?: string) {
    return Object.keys(POSITION_ROLES).reverse().indexOf(pos ?? "")
}

export async function getSession(req: IncomingMessage | NextApiRequest, res: ServerResponse | NextApiResponse) {
    req.session = await getIronSession(req, res, IRON_SESSION_OPTIONS)
    const now = Math.floor(Date.now() / 1000)
    if (!req.session.refresh) {
        req.session.refresh = now + SESSION_REFRESH_AFTER
    }else if (req.session.refresh <= now) {
        req.session.refresh = now + SESSION_REFRESH_AFTER
        await req.session.save()
    }
    return req.session
}

export async function getVerifiedSession(req: IncomingMessage | NextApiRequest, res: ServerResponse | NextApiResponse, positionLevel?: PositionLevel) {
    const session = await getSession(req, res)
	return verifySession(session, positionLevel)
}

type VerifiedOrRedirect = { redirect: Redirect, verified?: undefined } | { redirect?: undefined, verified: GuildMember }
export async function verifySessionOrRedirect(context: GetServerSidePropsContext, positionLevel?: PositionLevel): Promise<VerifiedOrRedirect> {
	const verified = await getVerifiedSession(context.req, context.res, positionLevel)
	if (!verified) 
        return {
            redirect: {
                destination: "/login",
                statusCode: 303
            }
        }
	return { verified }
}

export async function verifySessionOr401Response(req: NextApiRequest, res: NextApiResponse, positionLevel?: PositionLevel) {
    const session = await getSession(req, res)
    if (!session.userId) return res.status(401).json({ message: 'Unauthorized' });
    const verified = await verifySession(session, positionLevel)
    if (!verified) return res.status(401).json({ message: 'Insufficient Permissions' });
    return verified
}