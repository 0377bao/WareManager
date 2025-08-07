import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

const Modal = ({ isOpenInfo, onClose, children }) => {
    return (
        <Transition appear show={isOpenInfo} as={Fragment}>
            <Dialog as="div" onClose={onClose} className={cx('modal-wrapper')}>
                {/* Overlay với fade */}
                <Transition.Child
                    as={Fragment}
                    enter={cx('overlay-enter')}
                    enterTo={cx('overlay-enter-active')}
                    leave={cx('overlay-leave')}
                    leaveTo={cx('overlay-leave-active')}
                >
                    <div className={cx('modal-overlay')} />
                </Transition.Child>

                {/* Content với fade + scale */}
                <div className={cx('modal-content')}>
                    <Transition.Child
                        as={Fragment}
                        enter={cx('modal-enter')}
                        enterTo={cx('modal-enter-active')}
                        leave={cx('modal-leave')}
                        leaveTo={cx('modal-leave-active')}
                    >
                        <DialogPanel>
                            {children}
                            <Button
                                className={cx('modal-close-button')}
                                medium
                                borderRadiusSmall
                                primary
                                onClick={onClose}
                                style={{ marginTop: '1.5rem' }}
                            >
                                Đóng
                            </Button>
                        </DialogPanel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
