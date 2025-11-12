<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'first_name',
        'last_name',
        'personal_email',
        'employee_id',
        'hire_date',
        'department_id',
        'position',
        'phone',
        'status',
        'schedule_id'
    ];
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
