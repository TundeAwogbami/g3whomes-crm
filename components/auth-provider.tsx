"use client"

import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase"

type AuthContextType = {
  session: Session | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setIsLoading(false)
    }

    getSession()

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  }, [supabase])

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>
}

export function useSession() {
  return useContext(AuthContext)
}
