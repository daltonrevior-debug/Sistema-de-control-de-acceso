/* Daniel aca te muestro el como se implementa la caracteristica para mostrar y ocultar la contrase;a en el input, te dejo como tarea
    que implementes lo mismo en el formulario de registro
*/
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react'; //<--- para manejar el estado del icono usaremos el hook useState de react
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai' //<---- Importamos los iconos

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false); //<--- aca usaremos el manejo de estado, basicamente es como una variable que almacena el valor en showPassword y setShowPassword es la funcion que nos permitira modificar ese valor
    //Nota : En este caso el valor de showPaswword es un booleano, ya que lo unico que necesitamos es que si una condicion se cumple, mostramos la contrase;a / [1 o 0]

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Inicia sesión a tu cuenta" description="Ingresa tu correo electrónico y contraseña debajo para iniciar sesión">
            <Head title="Iniciar sesión" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>


                    {/*  ========= Inicio de la etiqueta Padre ============ */}
                    
                    <div className="grid gap-2 relative"> {/* A la etiqueta padre le asignamos una posicion relativa, esto es para que el hijo lo tome como referencia */}
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"} // Aca manejamos la configuracion del input, esta es la clave para mostra u ocultar el texto en el input, solo validamos si showPassword es verdadero, si se cumple cambiamos el type del input a text, si no se cumple sera de tipo password
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />

                        {/*Este es el elemento contenedor que nos servira para posicionar los iconos dentro del input, si te fijas se le agrego una posicion absoluta esto es para que tome como referencia de posicion al padre, posicionandolo por default en el eje x:0 y:0, si te fijas en las clases right-5 y bottom-2.5, ahi se le asigan la posicion que queremos.*/}

                        <div className='absolute right-5 bottom-2.5 cursor-pointer' 
                        onClick={() => setShowPassword(!showPassword)}> {/* Este contenedor se encargara de manejar el click para cambiar el valor de showPassword */}

                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* aca simplemente validamos el valor de showPassword y mostramos el icono adecuado. */}

                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* ========= Cierre de la etiqueta Padre ============ */}

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
