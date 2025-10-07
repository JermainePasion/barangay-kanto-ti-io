const ComplaintStats = ({ complaints = [] }) => {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const cards = [
    { title: "Total Complaints", value: total, color: "bg-[#FAB12F]" },
    { title: "Pending", value: pending, color: "bg-[#DD0303]" },
    { title: "In Progress", value: inProgress, color: "bg-[#FA812F]" },
    { title: "Resolved", value: resolved, color: "bg-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`flex items-center justify-between p-6 rounded-2xl shadow-md text-white ${card.color} transition-transform transform hover:scale-105`}
        >
          <div>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintStats;
