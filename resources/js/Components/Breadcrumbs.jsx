import { Link } from "@inertiajs/react";

export const Breadcrumbs = ({ data }) => {
    return (
        <div className="breadcrumbs flex justify-end items-center text-md text-gray-700">
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.href ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            item.label
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
