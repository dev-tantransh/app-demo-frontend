<!-- list posts -->
<template>
  <Header page-title="Posts"/>
  <div class="p-5 ms-3 me-3">
    <!-- table to hold posts -->
    <table class="table table-striped table-hover table-borderless table-responsive-lg">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Comments Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" @click="selectPost(post)">
          <td class="text-secondary fs-6 fw-normal p-2">{{ post.id }}</td>
          <td class="text-secondary fs-6 fw-normal p-2">{{ post.title }}</td>
          <td class="text-secondary fs-6 fw-normal p-2">{{ post.comments_count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>

</style>

<script setup>
  import {onMounted, ref} from 'vue'
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import Header from '@/components/Header.vue';
  const posts = ref([]) // state variable to hold post
  const router = useRouter() // router to route to another page
  // fetch posts using api call
  const fetchPosts = async()=>{ 
    try{
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return response.data ?? [] // return posts if api call made successful else return empty array
    }
    catch(error){
      console.log("Error while fetching posts => ", error)
    }
  }
  // fetch comments for specified post
  const fetchCommentCounts = async (post) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    post.comments_count = response.data.length ?? 0
  }

  onMounted(async () => {
    posts.value = await fetchPosts() // fetch posts   
    await Promise.all(posts.value.map(post => fetchCommentCounts(post)))  // fetch comments for each post
  });
  
  // get selected post and send it to another page
  const selectPost = (post) => {
    console.log(post)
    router.push('/post/'+post.id)
  }
</script>