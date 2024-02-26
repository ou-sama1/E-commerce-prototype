import { useReducer, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import locationIcon from '../../images/icon-location.svg';
import phoneIcon from '../../images/icon-phone.svg';
import emailIcon from '../../images/icon-email.svg';
import ReCAPTCHA from 'react-google-recaptcha';

const initialFormState =  {
    email : {value : '', isValid : false, isTouched : false},
    name : {value : '', isValid : false, isTouched : false},
    message : {value : '', isValid : false, isTouched : false},
}

const validateInput = (action) => {
  switch (action.field) {
    case 'email':
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)

    case 'name':
        return /^[a-zA-Z]{3,}$/.test(action.value)
    
    case 'message':
        return action.value.length > 3
  
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
        name : {value : state.name.value, isValid : state.name.isValid, isTouched : true},
        message : {value : state.message.value, isValid : state.message.isValid, isTouched : true},
      };
    
    case 'RESET':   
      return {...initialFormState}
  
    default:
      break;
  }
};

const Contact = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const [invalidCaptcha, setInvalidCaptcha] = useState(false);
    const form = useRef();
    const recaptcha = useRef();
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const fieldOnChange = (e) => {
      dispatch({type : 'CHANGE', field : e.target.name, value : e.target.value})
    }
    const fieldOnBlur = (e) => {
      dispatch({type : 'BLUR', field : e.target.name,})
    }
    const submitHandler = async (e) => {
      e.preventDefault()
      
      if(formState.email.isValid && formState.name.isValid && formState.message.isValid){
        const captchaValue = recaptcha.current.getValue();
        if(!captchaValue) return setInvalidCaptcha(true);
        setInvalidCaptcha(false);

        setLoading(true);
        setError(false);
        try {
          const response = await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          });
          if(!response === "OK"){
            throw new Error()
          }
          dispatch({type : 'RESET'})

        } catch (error) { 
          setError(true);
        }

        setLoading(false);
        
      }
      else{
        dispatch({type : 'ERROR'})
      }
    }

    return(
        <div className={styles.container}>
            <div className={styles.contactInfo}>
                <div className={styles.info}>
                    <img src={locationIcon} />
                    <span>Address</span>
                    <p>1370 6th St Umatilla Oregon</p>
                </div>
                <div className={styles.info}>
                    <img src={phoneIcon} />
                    <span>Phone</span>
                    <p>047-491-0166</p>
                </div>
                <div className={styles.info}>
                    <img src={emailIcon} /> 
                    <span>Email</span>
                    <p>xdooussama@gmail.com</p>
                </div>
            </div>
            <div className={styles.messageForm}>
                <h2>We'd Love to Hear From You</h2>
                <p className={styles.superPara}>You can email the dev directly from the form below !</p>
                <form  className={styles.form} ref={form}>
                    <div className={styles.form_group}>
                        <input type="text" name="name" className={`${styles.input} ${!formState.name.isValid && formState.name.isTouched ? styles.invalid_input : ""}`} value={formState.name.value} onChange={fieldOnChange} onBlur={fieldOnBlur} placeholder='Enter your name'/>
                        {!formState.name.isValid && formState.name.isTouched && <p className={styles.error_message}>name should contain at least 3 letters.</p>}
                    </div>

                    <div className={styles.form_group}>
                        <input type="email" name="email" className={`${styles.input} ${!formState.email.isValid && formState.email.isTouched ? styles.invalid_input : ""}`} value={formState.email.value} onChange={fieldOnChange} onBlur={fieldOnBlur} placeholder='Enter your email'/>
                        {!formState.email.isValid && formState.email.isTouched && <p className={styles.error_message}>invalid email input.</p>}
                    </div>

                    <div className={styles.form_group}>
                        <textarea name="message" cols="30" rows="20" placeholder="Enter your message" className={`${styles.input} ${!formState.message.isValid && formState.message.isTouched ? styles.invalid_input : ""}`} value={formState.message.value} onChange={fieldOnChange} onBlur={fieldOnBlur} >
                        </textarea>
                        {!formState.message.isValid && formState.message.isTouched && <p className={styles.error_message}>please enter a message.</p>}
                    </div>

                    <button className={styles.btn} onClick={submitHandler} disabled={loading} >{loading ? "Sending..." : "Send"}</button>
                    {error && <p className={styles.error_message} align='center'>{error}</p>}
                    <div className={styles.recaptcha}>
                      <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
                      {invalidCaptcha && <p className={styles.error_message}>Please verify the reCAPTCHA.</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;