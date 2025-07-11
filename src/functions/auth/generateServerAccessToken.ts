import axios from "axios";

const generateServerAccessToken = async () => {
  try {
    const username = import.meta.env.VITE_AUTH_USERNAME!;
    const password = import.meta.env.VITE_AUTH_PASSWORD!;
    const base_url = import.meta.env.VITE_BACKEND_PROD_SERVER_URL!;
    const res = await axios.post(
      `${base_url}/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          Content: "application/json",
        },
      }
    );

    const { accessToken } = res.data;
    return { accessToken };
  } catch (e) {
    return null;
  }
};

export default generateServerAccessToken;
