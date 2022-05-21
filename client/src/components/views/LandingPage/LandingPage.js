import React, { useEffect } from 'react'
import axios from 'axios';

export default function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))
    },[])
  return (
      <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
      }}>LandingPage</div>
  )
}
