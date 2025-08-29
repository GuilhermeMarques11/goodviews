'use client';

import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import React, { useEffect, useState } from 'react';
import Avatars from '@/components/shared/Avatars';
import { useRouter } from 'next/navigation';
import AccountInfo from '@/components/shared/AccountInfo';

export default function MinhaContaPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setAvatar] = useState<string | null>(null);
  const [id, setId] = useState('');
  const [createdAt, setCreatedAt] = useState<Date | null>();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/account');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        const userData = await response.json();
        setName(userData.name);
        setEmail(userData.email);
        setAvatar(userData.image);
        setId(userData.id);
        setCreatedAt(new Date(userData.createdAt));
      } catch {
        setError('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          image: image,
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao atualizar perfil');
      }

      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="container">
      <AccountInfo
        name={name}
        id={id}
        image={image}
        createdAt={createdAt}
        isCurrentUser={true}
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <Input
          type="text"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Avatars selectedAvatar={image} setSelectedAvatar={setAvatar} />
        <h2 className="text-2xl font-bold">Alterar senha</h2>
        <Input
          type="password"
          label="Senha atual (deixe em branco para não alterar)"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={loading}
        />
        <Input
          type="password"
          label="Nova senha (deixe em branco para não alterar)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
        <Button loading={loading}>
          {loading ? 'Salvando alterações...' : 'Salvar alterações'}
        </Button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500">Alterações salvas com sucesso.</p>
        )}
      </form>
    </div>
  );
}
