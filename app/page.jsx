'use client'

import { useState } from 'react'

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState('inicio')
  const [selectedServer, setSelectedServer] = useState(null)
  const [user, setUser] = useState(null)

  // Estadísticas actualizadas
  const stats = {
    servers: 53,
    users: '4,390',
    ping: '32ms'
  }

  const botStatus = {
    name: 'SBK AntiRaid',
    connected: true,
    ping: '32ms'
  }

  // Servidores de ejemplo
  const userServers = [
    { id: '1', name: 'Mi Servidor 1', icon: '🎮' },
    { id: '2', name: 'Mi Servidor 2', icon: '🎯' },
    { id: '3', name: 'Mi Servidor 3', icon: '⚡' },
  ]

  const blockedLinks = [
    'discord.gg/',
    'discord.com/invite/',
    't.me/'
  ]

  // Login con Discord
  const handleDiscordLogin = () => {
    // Simulación de login
    setUser({
      username: 'Usuario#0001',
      avatar: '👤'
    })
    setIsLoggedIn(true)
  }

  // Seleccionar servidor
  const handleSelectServer = (server) => {
    setSelectedServer(server)
    setPage('inicio')
  }

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setSelectedServer(null)
    setUser(null)
  }

  // Pantalla de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black mb-2">SBK Dashboard</h1>
              <p className="text-zinc-400">antiraidsbk.vercel.app</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-center">
              <p className="text-white font-bold mb-4">¡Bienvenido!</p>
              <p className="text-white/80 text-sm">Verifica tu cuenta de Discord para continuar</p>
            </div>

            <button
              onClick={handleDiscordLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-3 mb-4"
            >
              <span className="text-2xl">🎮</span>
              Iniciar sesión con Discord
            </button>

            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
              <p className="text-xs text-zinc-400 text-center">
                Al continuar, aceptas nuestros términos de servicio y política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de selección de servidor
  if (!selectedServer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black mb-2">Selecciona un servidor</h1>
              <p className="text-zinc-400">Elige en cuál servidor deseas configurar SBK AntiRaid</p>
            </div>

            <div className="flex items-center justify-between mb-8 bg-zinc-800/50 rounded-xl p-4">
              <div>
                <p className="text-white font-bold">{user.username}</p>
                <p className="text-zinc-400 text-sm">Conectado a Discord</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Cerrar sesión
              </button>
            </div>

            <div className="space-y-4">
              {userServers.map((server) => (
                <button
                  key={server.id}
                  onClick={() => handleSelectServer(server)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-indigo-500 rounded-2xl p-6 transition flex items-center gap-4 group"
                >
                  <div className="text-4xl">{server.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-bold text-lg">{server.name}</p>
                    <p className="text-zinc-400 text-sm">ID: {server.id}</p>
                  </div>
                  <div className="text-2xl group-hover:translate-x-1 transition">→</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-black">SBK Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-2">
              antiraidsbk.vercel.app
            </p>
          </div>

          <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-green-400">{botStatus.name}</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Bot conectado correctamente.
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-bold">ONLINE</p>
                <p className="text-zinc-400 text-sm">{botStatus.ping}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
            <p className="text-indigo-400 font-bold text-sm mb-1">Servidor Actual</p>
            <p className="text-white font-bold">{selectedServer.name}</p>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          <button
            onClick={() => setPage('inicio')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition ${page === 'inicio' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            Inicio
          </button>

          <button
            onClick={() => setPage('antiraid')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition ${page === 'antiraid' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            AntiRaid
          </button>

          <button
            onClick={() => setPage('antispam')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition ${page === 'antispam' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            AntiSpam
          </button>

          <button
            onClick={() => setPage('antilink')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition ${page === 'antilink' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            AntiLink
          </button>

          <button
            onClick={() => setPage('logs')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition ${page === 'logs' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            Logs
          </button>
        </nav>

        <div className="border-t border-zinc-800 pt-4">
          <button
            onClick={() => setSelectedServer(null)}
            className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-2xl transition text-sm font-bold"
          >
            Cambiar Servidor
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-3 rounded-2xl transition text-sm font-bold mt-2"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {page === 'inicio' && (
          <div>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 p-10 mb-8 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_40%)]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur px-4 py-2 rounded-full mb-5">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Sistema online
                </div>

                <h1 className="text-6xl font-black leading-tight mb-4">
                  ShieldBot
                </h1>

                <p className="text-xl text-white/80 max-w-2xl">
                  Dashboard avanzada para proteger servidores de Discord con AntiRaid, AntiSpam y AntiLink totalmente configurable.
                </p>

                <div className="flex gap-4 mt-8">
                  <a
                    href="https://antiraidsbk.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 transition inline-flex items-center"
                  >
                    antiraidsbk.vercel.app
                  </a>

                  <button className="bg-black/30 backdrop-blur border border-white/10 px-6 py-3 rounded-2xl hover:bg-black/40 transition">
                    Ver estadísticas
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[28px] p-6 border border-zinc-700 shadow-xl">
                <h2 className="text-zinc-400 mb-2">Servidores</h2>
                <p className="text-5xl font-black">{stats.servers}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[28px] p-6 border border-zinc-700 shadow-xl">
                <h2 className="text-zinc-400 mb-2">Usuarios globales</h2>
                <p className="text-5xl font-black">{stats.users}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[28px] p-6 border border-zinc-700 shadow-xl">
                <h2 className="text-zinc-400 mb-2">Latencia</h2>
                <p className="text-5xl font-black">{stats.ping}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900/80 backdrop-blur rounded-[32px] border border-zinc-800 p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6">Estado de protección</h2>

                <div className="space-y-5">
                  <div className="flex items-center justify-between bg-zinc-800/80 rounded-2xl p-5">
                    <span>AntiRaid</span>
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-800/80 rounded-2xl p-5">
                    <span>AntiSpam</span>
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-800/80 rounded-2xl p-5">
                    <span>AntiLink</span>
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                      Activo
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 border border-indigo-500/20 rounded-[32px] p-8 backdrop-blur shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">Últimas detecciones</h2>

                <div className="space-y-4 mt-6">
                  <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    Usuario bloqueado por spam masivo.
                  </div>

                  <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    Invitación Discord eliminada automáticamente.
                  </div>

                  <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                    Raid detectado y lockdown activado.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'antiraid' && (
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
            <h1 className="text-4xl font-bold mb-8">Configuración AntiRaid</h1>

            <div className="space-y-6">
              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Protección AntiRaid</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Auto Lockdown</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                <label className="block mb-3">Máximo joins por minuto</label>
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
                />
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition">
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {page === 'antispam' && (
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
            <h1 className="text-4xl font-bold mb-8">Configuración AntiSpam</h1>

            <div className="space-y-6">
              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Detectar flood</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Detectar menciones masivas</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="bg-zinc-800 p-5 rounded-2xl">
                <label className="block mb-3">Máximo mensajes</label>
                <input
                  type="number"
                  defaultValue={6}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
                />
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition">
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {page === 'antilink' && (
          <div className="bg-zinc-900 rounded-[32px] border border-zinc-800 p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-5xl font-black mb-3">Sistema AntiLink</h1>
                <p className="text-zinc-400 text-lg">
                  Bloquea enlaces personalizados automáticamente.
                </p>
              </div>

              <button className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-2xl transition hover:scale-105">
                Activado
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-zinc-800 rounded-3xl p-6 border border-zinc-700">
                <label className="block text-lg font-semibold mb-4">
                  Añadir dominio bloqueado
                </label>

                <div className="flex gap-4">
                  <input
                    placeholder="Ejemplo: discord.gg/"
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none text-white"
                  />

                  <button className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-2xl font-bold transition">
                    Añadir
                  </button>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-3xl p-6 border border-zinc-700">
                <label className="block text-lg font-semibold mb-4">
                  Acción automática
                </label>

                <select className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none text-white">
                  <option>Eliminar mensaje</option>
                  <option>Warn</option>
                  <option>Mute</option>
                  <option>Ban</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Links bloqueados</h2>

              <div className="space-y-4">
                {blockedLinks.map((link, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 border border-zinc-700 rounded-3xl px-6 py-5 flex items-center justify-between hover:border-indigo-500 transition"
                  >
                    <div>
                      <p className="font-bold text-lg">{link}</p>
                      <p className="text-zinc-400 text-sm mt-1">
                        Protección activa.
                      </p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-2xl font-semibold">
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === 'logs' && (
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
            <h1 className="text-4xl font-bold mb-8">Sistema de Logs</h1>

            <div className="space-y-6">
              <div className="bg-zinc-800 p-5 rounded-2xl">
                <label className="block mb-3">Canal de logs</label>
                <input
                  placeholder="#logs"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
                />
              </div>

              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Logs de bans</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between bg-zinc-800 p-5 rounded-2xl">
                <span>Logs de mensajes eliminados</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition">
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard