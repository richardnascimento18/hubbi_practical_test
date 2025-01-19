export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-12 w-12 rounded-full">
      <div className="h-3 w-3 rounded-full bg-red-600 mb-0.5"></div>

      <div className="flex mt-0.5">
        <div className="h-3 w-3 rounded-full mr-0.5 bg-yellow-600"></div>
        <div className="h-3 w-3 rounded-full ml-0.5 bg-green-600"></div>
      </div>
    </div>
  );
}
