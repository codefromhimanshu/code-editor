import React from 'react';
import type { Metadata } from 'next'

import './globals.css'


export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}