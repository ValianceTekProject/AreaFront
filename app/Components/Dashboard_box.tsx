import DashboardLinkField from "./Dashboard_boxfield";

export default function DashboardBox({ actionText, reactionText, checked, onCheck, label }) {
  return (
    <div className="w-full bg-white rounded-md shadow-md p-10 flex items-start justify-between">

      <div className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="self-center mr-20 w-6 h-6 accent-[#1B1D20]"
        />

        <div className="flex flex-col">
          <div className="mb-6">
            <p className="font-semibold text-2xl text-[#1B1D20]">Action:</p>
            <p className="text-xl text-[#4A4A4A]">{actionText}</p>
          </div>

          <div>
            <p className="font-semibold text-2xl text-[#1B1D20]">Reaction:</p>
            <p className="text-xl text-[#4A4A4A]">{reactionText}</p>
          </div>
        </div>
      </div>

      <DashboardLinkField
        label={label}
        onApply={(link) => console.log("Lien appliqué :", link)}
        className="ml-auto"
      />
    </div>
  );
}
