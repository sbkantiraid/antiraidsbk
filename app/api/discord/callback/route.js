import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const DISCORD_CLIENT_ID = '1463586369791066253'
const DISCORD_CLIENT_SECRET = 'vMu89UHqjBJhNdxqAmkzv2qlk9crVXfK'
const REDIRECT_URI = 'https://antiraidsbk.vercel.app/api/discord/callback'
const DISCORD_API = 'https://discord.com/api/v10'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new Response('Error: No authorization code received', { status: 400 })
  }

  try {
    // Intercambiar código por token
    const tokenResponse = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return new Response('Error: Failed to get access token', { status: 400 })
    }

    // Obtener información del usuario
    const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    const userData = await userResponse.json()

    // Obtener servidores del usuario
    const guildsResponse = await fetch(`${DISCORD_API}/users/@me/guilds`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    const guildsData = await guildsResponse.json()

    // Guardar tokens en cookies
    const cookieStore = cookies()
    cookieStore.set('discord_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
    })
    cookieStore.set('discord_user', JSON.stringify(userData), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
    })
    cookieStore.set('discord_guilds', JSON.stringify(guildsData), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    redirect('/dashboard')
  } catch (error) {
    console.error('OAuth error:', error)
    return new Response('Error during authentication', { status: 500 })
  }
}
