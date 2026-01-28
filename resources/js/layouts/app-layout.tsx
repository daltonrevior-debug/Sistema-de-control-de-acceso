import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import Toast from '@/components/Toast';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="relative min-h-screen w-full overflow-hidden">

            <div
                className="fixed inset-0 bg-contain bg-center opacity-15 z-0 pointer-events-none"
                style={{ backgroundImage: "url('/Fondo.png')" }}
            >
            </div>

            <div className='relative z-20 min-h-screen'>
                {children}
            </div>

            <Toast />
        </div>
    </AppLayoutTemplate>
);