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
    employee_id: string; // Ej: EMP-001
    first_name: string,
    last_name : string,
    personal_email : string,
    phone: string | null;
    hire_date: string; // Formato de fecha
    department_id: number;
    position: string | null;
    status: 'active' | 'inactive' | 'terminated';
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

interface Department {
    id: number;
    name: string;
}

// Tipo simplificado del Empleado
interface EmployeeData {
    id: number;
    first_name: string;
    last_name: string;
    personal_email: string | null;
    employee_id: string;
    hire_date: string;
    department_id: number;
    position: string | null;
    phone: string | null;
    status: 'active' | 'inactive' | 'terminated';
}

// Props para la vista EmployeeEdit
interface EmployeeEditProps {
    employee: EmployeeData;
    departments: Department[];
}
