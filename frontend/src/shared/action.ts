export async function GetWithAuthentication<T>(
  url: string,
  token: string,
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data as T;
}

export async function GetAllWithAuthentication<T>(
  url: string,
  token: string,
): Promise<T[]> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data as T[];
}
