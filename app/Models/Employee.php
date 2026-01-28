<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

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
        'schedule_id',
        'birth_date',
        'birth_place',
        'marital_status',
        'current_address',
        'photo'
    ];

    protected function photo(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                if (!$value) return null;

                if (filter_var($value, FILTER_VALIDATE_URL)) {
                    return $value;
                }

                return asset('storage/' . $value);
            }
        );
    }
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}