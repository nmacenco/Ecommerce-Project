import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getSubcategories } from '../../../../redux/actions/categories'
import { Category } from '../../../../redux/interface'
import { State } from '../../../../redux/reducers'
import { FormContainer } from '../../../form/FormCreateStyles'

export interface CATEGORIES {
    category: string;
    subcategory: string;
}

export default function DeleteCateogires(): JSX.Element {
    const dispatch = useDispatch()
    const allCategories = useSelector((state: State) => state.categories.categories)
    const allSubcategories = useSelector((state: State) => state.categories.subcategories)
    const [categories, setCategories] = useState<CATEGORIES>({
        category: "",
        subcategory: ""
    })

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getSubcategories())
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        console.log('deleted')
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3>Delete category</h3>
                <div className='form-group flex-fill ms-2'>
                    <label className="form-label mt-4">Existing Categories</label>
                    <select
                        onChange={(e) => handleChange(e)}
                        className="form-select"
                        id="exampleSelect1"
                        name="category"
                    >
                        <option hidden>Select category</option>
                        {
                            allCategories.length > 0
                                ? allCategories.map((e: Category) => { return <option key={e.id} >{e.name}</option> })
                                : <option>No hay ninguna categoria creada</option>
                        }
                    </select>
                </div>
                <div className='form-group flex-fill ms-2'>
                    <label className="form-label mt-4">Existing Categories</label>
                    <select
                        onChange={(e) => handleChange(e)}
                        className="form-select"
                        id="exampleSelect1"
                        name="subcategory"
                    >
                        <option hidden>Select subcategory</option>
                        {
                            allSubcategories.length > 0
                                ? allSubcategories.map((e: Category) => { return <option key={e.id} >{e.name}</option> })
                                : <option>No hay ninguna categoria creada</option>
                        }
                    </select>
                </div>
                <small className='form-text text-muted'>Only cateogires and subcategories without any connected product will be removed</small>
                <div className='text-center'>
                    <button type='submit' className='btn btn-outline-primary mt-5'>Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}