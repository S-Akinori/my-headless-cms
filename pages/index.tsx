import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Button from 'src/components/parts/Button'
import Container from 'src/components/parts/Container'
import FV from 'src/components/parts/FV'
import Layout from 'src/components/views/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <FV src='/images/blue-g361a9202d_1920.jpg'>
        <p style={{fontSize: '2rem', marginBottom: '1rem'}}>My Headless CMS</p>
        <div style={{textAlign: 'center'}}>
          <Button href='/login'>Login</Button>
          <Button href='/signup'>Sign Up</Button>
        </div>
      </FV>
    </Layout>
  )
}

export default Home
