import Image from "next/image";
import classes from "./page.module.css";
import mainImage from "@/public/home-main.jpg";
import securityImage from "@/public/home-security.jpg";
import connectionsImage from "@/public/home-connections.jpg";
export default function Home() {
  return (
    <>
      <h1 className={classes.mainHeader}>Former, just forms.</h1>
      <section className={classes.sections}>
        <div className={classes.sectionContent}>
          <h2>Create Forms</h2>
          <p>
            Create custom forms tailored to your needs. <br />
            Simply drag and drop components that fit your needs.
          </p>
        </div>
        <div className={classes.mainImage}>
          <Image src={mainImage} alt="Form Creator" placeholder="blur" fill />
        </div>
      </section>
      <section className={classes.sections}>
        <div className={classes.sectionContent}>
          <h2>Share Forms</h2>
          <p>
            Share your forms with others easily. <br />
            Copy a link and publish the form wherever you need.
          </p>
        </div>
        <div className={`${classes.mainImage} ${classes.stagger}`}>
          <Image
            src={connectionsImage}
            alt="Form Creator"
            placeholder="blur"
            fill
          />
        </div>
      </section>
      <section className={classes.sections}>
        <div className={classes.sectionContent}>
          <h2>Analyze Responses</h2>
          <p>
            View and analyze responses to your forms. <br />
            All responses are anonymous and only accessible <br />
            to you or people sharing your key.
          </p>
        </div>
        <div className={classes.mainImage}>
          <Image src={securityImage} alt="Security" placeholder="blur" fill />
        </div>
      </section>
    </>
  );
}
