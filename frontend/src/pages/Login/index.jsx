import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '@/components/Button';
import { Eye, EyeClosed, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { get } from '@/utils/httpRequest';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
    const softwareName = 'HT WareSoft';
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const submitData = async (data) => {
        const styleMessage = {
            style: {
                fontSize: '1.5rem',
            },
        };
        try {
            const response = await get('/login', { data });
            toast.success('Login successfully', {
                ...styleMessage,
            });
            // lưu thông tin vào redux
            // chuyển vào trang chính
            navigate('/');
        } catch (error) {
            toast.error(error, {
                ...styleMessage,
            });
            return;
        }
    };

    return (
        <div className={cx('wrapper-login')}>
            <div className={cx('form-login')}>
                <h1>Chào mừng bạn đến với {softwareName}</h1>

                <form className={cx('form')} onSubmit={handleSubmit(submitData)}>
                    <h2>Đăng nhập</h2>
                    <label className={cx('form-control')} htmlFor="emailUser">
                        <span>Email</span>
                        <div className={cx('input-form')}>
                            <input
                                {...register('email', {
                                    required: 'Email không để trống',
                                    pattern: {
                                        value: /^[\w.]+@(gmail|yahoo|edu)\.(com|com.vn)$/,
                                        message: 'Email không hợp lệ -> VD: abc@gmail.com',
                                    },
                                })}
                                id="emailUser"
                                type="email"
                                name="email"
                                placeholder="Nhập email"
                            />
                            <Mail className={cx('icon')} size={17} />
                        </div>
                        {errors.email && <p className={cx('error-message')}>{errors.email.message}</p>}
                    </label>
                    <label className={cx('form-control')} htmlFor="passwordUser">
                        <span>Password</span>
                        <div className={cx('input-form')}>
                            <input
                                {...register('password', { required: 'Mật khẩu không để trống' })}
                                id="passwordUser"
                                type={!showPassword ? 'password' : 'text'}
                                name="password"
                                placeholder="Nhập mật khẩu"
                            />
                            {!showPassword ? (
                                <EyeClosed size={17} className={cx('icon')} onClick={handleShowPassword} />
                            ) : (
                                <Eye size={17} className={cx('icon')} onClick={handleShowPassword} />
                            )}
                        </div>
                        {errors.password && <p className={cx('error-message')}>{errors.password.message}</p>}
                    </label>
                    <Button className={cx('btn-submit')} text medium type="submit">
                        Đăng nhập
                    </Button>
                    <p className={cx('other')}>
                        Don't have account?{' '}
                        <Button text className={cx('link-register')} to={'/register'}>
                            Đăng ký
                        </Button>
                    </p>
                </form>
            </div>
            <div className={cx('image-preview')} style={{ backgroundImage: `url(${logo})` }}></div>
        </div>
    );
};

export default Login;
