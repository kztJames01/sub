'use client';

import React from 'react'
import Dashboard from '@/components/Dashboard';
import {SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/App-sidebar';
import { SiteHeader } from '@/components/Site-header';
import TotalBalance from '@/components/TotalBalance';


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <SiteHeader/>
        <TotalBalance accounts={[{id: "1", name: "Bank 1", type: "depository"}, {id: "2", name: "Bank 2", type: "depository"}]} totalBanks={2} totalCurrentBalance={1000}/>
        <Dashboard/>
      </SidebarInset>
    </SidebarProvider>
  )
}