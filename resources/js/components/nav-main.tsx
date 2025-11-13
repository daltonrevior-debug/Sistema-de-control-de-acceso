import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const isSubItemActive = (children: NavItem[]): boolean => {
        return children.some(child => page.url.startsWith(child.href || ''));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {

                    if (item.children && item.children.length > 0) {
                        const hasActiveChild = true;

                        return (

                            <SidebarMenuItem key={item.title} className="group/parent">
                                <details open={hasActiveChild}>
                                    <summary 
                                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                                            hasActiveChild ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronDown 
                                            className="w-4 h-4 transition-transform group-hover/parent:rotate-180" 
                                        />
                                    </summary>
                                    
                                    <SidebarMenu className="pl-4 mt-1 border-l ml-3 border-gray-200">
                                        {item.children.map((child) => (
                                            <SidebarMenuItem key={child.title}>
                                                <SidebarMenuButton 
                                                    asChild 
                                                    isActive={child.href === page.url}
                                                    tooltip={{ children: child.title }}
                                                >
                                                    <Link href={child.href || ''} prefetch>
                                                        {child.icon && <child.icon className="w-4 h-4" />}
                                                        <span>{child.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </details>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton  
                                asChild 
                                isActive={item.href === page.url}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href || ''} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}