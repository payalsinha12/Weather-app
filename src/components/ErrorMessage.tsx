import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 rounded-lg max-w-md">
      <AlertCircle size={20} />
      <p>{message}</p>
    </div>
  );
}