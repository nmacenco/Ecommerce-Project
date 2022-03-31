import React from 'react'
import { IData } from '../Cards'

export default function Pagination({ length, page }: IData): JSX.Element {
    let arr: number[] = [];
    for (let i = 1; i <= Math.ceil(length / 12); i++) {
        arr.push(i)
    }

    return (
        <div>
            <ul className="pagination mt-2">
                {
                    arr.map((e, i) => {
                        return <li key={i} className="page-item">
                            <button className="page-link" onClick={() => page(e)}>{e}</button>
                        </li>
                    })
                }
                {/* <li className="page-item disabled">
                    <a className="page-link" href="#">&laquo;</a>
                </li>
                <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">4</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">5</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">&raquo;</a>
                </li> */}
            </ul>
        </div>
    )
}