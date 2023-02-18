import { usePosts } from "hooks/posts";
import Postlist from "./Post/Postlist";

export default function Dashboard() {
  const {posts, isLoading:postsLoading} = usePosts();
  if (postsLoading) return "Loading posts...";
  return (
    <div className="container-fluid">
      <Postlist posts={posts}/>
    </div>
  )
}
