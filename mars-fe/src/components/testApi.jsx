import { useEffect, useState } from "react";

const TestApi = () => {
  const url = "http://localhost:3001/api/kru/off";
  const urlLogin = "http://localhost:3001/api/loginMars";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await fetch(urlLogin, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({ username: "tes", password: "123" }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData.token)
        setToken(responseData.token)
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    fetchLogin();
  }, []);

  useEffect(()=>{
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err.message);
      }
    };
    if(token){
      fetchData();
    }
  }, [token])

  return (
    <>
      <div className="p-10">
        Anda mengakses (GET) link : <div className="font-bold">{url}</div>
      </div>
      <div className="p-10">
        Token : {token ?  token  : "Login ..."} <br />
        Data : {data ? <JsonViewer data={data} /> : "Loading..."}
        {error && <div>Error: {error} </div>}
      </div>
    </>
  );
};

const JsonViewer = ({ data }) => {
  return (
    <pre className="bg-gray-100 p-4 rounded-md" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{JSON.stringify(data, null, 2)}</pre>
  );
};

export default TestApi;
