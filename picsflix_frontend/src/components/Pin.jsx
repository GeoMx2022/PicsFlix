import { client, urlFor } from "../client";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

export default function Pin({pin: {postedBy, image, _id, destination }}) {
  return (
    <div>
      <img className="rounded-lg" alt="user-post" src={urlFor(image).width(250).url()} />
      {/* add w-full above*/} 
    </div>
  )
}

