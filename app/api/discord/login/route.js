import { redirect } from 'next/navigation'

exst const DISCORD_CLIENT_ID = '1463586369791066253'
const DISCORD_CLIENT_SECRET = 'vMu89UHqjBJhNdxqAmkzv2qlk9crVXfK'
const REDIRECT_URI = 'https://antiraidsbk.vercel.app/api/discord/callback'
const DISCORD_API = 'https://discord.com/api/v10'

export async function GET() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds',
  })

  redirect(`https://discord.com/oauth2/authorize?${params}`)
}
