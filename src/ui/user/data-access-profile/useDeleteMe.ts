import { useState } from 'react';
import { deleteMe } from '@/shared/api';

export function useDeleteMe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (opts?: { password?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteMe(opts?.password ?? '');
      return res as { message: string };
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        (e?.response?.status === 401
          ? '다시 로그인해 주세요.'
          : e?.response?.status === 403
          ? '권한이 없습니다.'
          : e?.response?.status === 409
          ? '관련 데이터로 인해 탈퇴가 불가합니다.'
          : '탈퇴에 실패했습니다.');
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
