// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PostsService {}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { UsersService, User } from '../users/users.service';
// import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4(); 

// export interface Post {
//     id: string;
//     title: string;
//     content: string;
//     authorId: number;
// }

// @Injectable()
// export class PostsService {
//     private posts: Post[] = [];
//     private postId = id;

//     constructor(private readonly usersService: UsersService) { }

//     create(title: string, content: string, authorId: number): Post {
//         const author = this.usersService.findOne(authorId);
//         const newPost: Post = { id: this.postId, title, content, authorId };
//         this.posts.push(newPost);
//         return newPost;
//     }

//     findAll(): Post[] {
//         return this.posts;
//     }

//     findOne(id: number): Post {
//         const post = this.posts.find(post => post.id === id);
//         if (!post) {
//             throw new NotFoundException(`Post with ID ${id} not found`);
//         }
//         return post;
//     }

//     update(id: number, title: string, content: string, authorId: number): Post {
//         const postIndex = this.posts.findIndex(post => post.id === id);
//         if (postIndex === -1) {
//             throw new NotFoundException(`Post with ID ${id} not found`);
//         }
//         const author = this.usersService.findOne(authorId);
//         const updatedPost = { id, title, content, authorId };
//         this.posts[postIndex] = updatedPost;
//         return updatedPost;
//     }

//     remove(id: number): void {
//         const postIndex = this.posts.findIndex(post => post.id === id);
//         if (postIndex === -1) {
//             throw new NotFoundException(`Post with ID ${id} not found`);
//         }
//         this.posts.splice(postIndex, 1);
//     }

//     findPostsByUserId(authorId: number): Post[] {
//         return this.posts.filter(post => post.authorId === authorId);
//     }
// }


import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
// import { Response } from 'express';
// import { CommonService } from 'src/common/common.service';


export interface Post {
  id: string;       // UUID string
  title: string;
  content: string;
  authorId: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(private readonly usersService: UsersService) { }

  create(title: string, content: string, authorId: string): Post {
    // Validate author existence
    // const author = this.usersService.getById(authorId);
    // if (!author) {
    //   throw new BadRequestException(`Author with ID ${authorId} does not exist`);
    // }

    if (!this.usersService.getById(authorId)) {
      throw new BadRequestException(`Author with id ${authorId} does not exist`);
    }

    const newPost: Post = {
      id: uuidv4(),  // Generate a new UUID for each post
      title,
      content,
      authorId,
    };

    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    const post = this.posts.find(post => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  //   findOne(id: string): Post {
  //     const post = this.posts.find(p => p.id === id);
  //     if (!post) throw new NotFoundException(`Post with id ${id} not found`);
  //     return post;
  //   }

  update(id: string, title: string, content: string, authorId: string): Post {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // if (!this.usersService.getById(authorId)) {
    //     throw new BadRequestException(`Author with id ${authorId} does not exist`);
    //   }

    // Validate author existence
    const author = this.usersService.getById(authorId);
    if (!author) {
      throw new BadRequestException(`Author with ID ${authorId} does not exist`);
    }

    const updatedPost: Post = {
      id,
      title,
      content,
      authorId,
    };

    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  remove(id: string): void {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }

  //   remove(id: string): boolean {
  //     const initialLength = this.posts.length;
  //     this.posts = this.posts.filter(p => p.id !== id);
  //     return this.posts.length !== initialLength;
  //   }

  findPostsByUserId(authorId: string): Post[] {
    return this.posts.filter(post => post.authorId === authorId);
  }

  // Helper method to check if author exists (optional)
  isAuthorExists(authorId: string): boolean {
    return !!this.usersService.getById(authorId);
  }
}
