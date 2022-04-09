import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import { createCategories, createSubcategories, getCategories, resetSubcategories } from '../../../../redux/actions/categories';
import { Category } from '../../../../redux/interface';
import { State } from '../../../../redux/reducers';
import { FormContainer } from '../../../form/FormCreateStyles';

interface FORM_CAT {
    name: string,
    id: number
}

export interface FORM_SUB {
    name: string,
    CategoryId: any
}


export default function CreateCategories(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCategories = useSelector((state: State) => state.categories.categories)
    const [newCategory, setNewCategory] = useState<FORM_CAT>({
        name: "",
        id: 999
    })
    const [newSubcategory, setNewSubcategory] = useState<FORM_SUB>({
        name: "",
        CategoryId: 0
    })

    useEffect(() => {
        dispatch(getCategories())

    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault()
        setNewCategory({
            ...newCategory,
            name: e.target.value,
        })
        setNewSubcategory({
            ...newSubcategory,
            CategoryId: e.target.selectedIndex
        })
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()

        setNewCategory({
            ...newCategory,
            name: e.target.value,
        })
    }

    const handleChangeSubcategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        let sett: any
        const putId = allCategories.filter((e: Category) => newCategory.name === e.name)
        if (putId.length > 0) {
            console.log('entre aca')
            sett = putId[0].id
        }
        else {
            sett = allCategories.length + 1
        }

        setNewSubcategory({
            ...newSubcategory,
            name: e.target.value,
            CategoryId: sett
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newCategory.name !== "") {
            const putId = allCategories.filter((e: Category) => newCategory.name === e.name)
            if (putId.length === 0) dispatch(createCategories(newCategory))

            if (newSubcategory.name.length !== 0) {
                console.log(newSubcategory)
                dispatch(createSubcategories(newSubcategory))
                dispatch(resetSubcategories())
            }
            swal({
                title: "Create successfully",
                icon: "success"
            })
            navigate('/products')
        } else {
            swal({
                title: "Form needs all fields",
                icon: "error"
            })
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Create Category</h3>
                <div className='d-flex'>
                    <div className="form-group flex-fill">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                            Category name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            name="name"
                            value={newCategory.name}
                            placeholder="Enter category"
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </div>

                    <div className="form-group flex-fill ms-2">
                        <label className="form-label mt-4">Existing categories</label>
                        <select
                            onChange={(e) => handleChange(e)}
                            className="form-select mt-3"
                            id="exampleSelect1"
                            name="category"
                        >
                            <option hidden>Select categories exist</option>
                            {
                                allCategories.length > 0
                                    ? allCategories.map((e: Category) => { return <option key={e.id} >{e.name}</option> })
                                    : <option>No hay ninguna categoria creada</option>
                            }
                        </select>
                    </div>
                </div>

                <h3 className="text-center mt-4">Create subcategory</h3>
                <div className="form-group mr-1 mr-md-2">
                    <label htmlFor="exampleTextarea" className="form-label mt-4">
                        Subcategory name
                    </label>
                    <input
                        type="text"
                        className="form-control "
                        id="exampleTextarea"
                        name="subcategory"
                        placeholder="Enter subcategory"
                        value={newSubcategory.name}
                        onChange={(e) => handleChangeSubcategory(e)}
                    />
                </div>
                <div className="text-center">
                    <button type='submit' className="btn btn-outline-primary mt-5">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}
