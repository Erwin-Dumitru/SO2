import { useEffect, useState, useRef } from 'react';
import data from '../data.json';
import './Show.scss';

type Item = {
    title: string;
    image: string;
    description: string;
    inventor?: string;
    date?: string;
};

export default function Show() {
    const items: Item[] = data;
    const [indexItem, setIndexItem] = useState(0);
    const leftBtn = useRef<HTMLButtonElement>(null);
    const rightBtn = useRef<HTMLButtonElement>(null);



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                rightBtn.current?.classList.add('active'); // Add 'active' class to right button
    
                if (indexItem < items.length - 1) {
                    setIndexItem(indexItem + 1);
                }
            } else if (event.key === 'ArrowLeft') {
                leftBtn.current?.classList.add('active'); // Add 'active' class to left button
    
                if (indexItem > 0) {
                    setIndexItem(indexItem - 1);
                }
            }

            // Remove 'active' class when the key is released
            window.addEventListener('keyup', () => {
                leftBtn.current?.classList.remove('active');
                rightBtn.current?.classList.remove('active');
            });
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [indexItem, items.length]);
        

    return (
        <div className="show">
            <div className="page">
                <Images indexItem={indexItem} />

                <div className='right'>
                    <h1>{items[indexItem].title}</h1>

                    <div className="details">
                        <div className="detail">
                            <i className="ri-user-line"></i>
                            <span>{items[indexItem].inventor || 'Unknown'}</span>
                        </div>

                        <div className="detail">
                            <i className="ri-calendar-line"></i>
                            <span>{items[indexItem].date || 'Unknown'}</span>
                        </div>
                    </div>

                    <div className="description">
                        <p>{items[indexItem].description}</p>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button onClick={() => setIndexItem(indexItem - 1)} disabled={indexItem === 0} ref={leftBtn}>
                    <i className="ri-arrow-left-s-line"></i>
                </button>

                <span>
                    {indexItem + 1} / {items.length}
                </span>

                <button onClick={() => setIndexItem(indexItem + 1)} ref={rightBtn} className={indexItem === items.length - 1 ? 'finish' : ''}>
                    {
                        ((indexItem === items.length - 1) && <h4>End</h4>) ||
                        <i className="ri-arrow-right-s-line"></i>
                    }
                </button>
            </div>
        </div>
    );
}

function Images({indexItem}: {indexItem: number}) {
    const links = data.map(item => item.image);
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className="images" 
            // style={{width: imgWidth}}
        >
            {links.map((link, i) => (
                <img
                    key={i}
                    ref={imgRef}
                    src={link}
                    alt=""
                    className={i === indexItem ? 'active' : ''}
                />
            ))}
        </div>
    );
}
