import { useState } from 'react'
import portalLogo from '../images/portal-logo.png'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('mustafa@tradepay.sa')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!password.trim()) { setError('Please enter your password.'); return }
    setError('')
    setLoading(true)
    // Simulate brief auth delay then navigate
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 800)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: '#0F172A' }}
    >
      {/* Logo + Titles */}
      <div className="flex flex-col items-center mb-8 select-none">
        <img
          src={portalLogo}
          alt="Portal Logo"
          width={72}
          height={72}
          style={{ borderRadius: 16, marginBottom: 20 }}
          onError={e => {
            console.error('portal-logo.png failed to load')
            e.currentTarget.style.display = 'none'
            const fallback = document.createElement('div')
            fallback.style.cssText = 'width:72px;height:72px;border-radius:16px;background:#2563EB;display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:28px;font-weight:700;color:#fff'
            fallback.textContent = 'P'
            e.currentTarget.parentNode.insertBefore(fallback, e.currentTarget)
          }}
        />
        <h1 className="text-[26px] font-bold text-white tracking-tight leading-none mb-1.5">
          Founder Portal
        </h1>
        <p className="text-[14px]" style={{ color: '#64748B' }}>
          by Sanabil Studio
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Card header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#F1F0ED]">
          <h2 className="text-[20px] font-bold text-[#1A1A1A] tracking-tight mb-1">
            Welcome back
          </h2>
          <p className="text-[13px] text-[#6B6B6B]">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1.5 tracking-wide uppercase">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border text-[14px] text-[#1A1A1A] placeholder:text-[#A8A8A8] transition-all outline-none"
              style={{
                borderColor: '#E4E2DC',
                background: '#FAFAFA',
              }}
              onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.10)' }}
              onBlur={e => { e.target.style.borderColor = '#E4E2DC'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1.5 tracking-wide uppercase">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border text-[14px] text-[#1A1A1A] placeholder:text-[#A8A8A8] transition-all outline-none"
              style={{
                borderColor: '#E4E2DC',
                background: '#FAFAFA',
              }}
              onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.10)' }}
              onBlur={e => { e.target.style.borderColor = '#E4E2DC'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all"
                  style={{
                    borderColor: remember ? '#2563EB' : '#D1CFCA',
                    background: remember ? '#2563EB' : '#FFFFFF',
                  }}
                >
                  {remember && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[13px] text-[#6B6B6B]">Remember me</span>
            </label>
            <button
              type="button"
              className="text-[13px] font-medium transition-colors"
              style={{ color: '#2563EB' }}
              onMouseEnter={e => e.target.style.color = '#1D4ED8'}
              onMouseLeave={e => e.target.style.color = '#2563EB'}
            >
              Forgot password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-[12px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-[14px] font-semibold text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            style={{
              background: loading ? '#3B82F6' : '#2563EB',
              opacity: loading ? 0.85 : 1,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1D4ED8' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#2563EB' }}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Contact link */}
          <p className="text-center text-[12px] text-[#6B6B6B] pt-1">
            Don't have an account?{' '}
            <button
              type="button"
              className="font-medium transition-colors"
              style={{ color: '#2563EB' }}
              onMouseEnter={e => e.target.style.color = '#1D4ED8'}
              onMouseLeave={e => e.target.style.color = '#2563EB'}
            >
              Contact your studio lead
            </button>
          </p>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[12px]" style={{ color: '#334155' }}>
        © 2026 Sanabil Studio. All rights reserved.
      </p>
    </div>
  )
}
