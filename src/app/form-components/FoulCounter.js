"use client";
import { useState } from 'react';
import styles from './FoulCounter.module.css';
import CommentBox from './CommentBox';

export default function FoulCounter({ internalName, min, max }) {
    min = min || 0;
    max = max || 99999;

    const [majorValue, setMajorValue] = useState(0);
    const [minorValue, setMinorValue] = useState(0);

    function increment(setValue, value) {
        if (value + 1 <= max) setValue(value + 1);
    }

    function decrement(setValue, value) {
        if (value - 1 >= min) setValue(value - 1);
    }

    return (
        <div className={styles.FoulCounter}>
            <div className={styles.titleBox}>
                <h1 className={styles.title}>Foul Count</h1>
                <hr className={styles.Line} />
            </div>

            <div className={styles.countersRow}>
                {/* Major Counter */}
                <div className={styles.counterGroup}>
                    <p className={styles.counterLabel}>Major:</p>
                    <div className={styles.counterRow}>
                        <button
                            type="button"
                            className={styles.DecButton}
                            onClick={() => decrement(setMajorValue, majorValue)}
                        >
                            <strong>-</strong>
                        </button>
                        <input
                            className={styles.input}
                            type="number"
                            id={`${internalName}-major`}
                            name={`${internalName}-major`}
                            value={majorValue}
                            readOnly
                        />
                        <button
                            type="button"
                            className={styles.IncButton}
                            onClick={() => increment(setMajorValue, majorValue)}
                        >
                            <strong>+</strong>
                        </button>
                    </div>
                </div>

                {/* Minor Counter */}
                <div className={styles.counterGroup}>
                    <p className={styles.counterLabel}>Minor:</p>
                    <div className={styles.counterRow}>
                        <button
                            type="button"
                            className={styles.DecButton}
                            onClick={() => decrement(setMinorValue, minorValue)}
                        >
                            <strong>-</strong>
                        </button>
                        <input
                            className={styles.input}
                            type="number"
                            id={`${internalName}-minor`}
                            name={`${internalName}-minor`}
                            value={minorValue}
                            readOnly
                        />
                        <button
                            type="button"
                            className={styles.IncButton}
                            onClick={() => increment(setMinorValue, minorValue)}
                        >
                            <strong>+</strong>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.fCommentBox}>
                <CommentBox
                    visibleName={"Foul Elaboration"}
                    internalName={"foulcomments"}
                />
            </div>
        </div>
    );
}