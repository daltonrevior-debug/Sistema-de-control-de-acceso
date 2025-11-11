import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Department {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    user_id: number;
    employee_id: string; // Ej: EMP-001
    phone: string | null;
    hire_date: string; // Formato de fecha
    department_id: number;
    position: string | null;
    status: 'active' | 'inactive' | 'terminated';
    user: User; // Relación cargada
    department: Department; // Relación cargada
}

interface PaginationData<T> {
    current_page: number;
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number | null;
    to: number | null;
}

interface EmployeeIndexProps {
    employees: PaginationData<Employee>;
    filters: Record<string, string | number | null>;
}

interface EmployeeCreateProps {
    departments: Department[];
}
