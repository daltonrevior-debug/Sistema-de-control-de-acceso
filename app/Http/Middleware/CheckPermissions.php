<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        $userPermissions = $request->user()->permission ?? [];

        $hasPermission = !empty(array_intersect($userPermissions, $permissions));

        if (!$request->user() || !$hasPermission) {
            if ($request->expectsJson()) {
                abort(403, 'No tienes permisos para acceder a esta sección.');
            }
            return redirect()->route('dashboard')->with('error', 'Acceso denegado.');
        }

        return $next($request);
    }
}
