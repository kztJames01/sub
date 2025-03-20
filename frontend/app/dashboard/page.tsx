'use client';

import React from 'react'
import Dashboard from '@/components/Dashboard';
import {SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/App-sidebar';
import { SiteHeader } from '@/components/Site-header';


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <SiteHeader/>
        <Dashboard/>
      </SidebarInset>
    </SidebarProvider>
  )
}