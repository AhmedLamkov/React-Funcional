import React, { useState, useEffect, useRef} from "react";
import { usePosts } from "../hooks/usePosts";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/UI/PostFilter";
import '../styles/App.css'
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching} from "../hooks/useFetching";
import{getPageCount} from "../Utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserber";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, SetPosts] = useState ([]);
  const [filter, setFilter] = useState({sort:'', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState (0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    SetPosts([...posts,...response.data])
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit));
  }, [limit, page])

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts, limit])

  const createPost = (newPost) => {
    SetPosts([...posts,newPost])
    setModal(false)
  }

  const removePost = (post) => {
    SetPosts(posts.filter(p => p.id !== post.id )) 
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
    <MyButton style={{marginTop:'30px'}} onClick={() => setModal(true)}>
      Создать пользователя
    </MyButton>
    <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}></PostForm>
    </MyModal>
    
    <hr style= {{margin: '15px 0'}}></hr>
    <PostFilter 
      filter={filter} 
      setFilter={setFilter}
    />
    <MySelect
      value={limit}
      onChange={value => setLimit(value)}
      defaultValue='Кол-во элементов на странице'
      options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'Показать все'}
      ]}
      />
    {postError &&
      <h1> Произошла ошибка ${postError}</h1>
    }
    <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'></PostList>
    <div ref={lastElement} style= {{height: 20, background: 'red'}}/>
    {isPostsLoading &&
      <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Loader/></div>
    }
    <Pagination
      page={page} 
      changePage={changePage}
      totalPages={totalPages}
    />
    </div>
  );
};

export default Posts;