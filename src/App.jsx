import axios from "axios";
import CardPage from "./CardPage/CardPage";
import { useEffect, useState } from "react";

// import from material ui
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import { Button } from "@mui/material";
//import token
import { myToken } from "./CardPage/token"; 
// ... (keep your existing evaluationIcon array)
const evaluationIcon = [
  {
    eval: 1,
    icon: (
      <>
        <StarHalfOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 2,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 3,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarHalfOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 4,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 5,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarHalfOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 6,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlineOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 7,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarHalfOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 8,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlineOutlinedIcon />
      </>
    ),
  },
  {
    eval: 9,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarHalfOutlinedIcon />
      </>
    ),
  },
  {
    eval: 10,
    icon: (
      <>
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
        <StarOutlinedIcon />
      </>
    ),
  },
];
function App() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [moviesCard, setMoviesCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Adds smooth scrolling
    });
  };

  const handleNext = () => {
    setPage(prev => prev + 1);
    scrollToTop();
  };

  const handlePrev = () => {
    setPage(prev => prev - 1);
    scrollToTop();
  };

  let moviesCardList = moviesCard.map((movie) => {
    return (
      <div
        key={movie.name}
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-evenly",
          width: "80vw",
        }}
      >
        <CardPage
          src={movie.src}
          MovieName={movie.name}
          overview={movie.overview}
          evaluation={movie.eval}
          ClassiFication={movie.classFication ? "+18" : "family"}
        >
          {evaluationIcon
            .filter((item) => item.eval === Math.round(movie.eval))
            .map((item, index) => (
              <span key={index}>{item.icon}</span>
            ))}
        </CardPage>
      </div>
    );
  });

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    const headers = {
      accept: "application/json",
      Authorization: "Bearer"+myToken,
    };

    axios
      .get(url, { headers })
      .then((response) => {
        
        let newData = response.data.results.map((item) => {
          console.log(item.adult)
          setTotalPage(response.data.total_pages);
          return {
            classFication: item.adult,
            overview: item.overview,
            name: item.original_title,
            eval: item.vote_average,
            src: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "./images/Photo.jpeg",
          };
        });
        setMoviesCard(newData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Now Playing Movies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {moviesCardList}
      </div>
      
     
      <div style={{
     
        display: "flex",
        gap: "10px",
        width:'100%',
        justifyContent:'center',
        marginTop:'20px',
      }}>
        {page > 1 && (
          <Button 
            variant="contained" 
            onClick={handlePrev}
          >
            Previous
          </Button>
        )}
        {page < totalPage && (
          <Button 
            variant="contained" 
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;