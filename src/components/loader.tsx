import { ScaleLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <ScaleLoader color="#373948" />
      </div>
    </div>
  );
}
