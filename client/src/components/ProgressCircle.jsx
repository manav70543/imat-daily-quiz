import "./ProgressCircle.css";

export default function ProgressCircle({
    percentage,
    score,
    total,
    color
}) {

    const radius = 95;
    const stroke = 14;

    const normalizedRadius = radius - stroke / 2;

    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference -
        (percentage / 100) * circumference;

    return (
        <div className="progress-wrapper">

            <svg
                height={radius * 2}
                width={radius * 2}
                className="progress-ring"
            >

                {/* Background Ring */}

                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                {/* Progress Ring */}

                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

            </svg>

            <div className="progress-content">
                <h2>{percentage}%</h2>
                <p>{score} / {total}</p>
            </div>

        </div>
    );
}

