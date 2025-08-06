'use client';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    //Usamos FormData para conseguir enviar o arquivo de imagem
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch('/api/user/register', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Erro desconhecido');
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
      <Input
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite uma senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        name="image"
        label="Imagem de perfil (opcional)"
      />

      <Button loading={loading}>{loading ? 'Cadastrando' : 'Cadastrar'}</Button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Cadastro realizado com sucesso!</p>
      )}
    </form>
  );
}
