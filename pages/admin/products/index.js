import React from 'react'
import Layout from '@/components/Layout'

function AdminProducts() {
  return (
    <Layout>
        Admin Products
    </Layout>
  )
}
AdminProducts.auth = {adminOnly:true}
export default AdminProducts;