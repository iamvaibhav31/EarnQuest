'use client';

import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  // Check caller is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (!profile || profile.role !== 'ADMIN') {
    throw new Error('Access denied: Admin only')
  }

  // Validate new role (only two options)
  const validRoles = ['USER', 'ADMIN']
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role')
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    console.error('Update error:', error)
    throw new Error('Failed to update role')
  }

  if(newRole === 'ADMIN') {
    console.log(`User ${userId} promoted to ADMIN`)
  } else {
    console.log(`User ${userId} demoted to USER`)
    redirect('/')
  }
}