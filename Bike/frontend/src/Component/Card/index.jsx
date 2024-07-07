import React from 'react'
import { servicelogo } from '../../Assets'
import { Button } from '@mui/material'


export default function Card({sname,sdis,samnt}) {
    return (
        <>
            
                <div className="flex flex-col justify-center items-center gap-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
                    <div className='w-[200px] h-[200px]'>
                        <img src={servicelogo} alt="" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">{sname}</h2>
                        <p className="text-center">{sdis}</p>
                        <p className="text-center text-red-500">{samnt}</p>
                    </div>    
                        <div className="flex justify-end mt-4 w-full">
                        <Button variant="contained" sx={{ backgroundColor: '#0C97BF', mt: 2 }}>Edit</Button></div>
                    </div>
        </>
    )
}
