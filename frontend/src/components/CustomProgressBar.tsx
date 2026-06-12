import { generateRandomColorCode, formatNumberWithThousandsSeparator } from "../utils/general";
interface CustomProgressBarProps {
	limit: number,
	currentValue: number,
	singularColor: boolean,
	customProgressColor: any,
	showEmptyText: boolean,
	customEmptyText: string,
	showProgressValue: boolean
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = (props) => {
	const {
		limit,
		currentValue = 0,
		singularColor = false,
		customProgressColor = [{range: [0, 60], color: "#05E800"}, {range: [60, 80], color: "#FCF717"}, {range: [80, 100], color: "#E82700"}], // Default color is green, yellow, red.
		showEmptyText = false,
		customEmptyText = "No data available yet.",
		showProgressValue = false
	} = props;

	let currentPercentage = (currentValue / limit) * 100;

	if (currentPercentage > 100) {
		currentPercentage = 100;
	}

	let progressColor = "";

	if (!singularColor && Array.isArray(customProgressColor)) {
		for (let i = 0; i < customProgressColor.length; i++) {
			if (i === customProgressColor.length - 1) {
				progressColor = customProgressColor[i]['color'];
				break;
			}

			if (currentPercentage >= customProgressColor[i].range[0] && currentPercentage < customProgressColor[i].range[1]) {
				progressColor = customProgressColor[i]['color'];
				break;
			}
		}

	} else {
		if (!customProgressColor || customProgressColor === "") {
			progressColor = generateRandomColorCode();
		} else {
			progressColor = customProgressColor;
		}
	}

	if (limit && limit != "" && limit != 0) {
		return (
			<div className="progress-bar-container">
				<div className="progress-bar-limit-container">
					<div className="progress-display" style={{width: `${Number(currentPercentage)}%`, backgroundColor: progressColor}}></div>
					{
						showProgressValue && (
							<div className="progress-num-display">
								{formatNumberWithThousandsSeparator(currentValue)} / {formatNumberWithThousandsSeparator(limit)}
							</div>
						)
					}
				</div>
			</div>
		);
	} else if (showEmptyText) {
		return (
			<div className="d-flex justify-content-center align-items-center w-100 h-100">
				<span className="font-size-md font-weight-thick primary-text-color text-center">
					{customEmptyText}
				</span>
			</div>
		)
	}
}

export default CustomProgressBar;