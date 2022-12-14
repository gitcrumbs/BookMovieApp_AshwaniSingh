
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import './ReleasedMovies.css'
import MoviesFilter from './MoviesFilter';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme ,ThemeProvider} from '@mui/material/styles';



export default function ReleasedMovies( {movieData}) {

//  Applied Theme spacing for the components rendering on the grid.
  const theme = createTheme({
    spacing: 240,
  
  });

 

  const [filteredData, setfilteredData] = useState([]);
  const [updatedUrl, setupdatedUrl] = useState("");
  const [updatedEvent, setupdatedEvent] = useState(false);


  useEffect(()=>{
    
    
    if(updatedUrl!==''){      
      setupdatedEvent(true);
      axios
      .get(`/api/v1/movies?&limit=500&${updatedUrl}`)
      .then((response) =>  setfilteredData(response.data.movies))
      .then(console.log(filteredData.length));
    }else{
      setupdatedEvent(false);
    }
  

  },[updatedUrl])
 
  //  with the changes in the url prop the get call is done with the useEffect.
  //fetches only when the user clicks on the apply button from the movies filter
   
 
  return (
    // Container for showing the released movies
    <div className='released_container'>
    <div className="released_movies" >
      {(updatedEvent) ?
    <GridList cellHeight={350} cols={4} >
        {filteredData.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();

          return (
            <ThemeProvider theme={theme}>
            <GridListTile key={tile.id}  style={{minWidth :theme.spacing(1)+'px',maxWidth :theme.spacing(1)+'px'}}>
              <Link to={"/movie-details/" + tile.id} >
                <img
                  src={tile.poster_url}
                  alt={tile.title}                  
                  style={{ 
                    minWidth :theme.spacing(1)+'px',
                    maxWidth :theme.spacing(1)+'px',
                     alignItems: "center",
                    margin: theme.spacing(0, 'auto'),
                  }}
                />
              </Link>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                   
                  />
                }
              />
            </GridListTile>
            </ThemeProvider>
          );
        })}
       
      </GridList>
      
      :
      
<GridList cellHeight={350} cols={4}>
        {movieData.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();

          return (
            <GridListTile key={tile.id}>
              <Link to={"/movie-details/" + tile.id}>
                <img
                  src={tile.poster_url}
                  alt={tile.title}
                  style={{                  
                    minWidth :theme.spacing(1)+'px',
                    maxWidth :theme.spacing(1)+'px',
                    alignItems: "center",
                    margin: theme.spacing(0, 'auto'),
                  }}
                
                />
              </Link>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                   
                  />
                }
              />
            </GridListTile>
          );
        })}
       
      </GridList>
      }
      
     
    </div>
     <MoviesFilter movieData={movieData} updatedUrl={setupdatedUrl}/>
    </div>
  );
}
