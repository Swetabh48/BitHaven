'use client'

import { Button } from '@payloadcms/ui'
import { useState } from 'react'

export function BackToSite() {
  const [isLoading, setIsLoading] = useState(false)

  const handleBackToSite = async () => {
    try {
      setIsLoading(true)
      
      // Call our TRPC endpoint to verify session and get redirect URL
      const response = await fetch('/api/trpc/auth.getSessionRedirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify({
          json: {},
          meta: {}
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get redirect URL')
      }

      const data = await response.json()
      
      if (data.result?.data?.redirectUrl) {
        // Redirect to the appropriate homepage
        window.location.href = data.result.data.redirectUrl
      } else {
        // Fallback to main site
        window.location.href = process.env.NEXT_PUBLIC_APP_URL || '/'
      }
    } catch (error) {
      console.error('Failed to redirect:', error)
      // Fallback redirect
      window.location.href = process.env.NEXT_PUBLIC_APP_URL || '/'
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        marginBottom: '1rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
    >
      <Button
        buttonStyle="secondary"
        size="small"
        onClick={handleBackToSite}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              border: '2px solid #ccc',
              borderTop: '2px solid #666',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Loading...
          </>
        ) : (
          <>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Site
          </>
        )}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Button>
    </div>
  )
}