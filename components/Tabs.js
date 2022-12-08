import Link from 'next/link'
import React from 'react'

const Tabs = ({jobsTitle, trainingTitle}) => {
    return (
    <div className='tabs'>
        <Link href={jobsTitle?.url}><a>{jobsTitle?.title}</a></Link>
        <Link href={trainingTitle?.url}><a>{trainingTitle?.title}</a></Link>
    </div>
  )
}

export default Tabs