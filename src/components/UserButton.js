export default function UserButton({ user, isSelected, onClick }) {
    return <button onClick={() => onClick(user)} className={`h-full group flex items-center w-full ${isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-200 hover:text-bg-blue-900 hover:ring-blue-200 ring-1 ring-slate-900/5 hover:cursor-pointer"} p-4 rounded-lg`}>
        <div className="flex-grow">
            <h2 className={`${isSelected ? "" : "text-slate-900 group-hover:text-blue-900"} title-font font-medium`}>{user.Username}</h2>
            <p className={`${isSelected ? "" : "text-slate-500 group-hover:text-blue-900"}`}>{user.group}</p>
        </div>
    </button>
}