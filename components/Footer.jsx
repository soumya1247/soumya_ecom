import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

function Footer() {
  return (
    <div className='footer-container'>

      <p>©2022 Apple All Rights Reserved</p>
      <p className="icons">
        <a href='https://www.instagram.com/apple/' target="_blank"><AiFillInstagram /></a>
        <a href='https://twitter.com/Apple' target="_blank"><AiOutlineTwitter /></a>
      </p>
    </div>
  )
}

export default Footer