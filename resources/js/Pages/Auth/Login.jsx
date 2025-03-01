import Inpt from '@/Components/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { Alert, Button, Checkbox } from '@material-tailwind/react';

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleLogin = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            {status && (
                <Alert variant="ghost" color="green">
                    <span className="text-sm">
                        {status}
                    </span>
                </Alert>
            )}
            {(errors.email || errors.password) && (
                <Alert variant="ghost" color="red">
                    <span className="text-sm">
                        {errors.email || errors.password}
                    </span>
                </Alert>
            )}
            <form onSubmit={handleLogin} className='space-y-6'>
                <span className="font-bold text-base text-green-500">Login</span>
                <div className="space-y-4">
                    <Inpt value={data.email} onChange={(e) => setData('email', e.target.value)} label="Email Address" type='email' required />
                    <div className="space-y-2">
                        <Inpt value={data.password} onChange={(e) => setData('password', e.target.value)} label="Password" type='password' required />
                        <div className="flex justify-between items-center">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    color="green"
                                />
                                <span className="font-normal text-sm text-blue-gray-500">
                                    Remember Me
                                </span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')}>
                                    <span className="text-blue-gray-500 text-sm cursor-pointer hover:underline hover:text-green-500">Forgot Password?</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <Button type='submit' color='green' fullWidth disabled={processing}>
                    Sign In
                </Button>
            </form>
        </GuestLayout>
    );
}

export default Login