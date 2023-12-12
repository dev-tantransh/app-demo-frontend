<template>
  <!-- header to display page title -->
  <Header page-title="Post Detail"/>
  <!-- container to display page details -->
  <div class="container p-5 border shaddow-sm mt-2" v-if="post">
    <div class="row"> <!-- post id -->
      <div class="col-1 col-sm-1 fw-bold">ID:</div>
      <div class="col col-sm">{{ post.id }}</div> 
    </div>
    <div class="row"> <!-- post title -->
      <div class="col-1 col-sm-1 fw-bold">Title:</div>
      <div class="col col-sm">{{ post.title }}</div> 
    </div>
    <div class="row"> <!-- post body -->
      <div class="col-1 col-sm-1 fw-bold">Body:</div>
      <div class="col col-sm">{{ post.body }}</div> 
    </div>
    <hr/>
    <!-- comments -->
    <table class="table table-striped table-borderless">
      <thead class="table-light">
        <tr>
          <th class="fw-bold fs-6">Comment ID</th>
          <th class="fw-bold fs-6">Title</th>
          <th class="fw-bold fs-6">Email</th>
          <th class="fw-bold fs-6">Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments">
          <td class="text-secondary">{{ comment.id }}</td>
          <td class="text-secondary">{{ comment.name }}</td>
          <td class="text-secondary">{{ comment.email }}</td>
          <td class="text-secondary">{{ comment.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue'
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header.vue';
  const post = ref()  // state variable to store post detail
  const comments = ref() // state variable to store comments
  // fetch post details
  const getPost = async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    post.value = response.data // save post details in state variable
  }
  // fetch comments for post
  const getComments = async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    comments.value = response.data // store comments in a state variable
  }
  onMounted(async () => {
    const postId = useRoute().params.id
    getPost(postId)
    getComments(postId)
  })
</script>