<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['name', 'start_time', 'end_time', 'tardy_tolerance_minutes'];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

}
