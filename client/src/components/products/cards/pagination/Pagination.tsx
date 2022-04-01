import React from 'react'
import { IData } from '../Cards'

export default function Pagination({ length, page }: IData): JSX.Element {
    let arr: number[] = [];
    for (let i = 1; i <= Math.ceil(length / 32); i++) {
        arr.push(i)
    }

    return (
        <div className="pagination mt-2 d-flex justify-content-center">
            <ul className="pagination mt-2">
                {
                    arr.map((e, i) => {
                        return <li key={i} className="page-item ">
                            <button className="page-link" onClick={() => page(e)}>{e}</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}