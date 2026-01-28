import React, { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { EmployeeData } from '@/types/global';

const EmployeeBadge: React.FC<{ employee: EmployeeData }> = ({ employee }) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!badgeRef.current) return;

    try {
      const dataUrl = await toPng(badgeRef.current, { quality: 0.95, pixelRatio: 3 });
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(dataUrl, 'PNG', 10, 10, 55, 85);
      pdf.save(`ID_${employee.first_name}-${employee.last_name}.pdf`);
    } catch (err) {
      console.error('Error generando el PDF:', err);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">

      <div
        ref={badgeRef}
        className="relative w-[300px] h-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >

        <div className="relative h-24 bg-gradient-to-br from-blue-600 to-indigo-700 p-4 flex justify-center items-start">
          <span className="text-white/60 font-bold tracking-widest text-center text-xs uppercase">
            CAPRECEN Central • Guacara
          </span>
        </div>

        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
            {employee.photo ? (
              <img
                src={`${employee.photo}`}
                alt="foto del carnet"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-3xl font-bold tracking-tighter">
                {`${employee.first_name?.charAt(0) || ''}${employee.last_name?.charAt(0) || ''}`.toUpperCase()}
              </span>
            )}
          </div>

        </div>

          <div
            className="absolute top-10 left-2 w-13 h-13 bg-[url('/Escudomilicia.png')] bg-contain bg-no-repeat bg-center opacity-90"
          ></div>

        <div className="mt-20 px-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            {employee.first_name.toUpperCase()} {employee.last_name.toUpperCase()}
          </h2>
          <p className="text-sm font-bold text-gray-800 leading-tight">
            C.I. V-{employee.employee_id}
          </p>
          <p className="text-blue-600 font-medium text-sm mb-1 uppercase tracking-wide">
            {employee.department.name}
          </p>
          <p className="text-gray-400 text-[10px] font-semibold uppercase italic">
            {employee.position}
          </p>
        </div>

        <div className="mt-1 flex flex-col items-center justify-center bg-gray-50 py-4 border-y border-gray-100">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <QRCode
              value={`${employee.id}`}
              size={140}
              quietZone={5}
              logoWidth={30}
              logoOpacity={0.9}
              qrStyle="dots"
              eyeRadius={[10, 10, 10, 10]}
              eyeColor="#2563eb"
              fgColor="#1e293b"
            />
          </div>
        </div>

        <div className="mt-auto p-4 text-center">
          <div className="text-[10px] text-gray-300 uppercase font-bold">Employee ID</div>
          <div className="text-sm font-mono text-gray-600">#{employee.id}</div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-8 cursor-pointer flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Descargar Credencial Digital
      </button>
    </div>
  );
};

export default EmployeeBadge;