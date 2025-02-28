import React, { useState } from 'react';
import DatePicker, { registerLocale  } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

function ModalDatePicker({ isOpen, onClose, selectedDate, onChange }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-lg bg-white p-6 shadow-2xl flex flex-col items-center justify-center">
          <DialogTitle className="font-bold text-2xl mb-4 text-center">
            Selecione a Data de Término
          </DialogTitle>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => onChange(date)}
            inline
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
          />
          <br />
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Fechar
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ModalDatePicker;
