import './progressBar.scss';

type ProgressBarProps = {
  progressValue: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue }) => {
  return (
    <div className="progressbar">
      <div className="filler" style={{ width: `${progressValue}%` }}>
        <span className="progress-label">{`${Math.round(progressValue)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
