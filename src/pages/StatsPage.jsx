import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useKeenKeeper } from "../context/KeenKeeperContext";

const pieStyles = {
  call: "#1f5a49",
  text: "#6f3fe9",
  video: "#2ea86f"
};

const legendOrder = ["text", "call", "video"];

export default function StatsPage() {
  const { interactionCounts } = useKeenKeeper();

  const data = [
    { name: "Call", value: interactionCounts.call, key: "call" },
    { name: "Text", value: interactionCounts.text, key: "text" },
    { name: "Video", value: interactionCounts.video, key: "video" }
  ];

  const totalInteractions = data.reduce((sum, item) => sum + item.value, 0);
  const hasInteractions = totalInteractions > 0;
  const chartData = hasInteractions
    ? data
    : [
        { name: "Call", value: 1, key: "call" },
        { name: "Text", value: 1, key: "text" },
        { name: "Video", value: 1, key: "video" }
      ];

  return (
    <div className="page-wrap max-w-4xl space-y-5">
      <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">Friendship Analytics</h1>

      <section className="card-panel p-4 sm:p-5">
        <h2 className="text-xl font-extrabold text-brand-dark sm:text-2xl">By Interaction Type</h2>

        <div className="mt-3 h-[250px] w-full sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="82%"
                cornerRadius={10}
                stroke="none"
                strokeWidth={0}
                paddingAngle={2}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={pieStyles[entry.key]}
                    fillOpacity={hasInteractions ? 1 : 0.35}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [hasInteractions ? value : 0, name]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #d5dde4",
                  backgroundColor: "#ffffff"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-5 pb-1">
          {legendOrder.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieStyles[type] }} />
              <span className="text-sm font-semibold capitalize text-slate-500 sm:text-base">{type}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}