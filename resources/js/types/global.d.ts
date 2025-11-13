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

interface EmployeeEditProps {
    employee: EmployeeData;
    departments: Department[];
}

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Schedule {
    id: number;
    name: string;
    start_time: string; // Ej: '09:00:00'
    end_time: string;   // Ej: '17:00:00'
    tardy_tolerance_minutes: number;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    flash: {
        success: string | null;
        error: string | null;
    };
}

export interface AbsenceType {
    id: number;
    name: string;
    description: string | null;
    is_paid: boolean;
    created_at: string;
    updated_at: string;
}

export interface AbsenceRequest {
    id: number;
    employee_id: number;
    absence_type_id: number;
    start_date: string;
    end_date: string;
    status: 'pending' | 'approved' | 'rejected';
    reason: string;
    rejection_reason: string | null;
    approver_id: number | null;
    created_at: string;
    updated_at: string;
    employee?: { id: number, first_name: string, last_name: string };
    absence_type?: AbsenceType;
    approver?: { id: number, name: string };
}