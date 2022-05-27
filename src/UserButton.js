export default function UserButton({ user, isSelected, onClick }) {
    return <button onClick={() => onClick(user)} className={`h-full group flex items-center w-full ${isSelected ? "bg-blue-500 text-white" : "hover:bg-sky-500 hover:text-white hover:ring-sky-500 ring-1 ring-slate-900/5 hover:cursor-pointer"} p-4 rounded-lg`}>
        <div className="flex-grow">
            <h2 className={`${isSelected ? "" : "text-slate-900 group-hover:text-white"} title-font font-medium`}>{user.Username}</h2>
            <p className={`${isSelected ? "" : "text-slate-500 group-hover:text-white"}`}>{user.group}</p>
        </div>
    </button>
}