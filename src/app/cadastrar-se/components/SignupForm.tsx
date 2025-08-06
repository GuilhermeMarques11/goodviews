'use client';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Avatars from '@/components/shared/Avatars';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
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

    const res = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        image: selectedAvatar,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Erro desconhecido');
      setLoading(false);
    } else {
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setLoading(false);
      router.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="name"
        type="text"
        label="Nome"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Avatars
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite uma senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button loading={loading}>{loading ? 'Cadastrando' : 'Cadastrar'}</Button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Cadastro realizado com sucesso!</p>
      )}
    </form>
  );
}
