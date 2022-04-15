import React from 'react'

export default function About(): JSX.Element {

    return (
        <div className='list-group'>
            <div className='text-center'>
                <h2 className='m-5'><ins>PCSHOP - Ecommerce PF</ins></h2>
                <p className='font-weight-normal'>This is an <ins className='text-primary'>e-commerce</ins> of products electronics, created for the project final for Henry's.</p>
                <p className='font-weight-normal'>The purpose of developing <ins className='text-primary'>e-commerce</ins> is that it is much more common these days and that is why we wanted to have a minimal vision for this type of project.</p>
                <p>For more organization, we split the group in two, frontend and backend.</p>

                <div className='d-flex justify-content-around m-5'>
                    <ul className='list-group'><strong className='text-primary'><ins>Frontend:</ins></strong>
                        <li className='list-group'>Nicolas Alejandro Macenco</li>
                        <li className='list-group'>Julian Marcos Gonzalez</li>
                        <li className='list-group'>Dikson Yampier Aranda Cabrera</li>
                        <li className='list-group'>Francisco Sebastian Lubo</li>
                    </ul>
                    <ul className='list-group'><strong className='text-primary'><ins>Backend:</ins></strong>
                        <li className='list-group'>Axel Emanuel Lois Ferrada</li>
                        <li className='list-group'>Carlos Mario Espinosa Restrepo</li>
                        <li className='list-group'>Jaider Andres Panqueva Agudelo</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}