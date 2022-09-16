import { Modal } from "antd";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface IChartModal {
  name: string;
  healthLevel: number;
  status: string;
  open: boolean;
  toggleModal: () => void;
}

export function ChartModal({
  name,
  healthLevel,
  status,
  open,
  toggleModal,
}: IChartModal) {
  const [level, setLevel] = useState(100 - healthLevel);

  const chartData: any = {
    series: [level, healthLevel],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true,
      },
      labels: ["Percentual de dano", "Sáude da máquina"],
      fill: {
        type: "gradient",
      },
      legend: {},
      colors: ["#D13438", "#03BD70"],
      title: {
        text: `Nível de saúde de ${name}`,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Modal open={open} onOk={toggleModal} onCancel={toggleModal}>
      <div
        id="chart"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width={380}
        />
      </div>
    </Modal>
  );
}
