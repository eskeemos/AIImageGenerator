import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'

type Props = {}

type RenderCardsProps = {
  data: any;
  title: string
}
const RenderCards = ({ data, title }: RenderCardsProps) => {
  if (data?.length > 0) {
    return data.map((post: any) =>
      <Card key={post._id} {...post} />
    )
  }

  return (
    <h2 className="mt-5 font-bold text-xl uppercase">{title}</h2>
  )
}

const Home: React.FC<Props> = ({ }) => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();

          setPosts(result.data.reverse());
        }
      } catch (err) {

      } finally {
        setLoading(false)
      }
    }

    fetchPosts();
  }, []);


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-3xl'>The Community ShowCase</h1>
        <p className='mt-2 text-md max-w-[600px]'>Browse throught a collection of imaginative images generated by DALL-E AI</p>
      </div>
      <div className="mt-16">
        {/* <FormField /> */}
      </div>
      <div className="mt-10">
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <div>
            {searchText && (
              <h2 className="font-medium text-xl mb-3">
                Showing results for <span className="text-violet-500"> "{searchText}"</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (<RenderCards data={posts} title="No Search Results Found" />) : (
                <RenderCards data={posts} title="No Posts Found" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Home