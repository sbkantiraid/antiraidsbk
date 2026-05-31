import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()

  // Eliminar cookies
  cookieStore.delete('discord_access_token')
  cookieStore.delete('discord_user')
  cookieStore.delete('discord_guilds')
  cookieStore.delete('selected_guild')

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
