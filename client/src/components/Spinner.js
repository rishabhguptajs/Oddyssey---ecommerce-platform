import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Spinner } from "@nextui-org/react";

const SpinnerComp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [count , setCount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((current) => --current);
        }, 1000);
        count === 0 && navigate("/login", {
            state: location.pathname
        });
        return () => clearInterval(interval);
    }
    , [count, navigate, location]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
        <div>Redirecting you in {count} sec</div>
      <Spinner size="large" color="danger" />
    </div>
  )
}

export default SpinnerComp
