import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './form.scss';

function MainForm({ values, errors, touched, isSubmitting, status }) {
    const [users, setUsers] = useState([]);
    // console.log(values)

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="login-form">
            <h1>{values.text}</h1>
            <Form>
                <div>
                    <Field type="username" name="username" placeholder="Username" />
                    {touched.username && errors.username && (
                        <p className="error" data-testid='error'>{errors.username}</p>
                    )}
                </div>
                <div>
                    <Field type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && <p className="error" data-testid='error'>{errors.password}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} title='submit'>Submit</button>
            </Form>
        </div>
    );
}

function createFormikForm(url, reactComponent, text) {
    return withFormik({
        mapPropsToValues({ username, password }) {
            return {
                username: username || "",
                password: password || "",
                text: text || 'Form'
            };
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .min(2, "Too short!")
                .max(50, "Too long!")
                .required("Username is required"),
            password: Yup.string()
                .min(8, "Password must be 8 characters or longer")
                .required("Password is required")
        }),
        handleSubmit(values, { props, setStatus, resetForm, setErrors, setSubmitting }) {
            if (values.username === "henryblevins") {
                setErrors({ username: "That username is already taken." });
            } else {
                axios
                    .post(url, values)
                    .then(res => {
                        console.log(res);
                        setStatus(res.data);
                        const token = res.data.token;
                        props.setToken(token);
                        localStorage.setItem('token', token);
                        localStorage.setItem('username', values.username);
                        localStorage.setItem('password', values.password);

                        resetForm();
                        setSubmitting(false);
                    })
                    .then(res => {
                        console.log("test")
                        props.history.push('/display')
                    })
                    .catch(err => {
                        console.log(err);
                        setSubmitting(false);
                    });
            }
        }
    })(reactComponent);
}

export const FormikRegisterForm = createFormikForm("http://localhost:3300/api/auth/register", MainForm, 'Register Form');
export const FormikLoginForm = createFormikForm("http://localhost:3300/api/auth/login", MainForm, 'Login Form');