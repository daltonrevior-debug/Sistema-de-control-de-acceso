import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="absolute inset-0 bg-contain opacity-50 z-0 bg-[url('/Fondo.png')]">
        </div>
        <div className='z-10 bg-gray-50 opacity-80 h-screen'>
            {children}
        </div>
    </AppLayoutTemplate>
);
