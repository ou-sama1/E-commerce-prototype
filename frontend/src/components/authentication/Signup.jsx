import { useReducer } from "react";
import styles from "./Signup.module.css";
import useAuthenticate from "../../hooks/useAutenticate";
import { Link, useNavigate } from "react-router-dom";

const initialFormState =  {
    username : {value : '', isValid : false, isTouched : false},
    email : {value : '', isValid : false, isTouched : false},
    password : {value : '', isValid : false, isTouched : false},
    cpassword : {value : '', isValid : false, isTouched : false},
}

const validateInput = (action, state) => {
  switch (action.field) {
    case 'username':
        return /^[a-zA-Z]{3,}[0-9]*$/.test(action.value)

    case 'email':
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)

    case 'password':
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(action.value)

    case 'cpassword':
        return action.value === state.password.value
  
    default:
      break;
  }
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {...state, [action.field] : {value : action.value, isValid : validateInput(action, state), isTouched : state[action.field].isTouched}}

    case 'BLUR':
      return {...state, [action.field] : {value : state[action.field].value, isValid : state[action.field].isValid, isTouched : true}}
    
    case 'ERROR':
      return {
        username : {value : state.username.value, isValid : state.username.isValid, isTouched : true},
        email : {value : state.email.value, isValid : state.email.isValid, isTouched : true},
        password : {value : state.password.value, isValid : state.password.isValid, isTouched : true},
        cpassword : {value : state.cpassword.value, isValid : state.cpassword.isValid, isTouched : true},
      };
    
    case 'RESET':   
      return {...initialFormState}
  
    default:
      break;
  }
};

function Signup() {
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

    if(formState.username.isValid && formState.email.isValid && formState.password.isValid && formState.cpassword.isValid){
        const user = {
            username : formState.username.value,
            email : formState.email.value,
            password : formState.password.value,
        }
        const success = await authenticate(user, 'signup');

        if(success){
            navigate('/');
            navigate(0);
        }
        else dispatch({type : 'RESET'})
    }
    else {
      dispatch({type : 'ERROR'})
    }
  }

  return (
    <div className={`${styles.container} ${styles.signup}`} >

      <h1 className={styles.title}>Signup</h1>

      <form className={styles.form}>

        <div className={styles.form_group}>
          <label className={styles.label}>username</label>
          <input type="text" name="username" className={`${styles.input} ${!formState.username.isValid && formState.username.isTouched ? styles.invalid_input : ""}`} value={formState.username.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.username.isValid && formState.username.isTouched && <p className={styles.error_message}>username should contain at least 3 letters.</p>}
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" className={`${styles.input} ${!formState.email.isValid && formState.email.isTouched ? styles.invalid_input : ""}`} value={formState.email.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.email.isValid && formState.email.isTouched && <p className={styles.error_message}>invalid email input.</p>}
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Password</label>
          <input type="password" name="password" className={`${styles.input} ${!formState.password.isValid && formState.password.isTouched ? styles.invalid_input : ""}`} value={formState.password.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.password.isValid && formState.password.isTouched && <p className={styles.error_message}>password should include at least 1 lowercase, 1 uppercase, a number, and be a minimum of 8 characters in length.</p>}
        </div>
        
        <div className={styles.form_group}>
          <label className={styles.label}>Confirm password</label>
          <input type="password" name="cpassword" className={`${styles.input} ${!formState.cpassword.isValid && formState.cpassword.isTouched ? styles.invalid_input : ""}`} value={formState.cpassword.value} onChange={fieldOnChange} onBlur={fieldOnBlur}/>
          {!formState.cpassword.isValid && formState.cpassword.isTouched && <p className={styles.error_message}>password not matched.</p>}
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Gender</label>
          <div className={styles.form_radio}>
            <input className={styles.input} type="radio" value="male" name="gender" defaultChecked/>
            <span>Male</span>
            <input className={styles.input} type="radio" value="female" name="gender" />
            <span>Female</span>
          </div>
        </div>

        <button className={styles.btn} onClick={submitHandler} disabled={loading} >{loading ? "Submitting..." : "Submit"}</button>
        {error && <p className={styles.error_message} align='center'>{error}</p>}
        
        <p className={styles.hasAccount}>Already have an account ? <Link to='/login'>login !</Link></p>
      </form>
    </div>
  )
}

export default Signup;
