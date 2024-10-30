import { useForm } from "react-hook-form";
// axios
import axios from 'axios'
// react-hot-toast
import { Toaster, resolveValue, toast } from 'react-hot-toast';
export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data, event) => {
    // post the data to the backend
    try {
      const responseData = await axios.post('http://localhost:5000/user', data)

      // return the code after  if filed is empty
      if (!responseData.data) {
        toast.error("You miss some fields")
        return
      }

      // cheking the data sended to the backend
      if (responseData.data) {
        toast.success('All GOOD')
      }
    } catch (error) {
      toast.error("You miss some fields")
    }


  };



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-6/12 mx-auto p-6 bg-white bg-opacity-0 backdrop-blur-md rounded-lg shadow-lg space-y-4"
      >
        {/* Username */}
        <label htmlFor="username" className="block text-rose-50 font-semibold underline underline-offset-2 decoration-red-400 " required>
          Username
        </label>
        <input
          {...register("username")}
          className="w-full p-2 mt-1 text-gray-800 bg-white bg-opacity-80 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your username"
        />

        {/* Email */}
        <label htmlFor="email" className="block text-rose-50 font-semibold underline underline-offset-2 decoration-red-400" required>
          Email
        </label>
        <input
          {...register("email")}
          className="w-full p-2 mt-1 text-gray-800 bg-white bg-opacity-80 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />

        {/* Password */}
        <label htmlFor="password" className="block text-rose-50 font-semibold underline underline-offset-2 decoration-red-400" required>
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 mt-1 text-gray-800 bg-white bg-opacity-80 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
        />

        {/* Error message */}
        {errors.exampleRequired && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}

        {/* Submit Button */}
        <input
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          value="Submit"
        />
      </form>
    </>

  );
}