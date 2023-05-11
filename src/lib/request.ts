export interface RequestOptions extends RequestInit {
    signal?: never
    /** number in seconds */
    timeout?: number
    urlParams?: Record<string, any>
}

export class RequestError extends Error {
    name = "RequestError"
}

export class HTTPError extends RequestError {
    name = "HTTPError"
    public url: string
    public status: number
    public headers: Headers
    public response: string

    constructor(msg: string, resp: Response, body: string) {
        super(msg)
        this.url = resp.url
        this.status = resp.status
        this.headers = resp.headers
        this.response = body
    }
}

async function request(url: string, options: RequestOptions = {}): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), (options.timeout || 10) * 1000)
    if (options.urlParams) url += `?${new URLSearchParams(options.urlParams)}`

    function requestError(): Response {
        if (controller.signal.aborted) throw new RequestError("Request timed out")
        throw new RequestError("Network unavailable")
    }

    return fetch(url, { ...options, signal: controller.signal, cache: "no-cache" })
        .catch(requestError)
        .then(async (resp) => {
            clearTimeout(timeoutId)
            if (!resp.ok) {
                const body = await resp.text().catch(() => "")
                throw new HTTPError(`${resp.status} Response`, resp, body)
            }
            return resp
        })
}

export { request }
export default request
