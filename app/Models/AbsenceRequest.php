<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'absence_type_id',
        'start_date',
        'end_date',
        'status',
        'reason',
        'rejection_reason',
        'approver_id',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function employee() { return $this->belongsTo(Employee::class); }
    public function absenceType() { return $this->belongsTo(AbsenceType::class); }
    public function approver() { return $this->belongsTo(\App\Models\User::class, 'approver_id'); }
}
