import React from 'react'
import { useEffect } from 'react'
const JobsSearch = () => {
  useEffect(()=>{
    const search = async () =>{
        const response = await fetch('/./api/search');
        const data = await response.json();
        console.log("Search data", data);
    }
  })
    
}

export default JobsSearch