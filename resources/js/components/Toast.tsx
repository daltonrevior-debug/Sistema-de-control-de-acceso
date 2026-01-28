import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function Toast() {
    const { flash } = usePage().props as any;
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState({ message: '', type: '' });

    useEffect(() => {

        const message = flash.error || flash.message || flash.success;

        if (message) {
            setContent({
                message: message,
                type: flash.error ? 'error' : 'success'
            });
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[100] animate-in fade-in slide-in-from-right-5 pointer-events-auto">
            <div className={`flex items-center gap-3 p-4 rounded-lg shadow-2xl border-2 ${content.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                {content.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                <p className="text-sm font-bold">{content.message}</p>
                <button onClick={() => setVisible(false)} className="ml-2 hover:scale-110 transition-transform">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}