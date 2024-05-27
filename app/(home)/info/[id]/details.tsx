import { P } from '@vidstack/react/types/vidstack.js'
import React, {useEffect} from 'react'
import axios from 'axios'
import { url } from '../../../../config/url'

const AnimeDetails = ({anime}: any) => {
    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const response = await axios.get(`${url.info}/${anime.id}`);
            console.log(response.data)
        
          } catch (error) {
            console.error("Error fetching details:", error);
          }
        };
        fetchDetails();
      }, []);
  return (
    <p>{anime.id}</p>
  )
}

export default AnimeDetails