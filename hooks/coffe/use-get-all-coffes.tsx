export default function useGetCoffees() {
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  async function getAllCoffes() {
    const response = await fetch(`${BASE_URL}/api/all_coffes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data) {
      return data;
    } else {
      console.log("error!");
    }
  }

  return { getAllCoffes };
}
