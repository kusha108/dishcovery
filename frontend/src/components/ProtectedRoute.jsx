
import React,{useEffect,useState} from "react";
import { Navigate,useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({children}){

  const [checking,setChecking]=useState(true);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(()=>{
    // simulate quick auth check
    const t = setTimeout(()=>{
      setChecking(false);
    },300);

    return ()=>clearTimeout(t);
  },[]);

  //  Show loader while checking
  if(checking) return <Loader/>;

  //  Not logged in
  if(!token || !user){
    return (
      <Navigate
        to="/login"
        state={{from:location}}
        replace
      />
    );
  }

  //  Logged in
  return children;
}
