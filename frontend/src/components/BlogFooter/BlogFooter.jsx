import React from 'react'

export default function BlogFooter() {
  return (
    <>
    <div bgColor='light' className='text-center text-lg-left'>
      <div
      className='text-center p-3'
      style={{
        backgroundColor: '#F8F9FA',
        borderTop: 'solid 1px black'
        }}>
        &copy; Nerd Blog - Licciardello {new Date().getFullYear()}
      </div>
    </div>
    </>
  )
}
