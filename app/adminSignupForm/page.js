"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

function AdminSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 0) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log("Form data:", name, email, password);
      axios
        .post("http://localhost:4000/adminSignup", {
          name,
          email,
          password,
        })
        .then((response) => {
          console.log("User created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        });
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="border border-black rounded-lg p-4 mx-auto w-1/2 mt-10 sm:p-12.5 xl:p-17.5">
      <span className="mb-1.5 block font-medium">Start for free</span>
      <h2 className="mb-9 text-4xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={`w-full rounded-lg border ${
                errors.name ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                    fill=""
                  />
                  <path
                    d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6+ Characters, 1 Capital letter"
              className={`w-full rounded-lg border ${
                errors.password ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M16.4266 10.6831H15.3479V8.79436C15.3479 5.91311 13.0216 3.58686 10.1404 3.58686C7.25914 3.58686 4.93289 5.91311 4.93289 8.79436V10.6831H3.85414C3.25914 10.6831 2.74789 11.1279 2.74789 11.7229V18.4916C2.74789 19.0866 3.19264 19.5979 3.78764 19.5979H16.4931C17.0881 19.5979 17.5994 19.1531 17.5994 18.5581V11.7894C17.5994 11.1944 17.0881 10.6831 16.4931 10.6831H16.4266ZM6.03814 8.79436C6.03814 6.51936 7.86639 4.69111 10.1414 4.69111C12.4164 4.69111 14.2446 6.51936 14.2446 8.79436V10.6831H6.03814V8.79436ZM16.4931 18.4931H3.78764V11.7894H16.4931V18.4931Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 bg-primary py-4 px-6 font-medium text-white hover:bg-opacity-70"
          >
            Sign Up
          </button>
        </div>
      </form>

      <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke py-4 px-6 font-medium hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4">
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.9999 10.1863C19.9999 9.52369 19.9418 8.88631 19.8336 8.27203H10.1992V11.9269H15.7344C15.4921 13.1259 14.8154 14.1523 13.8254 14.8199V17.1408H16.8254C18.746 15.3595 19.9999 12.9368 19.9999 10.1863Z"
            fill="#4285F4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.2 19.9998C12.7 19.9998 14.7891 19.166 16.3286 17.8397L13.3286 15.5188C12.5153 16.0805 11.4635 16.4091 10.1988 16.4091C7.80534 16.4091 5.78871 14.8452 5.05871 12.6876H2.00781V15.0876C3.53906 17.9893 6.63906 19.9998 10.2 19.9998Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.05878 12.6873C4.50003 11.4882 4.50003 10.2151 5.05878 9.01605V6.61605H2.00789C0.807891 8.92734 0.807891 11.7756 2.00789 14.0868L5.05878 12.6873Z"
            fill="#FBBC04"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.1988 3.5861C11.5526 3.56524 12.8554 4.08227 13.8254 5.02455L16.3921 2.49821C14.6745 0.887451 12.4745 -0.0125492 10.1988 0.000198888C6.63907 0.000198888 3.53907 2.01001 2.00782 4.91179L5.05871 6.31179C5.78182 4.15425 7.80525 2.59037 10.1988 2.59037V3.5861Z"
            fill="#EA4335"
          />
        </svg>
        Sign up with Google
      </button>

      <p className="text-center text-md font-medium mt-4">
        Already have an account?{" "}
        <Link href="/adminSigninForm" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default AdminSignupForm;
