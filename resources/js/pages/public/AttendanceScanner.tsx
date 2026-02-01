import React, { useState, useEffect, useRef } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { CheckCircle, AlertCircle, Scan, QrCode, RefreshCw, Camera, ArrowLeft } from 'lucide-react';
import jsQR from 'jsqr';
import { error } from 'console';

type ScannerStatus = 'success' | 'error' | "deny" | null;

interface FlashMessages {
    success?: string;
    error?: string;
    deny?: string;
}

interface MarkData extends Record<string, string> {
    employee_id: string;
}

const AttendanceScanner: React.FC = () => {
    const [scanResult, setScanResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<ScannerStatus>(null);
    const [message, setMessage] = useState<string>('');
    const [cameraReady, setCameraReady] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const isProcessing = useRef<boolean>(false);

    const handleMark = (employeeId: string) => {
        if (isProcessing.current || loading) return;

        isProcessing.current = true;
        setLoading(true);
        setStatus(null);
        setMessage('');

        const dataToSend: MarkData = {
            employee_id: employeeId
        };

        router.post(route('public.attendance.mark'), dataToSend, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flashMessages = (page.props.flash as FlashMessages) || {};

                if (flashMessages.success) {
                    setMessage(flashMessages.success || 'Marcaje procesado exitosamente.');
                    setStatus('success');
                }

                if (flashMessages.error) {
                    setMessage(flashMessages.error || 'Acceso Denegado!');
                    setStatus('error');
                }

                if (flashMessages.deny) {
                    setMessage(flashMessages.deny || 'Acceso Denegado!');
                    setStatus('deny');
                }

                setLoading(false);

                setTimeout(() => {
                    setScanResult('');
                    setStatus(null);
                    setMessage('');
                    isProcessing.current = false;
                }, 4000);
            },
            onError: (errors: any) => {
                const errorMessage = errors.employee_id || errors.error || 'Código no reconocido.';
                setMessage(errorMessage);
                setStatus('error');

                setTimeout(() => {
                    setScanResult('');
                    setLoading(false);
                    setStatus(null);
                    isProcessing.current = false;
                }, 2000);
            }
        });
    };

    const tick = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                if (!isProcessing.current) {
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code && code.data) {
                        setScanResult(code.data);
                        handleMark(code.data);
                    }
                }
            }
        }
        requestRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });

                console.log(stream)

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.setAttribute("playsinline", "true");
                    videoRef.current.muted = true;
                    videoRef.current.onloadedmetadata = async () => {
                        try {
                            await videoRef.current?.play();
                            setCameraReady(true);
                            requestRef.current = requestAnimationFrame(tick);
                        } catch (e) {
                            console.error("Error al iniciar reproducción:", e);
                        }
                    };
                }
            } catch (err) {
                console.error("Acceso a cámara denegado o no disponible:", err);
                setMessage("Error: No se pudo acceder a la cámara. Verifique los permisos.");
                setStatus("error");
            }
        };

        startCamera();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <>
            <Head title="Terminal de Marcaje QR" />

            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-900">

                <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col items-center p-8 relative">

                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
                            <QrCode className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Terminal Asistencia</h1>
                    </div>

                    <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-inner ring-8 ring-slate-50">

                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                        />

                        <canvas ref={canvasRef} className="hidden" />

                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 border-[45px] border-black/30 backdrop-blur-[1px]">
                                <div className="w-full h-full border-2 border-indigo-400/40 rounded-3xl relative">
                                    <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-indigo-500 rounded-tl-xl"></div>
                                    <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-indigo-500 rounded-tr-xl"></div>
                                    <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-indigo-500 rounded-bl-xl"></div>
                                    <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-indigo-500 rounded-br-xl"></div>
                                </div>
                            </div>

                            {cameraReady && !loading && !status && (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_rgba(99,102,241,1)] animate-pulse"></div>
                            )}
                        </div>

                        {!cameraReady && !message && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900">
                                <RefreshCw className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Inicializando Lente</span>
                            </div>
                        )}

                        {(loading && !status) && (
                            <div className="absolute aspect-square rounded-[2.5rem] inset-0 bg-indigo-600/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 transition-all duration-300">
                                <RefreshCw className="w-14 h-14 animate-spin mb-4 text-white" />
                                <h2 className="text-2xl font-black tracking-tighter mb-1 uppercase">Validando</h2>
                                <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Comunicando con servidor</p>
                            </div>
                        )}

                        {(!loading && status) && (
                            <div className={`absolute inset-0 aspect-square rounded-[2.5rem] 
                            ${status === "success" && 'bg-green-600/90'} 
                            ${status === "error" && 'bg-rose-500/90'}
                            ${status === "deny" && 'bg-yellow-400/90'}
                            backdrop-blur-md flex flex-col items-center justify-center text-white p-6 transition-all duration-300`}>
                                <CheckCircle className="w-14 h-14 mb-4 text-white" />
                                <h2 className="text-2xl font-black tracking-tighter mb-1 uppercase">
                                    {status !== "success" ? "Acceso Denegado" : "Acceso Permitido"}
                                </h2>
                                <p className="text-xs text-center font-bold opacity-60 uppercase tracking-widest">
                                    {message || "Asistencia marcada con exito"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="w-full mt-10 min-h-[90px] flex flex-col items-center justify-center text-center">
                        {!status && !loading && (
                            <div className="space-y-2 group">
                                <div className="flex items-center justify-center gap-2 text-indigo-600">
                                    <Scan className="w-5 h-5 animate-bounce" />
                                    <span className="text-sm font-black tracking-widest uppercase">Escaneando</span>
                                </div>
                                <p className="text-xs text-slate-400 font-bold max-w-[200px] leading-tight">
                                    Coloque el código QR dentro del recuadro central
                                </p>
                            </div>
                        )}

                        {status && (
                            <div className={`w-full p-5 rounded-[1.5rem] flex items-center gap-4 transition-all duration-500 scale-100 animate-in zoom-in
                            ${status === "success" && 'bg-emerald-50 text-emerald-900 border border-emerald-100 shadow-lg shadow-emerald-100/50'} 
                            ${status === "error" && 'bg-rose-50 text-rose-900 border border-rose-100 shadow-lg shadow-rose-100/50'}
                            ${status === "deny" && 'bg-yellow-50 text-yellow-900 border border-yellow-100 shadow-lg shadow-yellow-100/50'} `}
                            >
                                <div
                                    className={`p-3 rounded-2xl shrink-0
                            ${status === "success" && 'bg-emerald-500 text-white'} 
                            ${status === "error" && 'bg-rose-500 text-white'}
                            ${status === "deny" && 'bg-yellow-500 text-black'}`}
                                >
                                    {status === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-xs uppercase tracking-widest mb-0.5">
                                        {status === 'success' ? 'Confirmado' : 'Rechazado'}
                                    </p>
                                    <p className="text-sm font-bold leading-tight tracking-tight">{message}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div>
                            <Link
                                href={route('home')}
                                className="group flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-3 opacity-20">
                    <Camera className="w-6 h-6 text-white" />
                    <div className="flex flex-col items-center italic">
                        <p className="text-[10px] text-white font-black tracking-[0.4em] uppercase">Security Terminal v1.0</p>
                        <p className="text-[9px] text-white font-bold opacity-50 uppercase">{new Date().toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendanceScanner;