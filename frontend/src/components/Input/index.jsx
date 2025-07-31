import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { useEffect, useRef, useState } from 'react';
const limitCharacter = import.meta.env.VITE_LIMIT_CHARACTER;

const cx = classNames.bind(styles);

export default function Input({ borderRadius = 8 }) {
    const [value, setValue] = useState('');
    const [rowInput, setRowInput] = useState(17);
    const btnPostRef = useRef();
    const inputRef = useRef();
    const inputRefHeight = useRef();

    const handleOnchangeInput = (e) => {
        const valueChange = e.target.value;
        if (valueChange.length <= Number(limitCharacter)) {
            setValue(valueChange);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!value.trim()) {
            btnPostRef.current.classList.add(cx('active'));
        } else {
            btnPostRef.current.classList.remove(cx('active'));
        }

        const heightValue = inputRefHeight.current.scrollHeight;

        if (heightValue != rowInput) {
            inputRef.current.style.height = heightValue + 'px';
            setRowInput(heightValue);
        }
    }, [value]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('group-input')} style={{ borderRadius: `${borderRadius}px` }}>
                <div className={cx('input-area-group')}>
                    <textarea
                        ref={inputRef}
                        rows="1"
                        className={cx('input-area')}
                        placeholder="Add comment..."
                        value={value}
                        onChange={handleOnchangeInput}
                    ></textarea>
                    <textarea
                        ref={inputRefHeight}
                        rows="1"
                        className={cx('input-area', 'input-height')}
                        value={value}
                        onChange={() => {}}
                    ></textarea>
                    {rowInput > 17 && (
                        <span className={cx('limit-text')}>
                            {value.length}/{limitCharacter}
                        </span>
                    )}
                </div>
            </div>
            <button ref={btnPostRef} className={cx('btn-post')}>
                Post
            </button>
        </div>
    );
}
