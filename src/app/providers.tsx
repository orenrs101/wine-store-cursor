'use client'

import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'

// Create RTL theme with Hebrew font support and dark mode
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  styles: {
    global: (props: any) => ({
      body: {
        textAlign: 'right',
        direction: 'rtl',
        bg: props.colorMode === 'dark' ? 'black' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      }
    })
  },
  config,
})

export function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
} 