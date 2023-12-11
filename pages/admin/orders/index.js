import React from 'react'
import Layout from '@/components/Layout'

function AdminOrders() {
  return (
    <Layout>
        Admin Orders
    </Layout>
  )
}
AdminOrders.auth = {adminOnly:true}
export default AdminOrders;