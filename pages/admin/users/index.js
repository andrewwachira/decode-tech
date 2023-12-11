import React from 'react'
import Layout from '@/components/Layout'

function AdminUsers() {
  return (
    <Layout>
        Admin Users
    </Layout>
  )
}
AdminUsers.auth = {adminOnly:true}
export default AdminUsers;