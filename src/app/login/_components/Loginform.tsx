'use client';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Loginform() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const res = await fetch('api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Erro desconhecido');
      setLoading(false);
    } else {
      setSuccess(true);
      setEmail('');
      setPassword('');
      router.push('/');
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button loading={loading}>{loading ? 'Entrando' : 'Entrar'}</Button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {success && (
        <p className="text-green-500">Login realizado com sucesso.</p>
      )}
    </form>
  );
}
