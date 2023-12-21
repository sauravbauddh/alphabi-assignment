import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import GifDisplay from "../components/GifDisplay";
import { fetchGifs } from "./api/api";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState<unknown[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      setLoading(true);
      setShowSpinner(true);
      try {
        const fetchedGifs = await fetchGifs(searchTerm, pageNumber, pageSize);
        setGifs(fetchedGifs);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      } finally {
        setLoading(false);
        setShowSpinner(false);
      }
    }
  };

  const handleToggleFavorite = (gif: unknown) => {
    const updatedFavorites = favorites.includes(gif)
      ? favorites.filter((fav) => fav !== gif)
      : [...favorites, gif];
    setFavorites(updatedFavorites);
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    setDisableNext(inputValue.trim() === "" ? true : false);

    if (inputValue.trim().length >= 2) {
      setPageNumber(1);
      setLoading(true);
      setShowSpinner(true);
      try {
        const fetchedGifs = await fetchGifs(inputValue, 1, pageSize);
        setGifs(fetchedGifs);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      } finally {
        setLoading(false);
        setShowSpinner(false);
      }
    } else {
      setGifs([]);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search GIFs..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ borderRadius: "8px 0px 0px 8px" }}
        />
      </InputGroup>

      <div style={{ marginTop: "20px" }}>
        <h2>Fetched GIFs</h2>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            {showSpinner && <Spinner animation="border" role="status" />}
          </div>
        ) : gifs.length === 0 ? (
          <p style={{ textAlign: "center" }}>No GIFs found</p>
        ) : (
          <GifDisplay
            gifs={gifs}
            onToggleFavorite={handleToggleFavorite}
            isFavoritesPage={false}
          />
        )}
      </div>

      {gifs.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="outline-secondary" onClick={goToPreviousPage}>
            Previous Page
          </Button>
          <span style={{ margin: "0 10px" }}>Page {pageNumber}</span>
          <Button
            variant="outline-secondary"
            onClick={goToNextPage}
            disabled={disableNext}
          >
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
