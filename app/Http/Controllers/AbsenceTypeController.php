<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AbsenceType;
use App\Http\Requests\AbsenceTypeStoreRequest;
use App\Http\Requests\AbsenceTypeUpdateRequest;

use Illuminate\Http\Request;

class AbsenceTypeController extends Controller
{
    public function index()
    {
        $types = AbsenceType::orderBy('name')->paginate(10);

        return Inertia::render('config/AbsenceTypeIndex', [
            'types' => $types,
        ]);
    }

    public function create()
    {
        return Inertia::render('config/AbsenceTypeCreate');
    }

    public function store(AbsenceTypeStoreRequest $request)
    {
        AbsenceType::create($request->validated());

        return redirect()->route('config.absence-types.index')->with('success', 'Tipo de Ausencia creado exitosamente.');
    }

    public function edit(AbsenceType $absenceType)
    {
        return Inertia::render('config/AbsenceTypeEdit', [
            'type' => $absenceType,
        ]);
    }

    public function update(AbsenceTypeUpdateRequest $request, AbsenceType $absenceType)
    {
        $absenceType->update($request->validated());

        return redirect()->route('config.absence-types.index')->with('success', 'Tipo de Ausencia actualizado exitosamente.');
    }

    public function destroy(AbsenceType $absenceType)
    {
        $absenceType->delete();

        return redirect()->route('config.absence-types.index')->with('success', 'Tipo de Ausencia eliminado.');
    }
}
