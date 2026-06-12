// Charts js imports
import { Pie } from  'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { generateRandomColorCode } from "../utils/general.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomPieChartProps {
	chartDataList: [],
	chartTitle: string,
	emptyChartTitle: string
}

const CustomPieChart: React.FC<CustomPieChartProps> = (props) => {
	const {
		chartDataList = [],
		chartTitle = "",
		emptyChartTitle = "No chart data",
	} = props;

	if (chartDataList && chartDataList.length > 0) {
		const chartItemTotals = chartDataList.reduce((item, obj) => {
			item[obj.label] = (item[obj.label] || 0) + Number(obj.value);
			return item;
		}, {});

		let colorArray = [];

		Object.keys(chartItemTotals).forEach((item, index) => {
			let tempColorCode = "";

			do {
				tempColorCode = generateRandomColorCode();
			} while (colorArray.includes(tempColorCode))

			colorArray.push(tempColorCode);
		});

		const data = {
			labels: Object.keys(chartItemTotals),
			datasets: [{
				data: Object.values(chartItemTotals),
				backgroundColor: colorArray
			}]
		};

		return (
			<div>
				<Pie data={data}/>
				{
					chartTitle && chartTitle !== "" && (
						<div className="d-flex justify-content-center align-items-center w-100 mt-2">
							<span className="font-size-lg font-weight-thick primary-text-color text-center">{chartTitle}</span>
						</div>
					)
				}
			</div>
		);
	} else {
		return (
			<div className="d-flex justify-content-center align-items-center w-100 h-100">
				<span className="font-size-md font-weight-thick primary-text-color text-center">
					{emptyChartTitle}
				</span>
			</div>
		);
	}
}

export default CustomPieChart;