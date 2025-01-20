import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useMessageStore } from '../store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  ApiKey: yup.string().min(2).required(),
});

export default function Home() {
  const navigate = useNavigate();
  const setApi = useMessageStore((state) => state.setApi);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    setApi(data.ApiKey);
    reset();
    navigate('chat');
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen text-white"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h1 className="font-bold text-3xl p-4">API Key</h1>
      <p className='pb-4'>If you entered before hit skip</p>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          required
          {...register('ApiKey')}
        />
      </label>
      <p className="text-red-700 py-1 font-bold">{errors.ApiKey?.message}</p>
      <div className="flex gap-2">
        <button className="btn my-5 text-white" type="submit">
          Done
        </button>
        <Link to="chat" className="btn my-5 text-white">
          Skip
        </Link>
      </div>
    </form>
  );
}
