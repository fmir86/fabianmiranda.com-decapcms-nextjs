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
                        <h3>AI-Powered Development</h3>
                        <ul>
                            <li>Full-Stack Web Applications</li>
                            <li>CLM & eDetailing Solutions</li>
                            <li>Mobile Apps (iOS & Android)</li>
                            <li>Desktop Apps (Windows & macOS)</li>
                            <li>eLearning Systems (SCORM/LMS)</li>
                            <li>Custom Software Development</li>
                        </ul>
                        <Link className="lightblue-cta" href='/services#development'>LEARN MORE</Link>
                    </div>
                
                    <div className={styles['box']}>
                        <Palette className={styles['icon']}/>
                        <h3>Digital Production</h3>
                        <ul>
                            <li>Display & Banner Ads</li>
                            <li>Rich Media Experiences</li>
                            <li>HTML Email Templates</li>
                            <li>Social Media Video Ads</li>
                            <li>Automated Transcreation</li>
                        </ul>
                        <Link className="lightblue-cta" href='/services#digital-production'>LEARN MORE</Link>
                    </div>

                    <div className={styles['box']}>
                        <Lightbulb className={styles['icon']}/>
                        <h3>AI Consulting</h3>
                        <ul>
                            <li>AI Strategy & Implementation</li>
                            <li>Workflow Automation</li>
                            <li>Process Audit & Optimization</li>
                            <li>DevOps & Cloud Architecture</li>
                            <li>Team Training & Enablement</li>
                        </ul>
                        <Link className="lightblue-cta" href='/services#tech-consultancy'>LEARN MORE</Link>
                    </div>
            </div>
          </div>

        </div>
    )
}

export default ThreeColumns;