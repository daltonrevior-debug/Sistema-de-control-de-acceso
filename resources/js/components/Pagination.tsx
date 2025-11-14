import { Link } from '@inertiajs/react';
import React from 'react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    if (links.length <= 3) {
        return null; 
    }

    const baseClasses = "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500";
    const disabledClasses = "bg-gray-100 text-gray-400 cursor-default"; 

    return (
        <div className="flex flex-wrap mt-8">
            {links.map((link, index) => (
                <div key={index}>
                    {link.url === null ? (
                        <div
                            className={`${baseClasses} ${disabledClasses}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            className={`${baseClasses} ${link.active ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}
                            href={link.url}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Pagination;