import axios from "axios"
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({user, setUser}) {
    const router = useRouter();
    const [error,setError] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email:"",
        password:""
    })
    const submitLogin = () => {
        axios.post("/authors/login", loginDetails).then(res => {
            axios.defaults.headers.common['Authorization'] = "Bearer "+res.data.token;
            localStorage.auth = res.data.token;
            axios.get("/authors/me").then(res => {
                setUser(res.data);
                router.push("/")
            });
        }).catch((err) => {
            setError(err.response.data.message);
        });
    }
    if(user) return <div className="container">
        already logged in
    </div>
    return<div className="container">
    
    <div style={{width: "100vh", marginLeft: "auto", marginRight: "auto"}}>
    
    {error ? <div class="alert alert-danger" role="alert">{error}
    </div> : <></>}

<div class="mb-3">
  <label  class="form-label">Email address</label>
  <input type="email" value={loginDetails.email} onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})} class="form-control"  placeholder="name@example.com" />
</div>
<div class="mb-3">
  <label class="form-label">Password</label>
  <input type="password" class="form-control"  value={loginDetails.password} onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} placeholder="Password" />
</div>
<div class="mb-3">
    <button type="button" class="btn btn-primary" onClick={() => submitLogin()}>Login</button>
</div>

    </div>

    
    </div>
}