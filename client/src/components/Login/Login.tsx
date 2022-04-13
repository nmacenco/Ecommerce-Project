import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator, { validateForms } from "../../helpers/validateForm";
import { GetUSer, IdentGoogle } from "../../redux/actions/user";
import { State } from "../../redux/reducers";
import Form from "../form/Form";
import { useNavigate } from "react-router";
import { Forgot } from "../form/SLogin";
import { setPage } from "../../redux/actions/setPage";

interface Inputs {
    email: string;
    passUser: string;
}

const Login = (): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);
    const navigate = useNavigate();


    useEffect(()=> {
        dispatch(setPage(0))
        return ()=> {
          
          dispatch(setPage(1))
        }
      }, [])

    const [inputs, setInputs] = useState<Inputs>({
        email: "",
        passUser: "",
    });
    const [error, setErrores] = useState<Inputs>({
        email: "",
        passUser: "",
    });

    const RegisterChange = (event: any) => {
        event.preventDefault();
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
        setErrores(validator(error, event.target as HTMLInputElement) as Inputs);
    };

    const LoginFetch = (event: any) => {
        event.preventDefault();
        const res = validateForms(error, inputs);

        if (res) {
            return alert(res);
        }

        if (!user) {
            dispatch(
                GetUSer(inputs.email, inputs.passUser, () => {
                    navigate("/products");
                })
            );
        }
    };

    const SinInGoogle = () => {
        dispatch(
            IdentGoogle("/signInWithGoogle/callback", () => {
                navigate("/products");
            })
        );
    };
    const forgotPassword = () => {
        navigate("/emailReset");
    };

    let emailStyle = error.email ? "form-control is-invalid" : "form-control";
    let passStyle = error.passUser ? "form-control is-invalid" : "form-control";

    return (
        <Form title="Login" >
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    className={emailStyle}
                    onChange={RegisterChange}
                />
                {error.email && <b className="invalid-feedback">{error.email}</b>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    name="passUser"
                    className={passStyle}
                    onChange={RegisterChange}
                />
                {error.passUser && <b className="invalid-feedback">{error.passUser}</b>}
            </div>
            <Forgot
                className="btn btn-link p-0 m-2 text-decoration-none"
                onClick={forgotPassword}
            >
                Forgot Password?
            </Forgot>

            <div className="google mt-2" >
                <div>
                    <img src="https://freesvg.org/img/1534129544.png" />
                </div>
                <span>
                    <a href='http://localhost:3001/api/signInWithGoogle/callback' target='_blank' className="text-decoration-none">
                        Continue with Google
                    </a>
                </span>
            </div>

            <div className="text-center m-3">
                {validateForms(error, inputs).length ? (
                    <button className="btn btn-primary button-links link-Router mx-2" disabled>
                        SUBMIT
                    </button>
                ) : (
                    <button
                        className="btn btn-primary button-links link-Router mx-2"
                        onClick={LoginFetch}
                    >
                        SUBMIT
                    </button>
                )}
                <Link
                    to="/register"
                    className="btn btn-secondary link-Router button-links mx-2"
                >
                    REGISTER
                </Link>
            </div>
        </Form>
    );
};

export default Login;
