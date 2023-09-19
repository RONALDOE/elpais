import Layout from "@components/Layout";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Post} from '../interfaces'



export default function Post() {

    const url = window.location.search;

    const urlParams = new URLSearchParams(url);
    
    //Accedemos a los valores
    const postId = urlParams.get('postId');

    const [post, setPosts] = useState<Post>()

    useEffect(()=>{
        const getPost = async ()=>{
            if (typeof postId !== "undefined"){return}

            const reponse = axios
        }
    },[])
    

  return (
    <div>Post</div>
  )
}
