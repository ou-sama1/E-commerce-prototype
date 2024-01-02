import styles from "./Footer.module.css";
import xLogo from "../../images/icon-x.svg";
import instaLogo from "../../images/icon-insta.svg";
import fbLogo from "../../images/icon-fb.svg";

const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={styles.mailing}>
                <h3>Don't Miss Out</h3>
                <p>Sign up for the latest athletic fashion news, products discounts and coupons</p>
                <form>
                    <div className={styles.inputs}>
                        <input type="email" placeholder="Enter Your Email Address" />
                        <input type="date" />
                    </div>
                    <button className={styles.btn}>Sign up</button>
                </form>
                <p>By signing up, you understand and agree to that <a>Privacy Policy</a> and <a>Terms of Use</a></p>
                <div className={styles.socials}>
                    <h3>Our Socials</h3>
                    <div className={styles.logos}>
                        <img src={xLogo} alt="X" className={styles.x} />
                        <img src={instaLogo} alt="Instagram" className={styles.insta} />
                        <img src={fbLogo} alt="Facebook" className={styles.fb} />
                    </div>
                </div>
            </div>
            <div className={styles.infos}>
                <div className={styles.info}>
                    <h3>Company</h3>
                    <ul>
                        <li>About</li>
                        <li>Experts and sportsmodels</li>
                    </ul>
                </div>
                <div className={styles.info}>
                    <h3>Customer service</h3>
                    <ul>
                        <li>Contact us</li>
                        <li>My account</li>
                        <li>Store Locator</li>
                        <li>Redeem coupons</li>
                    </ul>
                </div>
                <div className={styles.info}>
                    <h3>More</h3>
                    <ul>
                        <li>Sports Magazine</li>
                        <li>Tools and Consultations</li>
                        <li>Offers</li>
                        <li>Top Brands</li>
                    </ul>
                </div>
            </div>
            <p className={styles.credits}>Coded with ❤️ by Oussama</p>
        </div>
    )
}

export default Footer;