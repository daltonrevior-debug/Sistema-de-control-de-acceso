<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('public/attendance')->name('public.attendance.')->controller(\App\Http\Controllers\PublicAttendanceController::class)->group(function () {
    Route::get('/scanner', 'scanner')->name('scanner'); 
    Route::post('/mark', 'mark')->name('mark');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Redirect::route('reports.index');
    })->name('dashboard');

    Route::prefix('personnel')->name('personnel.')->group(function () {
        Route::get('/employees', [\App\Http\Controllers\EmployeeController::class, 'index'])->name('employees.index');
        Route::get('/employees/create', [\App\Http\Controllers\EmployeeController::class, 'create'])->name('employees.create');
        Route::post('/employees', [\App\Http\Controllers\EmployeeController::class, 'store'])->name('employees.store');
        Route::get('/employees/{employee}/edit', [\App\Http\Controllers\EmployeeController::class, 'edit'])->name('employees.edit');
        Route::put('/employees/{employee}', [\App\Http\Controllers\EmployeeController::class, 'update'])->name('employees.update');
    });

    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/', [\App\Http\Controllers\AttendanceController::class, 'index'])->name('index'); 
        Route::post('/check-in', [\App\Http\Controllers\AttendanceController::class, 'checkIn'])->name('check.in');
        Route::post('/check-out', [\App\Http\Controllers\AttendanceController::class, 'checkOut'])->name('check.out');
        Route::get('/history', [\App\Http\Controllers\AttendanceController::class, 'history'])->name('history');
        Route::get('/request', [\App\Http\Controllers\AbsenceRequestController::class, 'createEmployeeRequest'])->name('request.create');
        Route::post('/request', [\App\Http\Controllers\AbsenceRequestController::class, 'storeEmployeeRequest'])->name('request.store');
        Route::get('/absence-history', [\App\Http\Controllers\AbsenceRequestController::class, 'employeeHistory'])->name('absence-history');
    });

    Route::prefix('config')->name('config.')->group(function () {
        Route::resource('schedules', \App\Http\Controllers\ScheduleController::class)->only([
        'index', 'create', 'store', 'edit', 'update', 'destroy'
        ]);
        Route::resource('absence-types', \App\Http\Controllers\AbsenceTypeController::class)->only([
            'index', 'create', 'store', 'edit', 'update', 'destroy'
        ]);
        Route::resource('departments', \App\Http\Controllers\DepartmentController::class)->except(['show']);
        Route::prefix('absence-requests')->name('absence-requests.')->controller(\App\Http\Controllers\AbsenceRequestController::class)->group(function () {
            Route::get('/', 'indexAdminReview')->name('index');
            Route::post('/{absenceRequest}/approve', 'approve')->name('approve');
            Route::post('/{absenceRequest}/reject', 'reject')->name('reject');
        });
    });

    Route::prefix('reports')->name('reports.')->controller(\App\Http\Controllers\ReportController::class)->group(function () {
        Route::get('/', 'index')->name('index'); 
        Route::get('/absence-summary', 'absenceSummary')->name('absence-summary');
        Route::get('/leave-balance', 'leaveBalance')->name('leave-balance');
        Route::get('/attendance-detail', 'attendanceDetail')->name('attendance-detail');
        Route::get('/personnel-list', 'personnelList')->name('personnel-list');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
