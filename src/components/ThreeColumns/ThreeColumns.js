import styles from './ThreeColumns.module.scss';
import Link from 'next/link';
import { resolveLucideIcon } from '../../libs/iconMap';


const ThreeColumns = ({ data }) => {

    return (
        <div className={styles['main-wrapper']}>

            <div className={styles['block']}>
                <h2 className={styles['title']}>{data.title}</h2>

                <div className={styles['boxes-container']}>
                    {data.items.map((item, index) => {
                        const IconComponent = resolveLucideIcon(item.icon);
                        return (
                            <div key={index} className={styles['box']}>
                                {IconComponent && <IconComponent className={styles['icon']} />}
                                <h3>{item.title}</h3>
                                <ul>
                                    {item.features.map((feature, fIndex) => (
                                        <li key={fIndex}>{feature}</li>
                                    ))}
                                </ul>
                                <Link className="lightblue-cta" href={item.cta_link}>{item.cta_text}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}

export default ThreeColumns;
