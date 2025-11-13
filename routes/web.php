<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

Route::get('/', function () {
    return Redirect::route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
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
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
