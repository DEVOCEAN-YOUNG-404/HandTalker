type TextInputProps = {
  label: string;
  isPW: boolean;
};

export const TextInput = ({ label, isPW }: TextInputProps) => {
  return (
    <div className="outline mb-3 flex items-center relative w-[310px] h-[48px] transition-colors duration-300 border border-gray-300 px-2 rounded-lg focus-within:border-main-2 outline-none">
      <input
        type={isPW ? "password" : "text"}
        name="id"
        placeholder=" "
        className="block w-full h-full bg-transparent appearance-none focus:outline-none"
      />
      <label
        htmlFor="id"
        className="absolute duration-300 bg-white origin-0 text-start -z-10"
      >
        {label}
      </label>
    </div>
  );
};
