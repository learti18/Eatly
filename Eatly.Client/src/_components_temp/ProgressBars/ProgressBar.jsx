export default function ProgressBar({ percentage, className = "" }) {
  return (
    <div className={`${className}`}>
      <div className="w-full h-2 bg-purple-light rounded-full overflow-hidden">
        <div
          className="h-full bg-purple transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
