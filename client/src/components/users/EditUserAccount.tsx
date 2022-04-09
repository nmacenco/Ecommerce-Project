import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import swal from 'sweetalert'
import { useLocalStorage } from '../../helpers/useLocalStorage'
import { getCountries } from '../../redux/actions/countries'
import { getSingleUser, GetUSer, updateUser } from '../../redux/actions/user'
import { ICountries } from '../../redux/interface'
import { State } from '../../redux/reducers'
import { FormContainer } from '../form/FormCreateStyles'

export interface EDIT_USER {
    name: string,
    surname: string,
    email: string,
    billing_address: string,
    default_shipping_address: string,
    CountryId: number,
    password: string
}

export default function EditUserAccount(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams<string>()
    const allCountries = useSelector((state: State) => state.countries.countries)
    const user = useSelector((state: State) => state.user)
    const [userInStorage , setuserInStorage] = useLocalStorage('USER_LOGGED','')
    const [editUser, setEditUser] = useState<EDIT_USER>({
        name: "",
        surname: "",
        email: "",
        billing_address: "",
        default_shipping_address: "",
        CountryId: 0,
        password: ""
    })

    useEffect(() => {
        dispatch(getCountries())
        setTimeout(() => {
            dispatch(getSingleUser(userInStorage))
        }, 200)
    }, [dispatch])
    function cb () {

    }

    const showError = (editUser: EDIT_USER): void => {
        if (editUser.name === "") (document.getElementById("error-name") as HTMLInputElement).textContent = "Name missing"
        else (document.getElementById("error-name") as HTMLInputElement).textContent = ""
        if (editUser.surname === "") (document.getElementById("error-surname") as HTMLInputElement).textContent = "Surname missing"
        else (document.getElementById("error-surname") as HTMLInputElement).textContent = ""
        if (editUser.email === "") (document.getElementById("error-email") as HTMLInputElement).textContent = "Email missing"
        else (document.getElementById("error-email") as HTMLInputElement).textContent = ""
        if (editUser.CountryId === 0) (document.getElementById("error-country") as HTMLSelectElement).textContent = "Country missing"
        else (document.getElementById("error-country") as HTMLSelectElement).textContent = ""
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        })

        if (e.target.name === "CountryId") {
            let CountryName = allCountries.find((s: ICountries) => String(s.id) === e.target.value)
            if (CountryName) {
                setEditUser({
                    ...editUser,
                    billing_address: CountryName.name,
                    default_shipping_address: CountryName.name,
                    CountryId: Number(e.target.value)
                })
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (editUser.name !== "" && editUser.surname !== "" && editUser.email !== "" && editUser.CountryId !== 0) {

            dispatch(updateUser(id, editUser))
        } else {
            showError(editUser)
            swal({
                title: "Filds missing",
                icon: "error"
            })
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Edit user</h3>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <input className="form-control" type="text" placeholder="Enter name" name="name" onChange={(e) => handleChange(e)} />
                    <small id="error-name" className='text-danger'></small>
                </div>

                <div className="form-group me-1">
                    <label className="form-label mt-4">Surname</label>
                    <input className="form-control" type="text" placeholder="Enter surname" name="surname" onChange={(e) => handleChange(e)} />
                    <small id="error-surname" className='text-danger'></small>
                </div>

                <div className="form-group">
                    <label className="form-label mt-4">Email</label>
                    <input className="form-control" type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)} />
                    <small id="error-email" className='text-danger'></small>
                </div>

                {/* <div className="form-group">
                    <label className="form-label mt-4">Billing address</label>
                    <input className="form-control" type="text" placeholder="Enter address" name="billing_address" onChange={(e) => handleChange(e)} />
                    <small id="error-billing" className='text-danger'></small>
                </div> */}

                {/* <div className="form-group">
                    <label className="form-label mt-4">Email</label>
                    <input className="form-control" type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)} />
                </div> */}

                <div className="form-group">
                    <label className="form-label mt-4">Select your country</label>
                    <select className="form-select" name="CountryId" onChange={(e) => handleChange(e)}>
                        <option>Countries...</option>
                        {
                            allCountries.length > 0
                                ? allCountries.map((e: ICountries) => {
                                    return <option key={e.id} value={e.id}>{e.name}</option>
                                })
                                : <option>Not countries for you...</option>
                        }
                    </select>
                    <small id="error-country" className='text-danger'></small>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}