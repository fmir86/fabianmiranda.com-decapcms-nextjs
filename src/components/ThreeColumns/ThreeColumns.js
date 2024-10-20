import styles from './ThreeColumns.module.scss';
import { Code, Palette, Lightbulb } from "lucide-react";
import Link from 'next/link';


const ThreeColumns = () => {

    return (
        <div className={styles['main-wrapper']}>

            <div className={styles['block']}>
                <h2 className='dashed'>Services</h2>

                <div className={styles['boxes-container']}>

                    <div className={styles['box']}>
                        <Code className={styles['icon']} />
                        <h3>Development</h3>
                        <ul>
                            <li>FullStack Web Development</li>
                            <li>CLM & eDetailing</li>
                            <li>Mobile Apps for iOS & Andriod</li>
                            <li>Desktop Apps for Windows & MacOS</li>
                            <li>eLearning systems (SCORM/LMS)</li>
                            <li>Game development</li>
                        </ul>
                        <Link className="lightblue-cta" href='/contact'>LEARN MORE</Link>
                    </div>
                
                    <div className={styles['box']}>
                        <Palette className={styles['icon']}/>
                        <h3>Digital Production</h3>
                        <ul>
                            <li>Display Banner ads</li>
                            <li>Rich Media</li>
                            <li>HTML Emails</li>
                            <li>Social Media Video Ads</li>
                            <li>Automated transcreation</li>
                        </ul>
                        <Link className="lightblue-cta" href='/contact'>LEARN MORE</Link>
                    </div>

                    <div className={styles['box']}>
                        <Lightbulb className={styles['icon']}/>
                        <h3>Tech Consultancy</h3>
                        <ul>
                            <li>Artificial Intelligence</li>
                            <li>Workflow Design</li>
                            <li>Process audit & optimization</li>
                            <li>DevOps</li>
                            <li>Cloud Services</li>
                        </ul>
                        <Link className="lightblue-cta" href='/contact'>LEARN MORE</Link>
                    </div>
            </div>
          </div>

        </div>
    )
}

export default ThreeColumns;