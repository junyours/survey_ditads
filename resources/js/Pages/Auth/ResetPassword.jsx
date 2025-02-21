import Inpt from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout"
import { useForm } from "@inertiajs/react";
import { Alert, Button } from "@material-tailwind/react";

const ResetPassword = ({ token, email }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const handleReset = (e) => {
    e.preventDefault();

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      {errors.password && (
        <Alert variant="ghost" color="red">
          <span className="text-sm">
            {errors.password}
          </span>
        </Alert>
      )}
      <form onSubmit={handleReset} className='space-y-6'>
        <span className="font-bold text-base text-green-500">Reset Password</span>
        <div className="space-y-4">
          <Inpt value={data.password} onChange={(e) => setData('password', e.target.value)} label="Password" type='password' required />
          <Inpt value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} label="Confirm Password" type='password' required />
        </div>
        <Button type='submit' color='green' fullWidth disabled={processing}>
          Save Changes
        </Button>
      </form>
    </GuestLayout>
  )
}

export default ResetPassword