"use client";
import { useState } from 'react';
import styles from './FuelCounter.module.css';

export default function FuelCounter({ visibleName, internalName, pieceType, min, max }) {
    min = min || 0;
    max = max || 99999;

    const [value, setValue] = useState(0);

    function incrementOne() {
        if (value + 1 <= max) {
            setValue(value + 1);
        }
    }

    function incrementFive() {
        if (value + 5 <= max) {
            setValue(value + 5);
        }
    }

    function incrementTwenty() {
        if (value + 20 <= max) {
            setValue(value + 20);
        }
    }

    function decrementOne() {
        if (value - 1 >= min) {
            setValue(value - 1);
        }
    }

    function decrementFive() {
        if (value - 5 >= min) {
            setValue(value - 5);
        }
    }

    function decrementTwenty() {
        if (value - 20 >= min) {
            setValue(value - 20);
        }
    }

    return (
        <div className={styles.FuelCounter}>
            <label className={styles.label} htmlFor={internalName}>{visibleName}</label>
            <div className={styles.Container}>
                <div className={styles.decrementBox}>
                    <button type="button" className={styles.DecButton} onClick={decrementOne}><h1><strong>-1</strong></h1></button>
                    <button type="button" className={styles.DecButton} onClick={decrementFive}><h1><strong>-5</strong></h1></button>
                    <button type="button" className={styles.DecButton} onClick={decrementTwenty}><h1><strong>-20</strong></h1></button>
                </div>
                
                <div className={styles.inputBox}>  
                    <h1>Fuel</h1>
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
                    <button type="button" className={styles.IncButton} onClick={incrementOne}><h1><strong>+1</strong></h1></button>
                    <button type="button" className={styles.IncButton} onClick={incrementFive}><h1><strong>+5</strong></h1></button>
                    <button type="button" className={styles.IncButton} onClick={incrementTwenty}><h1><strong>+20</strong></h1></button>
                </div>
            </div>
            <br/>
        </div>
    )
}