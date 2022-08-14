import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

function Footer() {
  return (
    <div className='footer-container'>

      <p>©2022 boAt.inc All Rights Reserved</p>
      <p className="icons">
        <a href='https://www.instagram.com/boat.nirvana/?hl=en' target="_blank"><AiFillInstagram /></a>
        <a href='https://twitter.com/RockWithboAt' target="_blank"><AiOutlineTwitter /></a>
      </p>
    </div>
  )
}

export default Footer