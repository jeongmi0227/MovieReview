import React from 'react'
import { Drawer, Button, Image } from 'antd';
export default function NavBar() {
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div >
      <a href="/">Logo</a>
      </div>
      <Button>
        <Image type="algin-right"/>
      </Button>
      <Drawer />
    </nav>
  )
}
