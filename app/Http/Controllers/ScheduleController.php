<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Schedule;
use App\Http\Requests\ScheduleStoreRequest;
use App\Http\Requests\ScheduleUpdateRequest;

class ScheduleController extends Controller
{
    /** Muestra la lista de horarios. */
    public function index()
    {
        $schedules = Schedule::orderBy('name')->paginate(10);

        return Inertia::render('config/ScheduleIndex', [
            'schedules' => $schedules,
        ]);
    }

    /** Muestra el formulario de creación. */
    public function create()
    {
        return Inertia::render('config/ScheduleCreate');
    }

    /** Almacena un nuevo horario. */
    public function store(ScheduleStoreRequest $request)
    {
        Schedule::create($request->validated());

        return redirect()->route('config.schedules.index')->with('success', 'Horario de trabajo creado exitosamente.');
    }

    /** Muestra el formulario de edición. */
    public function edit(Schedule $schedule)
    {
        return Inertia::render('config/ScheduleEdit', [
            'schedule' => $schedule,
        ]);
    }

    /** Actualiza el horario. */
    public function update(ScheduleUpdateRequest $request, Schedule $schedule)
    {
        $schedule->update($request->validated());

        return redirect()->route('config.schedules.index')->with('success', 'Horario de trabajo actualizado exitosamente.');
    }

    /** Elimina un horario. */
    public function destroy(Schedule $schedule)
    {
        if ($schedule->employees()->count() > 0) {
            return back()->with('error', 'No se puede eliminar este horario porque hay empleados asignados.');
        }

        $schedule->delete();

        return redirect()->route('config.schedules.index')->with('success', 'Horario de trabajo eliminado.');
    }
}
