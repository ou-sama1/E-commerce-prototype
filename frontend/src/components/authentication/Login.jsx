import { useReducer } from "react";
import styles from "./Signup.module.css";
import useAuthenticate from "../../hooks/useAutenticate";
import { Link, useNavigate } from "react-router-dom";

const initialFormState =  {
    email : {value : '', isValid : false, isTouched : false},
    password : {value : '', isValid : false, isTouched : false},
}

const validateInput = (action) => {
  switch (action.field) {
    case 'email':
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)

    case 'password':
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(action.value)
  
    default:
      break;
  }
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {...state, [action.field] : {value : action.value, isValid : validateInput(action), isTouched : state[action.field].isTouched}}

    case 'BLUR':
      return {...state, [action.field] : {value : state[action.field].value, isValid : state[action.field].isValid, isTouched : true}}
    
    case 'ERROR':
      return {
        email : {value : state.email.value, isValid : state.email.isValid, isTouched : true},
        password : {value : state.password.value, isValid : state.password.isValid, isTouched : true},
      };
    
    case 'RESET':   
      return {...initialFormState}
  
    default:
      break;
  }
};

function Login() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { authenticate, loading, error } = useAuthenticate();
  const navigate = useNavigate();

  const fieldOnChange = (e) => {
    dispatch({type : 'CHANGE', field : e.target.name, value : e.target.value})
  }
  const fieldOnBlur = (e) => {
    dispatch({type : 'BLUR', field : e.target.name,})
  }
  const submitHandler = async (e) => {
    e.preventDefault()

    if(formState.email.isValid && formState.password.isValid){
        const user = {
            email : formState.email.value,
            password : formState.password.value,
        }
        const success = await authenticate(user, 'login');

        if(success){
            navigate('/');
            navigate(0);
        }
        
    }
    else {
      dispatch({type : 'ERROR'})
    }
  }

  return (
    <div className={`${styles.container} ${styles.login}`}>

      <h1 className={styles.title}>Login</h1>

      <form className={styles.form}>

        <div className={styles.form_group}>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" className={`${styles.input} ${!formState.email.isValid && formState.email.isTouched ? styles.invalid_input : ""}`} value={formState.email.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.email.isValid && formState.email.isTouched && <p className={styles.error_message}>invalid email input.</p>}
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Password</label>
          <input type="password" name="password" className={`${styles.input} ${!formState.password.isValid && formState.password.isTouched ? styles.invalid_input : ""}`} value={formState.password.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.password.isValid && formState.password.isTouched && <p className={styles.error_message}>invalid password input.</p>}
        </div>

        <button className={styles.btn} onClick={submitHandler} disabled={loading} >{loading ? "Submitting..." : "Submit"}</button>
        {error && <p className={styles.error_message} align='center'>{error}</p>}
        
        <p className={styles.noAccount}>You dont have an account yet ? <Link to="/signup">Signup !</Link></p>

      </form>
    </div>
  )
}

export default Login;
