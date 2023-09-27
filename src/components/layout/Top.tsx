import { ModeToggle } from "../theme/ModeToggle";

export const Top = () => {
  return (
    <div className="w-full shadow">
      <div className="container flex flex-row justify-between items-center p-2 px-4">
        <div className=" text-lg flex flex-row gap-2 items-center">
          <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Fit for Future 2023
          </span>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
