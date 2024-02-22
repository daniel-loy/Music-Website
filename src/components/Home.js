import { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

function Home(){
  const [title, settitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  const fetchMusicData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword === "" ? "trending" : keyword}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMusicData();
      settitle(keyword)
    }
  };

  useEffect(() => {

    // current client credentials will be deleted in few days
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=&client_secret58fecf46813242bda932cf6cd72a60b3=b8d2228a0b3b4a4f97d781314a18b8b0",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
    fetchMusicData();

    
  },[]);

  return (
    <>
        <div>
          <Navbar
            keyword={keyword}
            setKeyword={setKeyword}
            handleKeyPress={handleKeyPress}
            fetchMusicData={fetchMusicData}
          />
         
          <div className="container">
          <h1>{title === "" ? "Trending" :title}</h1>
            <div className={`row ${isLoading ? "" : "d-none"}`}>
              {/* Loading spinner */}
            </div>
            <div className="row">
              {/* Display tracks */}
              {tracks.map((element) => {
                return <Card key={element.id} element={element} />;
              })}
            </div>
            <div className="row">
              <div className="col">
                {/* Error message */}
                <h4 className="text-center text-danger py-2">
                  {message}
                </h4>
              </div>
            </div>
          </div>
        </div>

    </>

  );
}

export default Home;
