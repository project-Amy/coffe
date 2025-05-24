

export default function useGetSingleCoffe() {
  const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  async function getSingleCoffe(id: string) {
    const response = await fetch(`${BASE_URL}/api/coffe/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      console.log("data:", data);
      return data;
    } else {
      
      console.log("error!");
    }
  }
  return { getSingleCoffe };
}
