import styles from './About.module.css';

const About = () => {

    return(
        <div className={styles.container}>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h3>Who Are We ?</h3>
                    <p>Well, there is just 'me', I'm Oussama a fullstack developer from Morocco, you can find me <a target="_blank" href='https://www.linkedin.com/in/oussama-el-bachiri-86b616291'>Here</a></p>
                </section>
                <section className={styles.section}>
                    <h3>Our Mission ?</h3>
                    <p>This is my first fullstack project, the purpose is purely educational.</p>
                </section>
                <section className={styles.section}>
                    <h3>Credits</h3>
                    <p>I used external ressources (pictures) that dont belong to me, some are from <a href="https://unsplash.com">unsplash</a> website, and the rest is from <a href="https://www.freepik.com">freepik</a> and here are the attributes :</p>
                    <div className={styles.attributes}>
                        <a target="_blank" href="https://www.freepik.com/free-psd/sneakers-sale-ad-template-banner_11079437.htm#fromView=search&page=1&position=24&uuid=ddff6566-7eb7-41e7-a322-07c756d922c5">Freepik</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/poster-sneakers-sale-template_11079381.htm#from_view=detail_serie#position=0">Freepik</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/super-sale-black-friday-facebook-cover-banner-template_10865818.htm#fromView=search&page=1&position=12&uuid=c6c03b19-42c2-4aa4-8235-b5003144ccb1">Image by graphicforest</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_20142431.htm#fromView=search&page=1&position=4&uuid=c6c03b19-42c2-4aa4-8235-b5003144ccb1">Image by graphicforest</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_20142388.htm#fromView=search&page=1&position=1&uuid=c6c03b19-42c2-4aa4-8235-b5003144ccb1">Image by graphicforest</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_34484448.htm#query=shoes%20post&position=0&from_view=keyword&track=ais&uuid=b06de3d2-40c8-4a02-aca0-a4940f819733">Image by johnniedavid12412</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/sneakers-shoes-social-media-template_37997182.htm#query=shoes%20post&position=30&from_view=keyword&track=ais&uuid=b06de3d2-40c8-4a02-aca0-a4940f819733">Image by johnniedavid12412</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/snaker-collection-social-media-post-square-banner-template-design_44627501.htm#query=shoes%20post&position=34&from_view=keyword&track=ais&uuid=b06de3d2-40c8-4a02-aca0-a4940f819733">Image by johnniedavid12412</a>
                        <a target="_blank" href="https://www.freepik.com/free-photo/smiley-girl-using-her-skateboard-outside_9362505.htm#fromView=search&page=5&position=11&uuid=f169a435-1bdc-45ed-a9bf-4c1cbffdddcc">Freepik</a>
                        <a target="_blank" href="https://www.freepik.com/free-photo/men-s-apparel-hoodie-rear-view_13309061.htm#page=2&query=clothes&position=13&from_view=keyword&track=sph&uuid=cd9d0539-c4a8-4a9e-91ab-0a144f8c29de">Image by rawpixel.com</a>
                        <a target="_blank" href="https://www.freepik.com/free-psd/simple-black-men-s-tee-mockup_3384897.htm#query=clothes&position=6&from_view=keyword&track=sph&uuid=cd9d0539-c4a8-4a9e-91ab-0a144f8c29de">Image by rawpixel.com</a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About;