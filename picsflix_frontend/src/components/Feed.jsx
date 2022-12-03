import { useState, useEffect } from 'react' // eslint-disable-line
import { useParams } from 'react-router-dom' // eslint-disable-line
import { client } from '../client' // eslint-disable-line
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout' // eslint-disable-line
import Spinner from './Spinner'

export default function Feed() {
  const [loading, setLoading] = useState(false); // eslint-disable-line
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams(); 

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId) 

      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId])
  

  if (loading) return <Spinner message="We are adding new ideas to the feed" />;
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  ) 
}
