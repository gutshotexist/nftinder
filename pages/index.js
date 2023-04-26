import styles from "../styles/Home.module.css";
import IndexPage from "@/Components/IndexPage";
import NavigationBar from "@/Components/navigationbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}></div>
      <IndexPage></IndexPage>
      <NavigationBar></NavigationBar>
    </div>
  );
}
