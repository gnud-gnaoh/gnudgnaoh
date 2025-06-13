import styles from './about.module.css';

export default function Page() {
  return <div>
    <hgroup style={{ textAlign: 'center'}}>
			<h4 className={styles.project_text}>project</h4>
			<h1 className={styles.big_text}>Personal; <span className={styles.capital}>W</span>ebsite</h1>
      <h4 className={styles.small_text}> (Name subject to change) </h4>
		</hgroup>
    <h1 style={{ fontFamily: "'SilkRemington', sans-serif" }}>El Psy Kongroo</h1>
  </div>
}