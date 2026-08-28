const API_URL =
process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

interface ApiOptions extends RequestInit {
token?: string;
}

export async function apiRequest<T>(
endpoint: string,
options: ApiOptions = {}
): Promise<T> {
const { token, headers, ...requestOptions } = options;

const response = await fetch(`${API_URL}${endpoint}`, {
...requestOptions,
headers: {
"Content-Type": "application/json",
...headers,
...(token
? {
Authorization: `Bearer ${token}`,
}
: {}),
},
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data?.error?.message || "Something went wrong with the API request."
);
}

return data;
}
