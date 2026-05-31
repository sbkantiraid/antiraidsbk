import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()

  const userCookie = cookieStore.get('discord_user')
  const guildsCookie = cookieStore.get('discord_guilds')

  if (!userCookie || !guildsCookie) {
    return new Response(JSON.stringify({ user: null, guilds: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const user = JSON.parse(userCookie.value)
    const guilds = JSON.parse(guildsCookie.value)

    return new Response(JSON.stringify({ user, guilds }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ user: null, guilds: [], error: 'Failed to parse data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
