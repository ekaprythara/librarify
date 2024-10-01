export default function Guest({ children }) {
    return (
        <div className="h-screen flex justify-center items-center w-full bg-slate-400 px-8">
            {children}
        </div>
    );
}
