
export default function Button({onClick,children}:{ onClick: () => void ,children:React.ReactNode}) {
    return (
        <div>
            <button
                onClick={onClick} className="bg-green-500 px-16 py-4 text-xl hover:bg-green-700 text-white font-bold  rounded">
            {children}
            </button>
        </div>
    )
}
