"use client";
import { useState } from 'react';
import styles from './FoulCounter.module.css';

export default function FoulCounter({ visibleName, internalName, pieceType, min, max }) {
    min = min || 0;
    max = max || 99999;

    const [value, setValue] = useState(0);

    function incrementFive() {
        if (value + 5 <= max) {
            setValue(value + 5);
        }
    }

    function decrementFive() {
        if (value - 5 >= min) {
            setValue(value - 5);
        }
    }

    return (
        <div className={styles.FoulCounter}>
            <label className={styles.label} htmlFor={internalName}>{visibleName}</label>
            <div className={styles.Container}>
                <div className={styles.decrementBox}>
                    <button type="button" className={styles.DecButton} onClick={decrementFive}><h1><strong>-5</strong></h1></button>
                </div>
                
                <div className={styles.inputBox}>  
                    <h1>Foul Count</h1>
                    <div className={styles.inputBox2}>
                        <hr className={styles.line}></hr>
                        <input 
                            className={styles.input}
                            type="number"
                            id={internalName}
                            name={internalName}
                            value={value}
                            readOnly
                        />
                    </div>
                </div>
                <div className={styles.incrementBox}>
                    <button type="button" className={styles.IncButton} onClick={incrementFive}><h1><strong>+5</strong></h1></button>
                </div>
              
            </div>
            <br/>
        </div>
    )
}